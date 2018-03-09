/*
 * Copyright (C) 2017, hapjs.org. All rights reserved.
 */
var path = require('path')
var fs = require('fs')
var fsExtra = require('fs-extra')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var WebpackZipPlugin = require('./lib/webpack-zip-plugin')
var WebpackHandlerWrapPlugin = require('./lib/webpack-handler-wrap-plugin')
var yargs = require('yargs')
var qr = require('qr-image')
var qrTerminal = require('qrcode-terminal')
var utils = require('./lib/utils')
var info = require('./lib/info')
var colorconsole = utils.colorconsole

const argv = yargs.argv

// 支持文件扩展名
const FILE_EXT_LIST = info.name.extList
// 排除资源文件扩展名
const FILE_EXT_NORES = info.name.extList.concat(['.js', '.jsx', '.coffee', '.ts', '.tsx', '.vue', '.css', '.less', '.sass', '.scss', '.styl', '.html', '.json', '.md'])

// 读取manifest
var manifest
var manifstFileName = 'manifest.json'
var manifestPath =  path.join(__dirname, '../../src', manifstFileName)
if (fs.existsSync(manifestPath)) {
  manifest = JSON.parse(fs.readFileSync(manifestPath).toString())
}
// 项目名（如果没有, 则默认为Bundle）
var appName = (manifest && manifest.package) || 'Bundle'
// zip路径
var zipPath = path.join(__dirname,'../../dist')
var entry = {}
var resentry = {}
// 输入源目录
var rootDir = path.join(__dirname, '../../src')
// 输出目标目录
var destPath = 'build'
// 清空dist路径
var zipfiles = []
if (fs.existsSync(zipPath)) {
  zipfiles = fs.readdirSync(zipPath)
  zipfiles.forEach(function (file, index) {
    const curPath = zipPath + "/" + file
    if (fs.statSync(curPath).isFile()) {
      fs.unlinkSync(curPath)
    }
  })
}
// 清空build目录
var buildPath = path.join(__dirname, '../../build')
fsExtra.emptyDirSync(buildPath)

// 提取入口脚本文件
var router = []

const appPath = info.findScriptFile(path.join(rootDir, 'app'))
if (!appPath) {
  colorconsole.throw(`app脚本文件丢失`)
}
router.push(appPath)

if (manifest && manifest.router) {
  const pages = manifest.router.pages
  if(pages) {
    Object.keys(pages).forEach( page => {
      const pageMeta = pages[page]
      // 如果忘记写组件, 则默认为页面的小写
      const compName = pageMeta.component || page.toLowerCase()
      if( !pageMeta || !pageMeta.component ) {
        colorconsole.warn(`[WARN] manifest.json中的路由信息不全: 页面'${page}'没有设置component属性, 默认采用'${compName}'`)
      }
      let pagePath = info.findScriptFile(path.join(rootDir,page, compName))

      if (!pagePath) {
        colorconsole.throw(`manifest.json中路由[${page}]的文件路径[${pagePath}]不存在，请及时删除`)
      }
      else {
        router.push(pagePath)
      }
    })
  }
}

(function parse(dir, common) {
  dir = dir || '.'
  var directory = path.join(rootDir, dir)
  var name
  // 递归遍历目录
  fs.readdirSync(directory)
    .forEach(function (file) {
      var fullpath = path.join(directory, file)
      var stat = fs.statSync(fullpath)
      var basename = path.basename(fullpath)
      var extname = path.extname(fullpath)
      // 只处理指定类型的文件，添加到entry中
      if (stat.isFile() ) {
        if( (FILE_EXT_LIST.indexOf(extname) >= 0) && !common ) {
          // 是否在路由表中
          if (router.length === 0 || router.indexOf(fullpath) >= 0) {
            name = path.join(destPath, dir, path.basename(file, extname)) + '.js'
            name = name.replace(/\\/g, '/')
            // 转换为在build目录下的地址
            var buildRelativeName = name.match(/build\/(.*)/)[1]
            entry[buildRelativeName] = fullpath
          }
        }
        else if(basename === manifstFileName || FILE_EXT_NORES.indexOf(extname) < 0 ) { // 资源文件
          // 采用绝对路径
          name = path.join(__dirname, '../..', destPath, dir, path.basename(file))
          name = name.replace(/\\/g, '/')
          resentry[name] = fullpath
        }
      }
      else if (stat.isDirectory()) {
        var subdir = path.join(dir, file)
        var iscommon = common || (file.toLowerCase() === 'common')
        parse(subdir, iscommon)
      }
    })
})('.',false)

// build文件夹的路径
var buildDir = path.join(__dirname, '../..', destPath)

// 配置环境
const nodeConf = parse()

// Webpack配置
webpackConf = {
  entry: entry,
  output: {
    path: 'build/',
    filename: '[name]'
  },
  module: {
    loaders: [
      {
        test: new RegExp(`(${info.name.extList.map(k => '\\' + k).join('|')})(\\?[^?]+)?$`),
        loaders: [path.resolve(__dirname, 'index.js')],
        // Disable Babel compact option
        exclude: /node_modules/
      },
      {
        test: /\.js/,
        loaders: [path.resolve(__dirname, 'lib', 'module-loader.js'), 'babel'],
        exclude: function (path) {
          return /node_modules/.test(path) && !/mix-tools/.test(path)
        }
      }
    ]
  },
  plugins: [
    // 定义环境变量
    new webpack.DefinePlugin({
      // 平台：na|h5
      ENV_PLATFORM: JSON.stringify(nodeConf.NODE_PLATFORM),
      ENV_PLATFORM_NA: nodeConf.NODE_PLATFORM === 'na',
      ENV_PLATFORM_H5: nodeConf.NODE_PLATFORM === 'h5',
      // 阶段: dv|qa|ol
      ENV_PHASE: JSON.stringify(nodeConf.NODE_PHASE),
      ENV_PHASE_DV: nodeConf.NODE_PHASE === 'dv',
      ENV_PHASE_QA: nodeConf.NODE_PHASE === 'qa',
      ENV_PHASE_OL: nodeConf.NODE_PHASE === 'ol',
    }),
    // 框架Handler包装
    new WebpackHandlerWrapPlugin(),
    // 打包过程
    new WebpackZipPlugin({
      name:appName,
      output:zipPath,
      src:path.join(__dirname, '../..', destPath),
      res: resentry,
      sign: ((nodeConf.NODE_PHASE === 'dv' && argv.sign) || (nodeConf.NODE_PHASE !== 'dv' && !argv.debug)) ? true : false
    }),
    // 编译时间计时
    function() {
      this.plugin('watch-run', function(watching, callback) {
        process.webpackDateS = new Date()
        callback();
      })
      this.plugin('done', function() {
        process.webpackDateE = new Date()
        const secCost = (process.webpackDateE - process.webpackDateS) / 1000
        colorconsole.info(`Build Time Cost: ${secCost}s`)
      })
    }
  ],
  // WebDevServer配置
  devServer: {
    contentBase: buildDir,
    // GZIP压缩
    compress: true,
    inline: true,
    setup: function (app) {
      // 访问记录
      app.all('*', function (req, res, next) {
        colorconsole.info(`[INFO] webpack-dev-server request: ${req.path}`)
        next()
      })
      // 二维码
      app.get('/', function (req, res) {
        const text = `http://${getIPAdress()}:${webpackConf.devServer.port}`
        const img = qr.imageSync(text, {size: 10});
        res.status(200).set({'Content-Type': 'image/png'}).send(img)
        colorconsole.info(`[INFO] webpack-dev-server QRCode address: ${text}`)
      })
      // 重新路由
      app.get('/tools/*', function (req, res) {
        const filePath = path.join(__dirname, `browser/${req.path.replace('/tools', '')}`)
        if (/\.map$/.test(filePath) && !fs.existsSync(filePath)) {
          res.status(404).send("").end()
        }
        else {
          res.sendFile(filePath)
        }
      })
      // bundle
      app.get('/bundle', function (req, res) {
        // 临时Native的IP
        const client = getClientIPAdress(req)
        colorconsole.log(`[INFO] App Server Client: ${client}`)
        const clientPath = path.join(__dirname, 'lib/client')
        fs.writeFileSync(clientPath, JSON.stringify({client: client, timestamp: new Date()}))
        // 发送文件
        let filePath = path.join(buildDir, "../dist", getProjectName() + ".rpk")
        if (!fs.existsSync(filePath)) {
          filePath = path.join(buildDir, "../dist", getProjectName() + ".signed.rpk")
        }
        res.sendFile(filePath)
        res.set({
          'Content-Disposition': 'attachment; filename="bundle.zip"'
        })
      })
      // 二维码
      const text = `http://${getIPAdress()}:${webpackConf.devServer.port}`
      outputQRCodeOnTerminal(text)
    },
    // 取消Host检查
    disableHostCheck: true,
    // 不显示日志
    stats: {
      children: false,
      chunks: false,
      chunkModules: false,
      chunkOrigins: false,
      modules: false,
      version: false,
      assets: false
    }
  },
  node: {
    global: false
  },
  resolve: {
    root: [
      // 测试用例在test目录下
      path.join(__dirname, '../../test')
    ],
    extensions: ["", ".webpack.js", ".web.js", ".js", ".json"].concat(info.name.extList)
  },
  // 不显示日志
  stats: {
    children: false,
    chunks: false,
    chunkModules: false,
    chunkOrigins: false,
    modules: false,
    version: false,
    assets: false
  }
}

if (nodeConf.NODE_PLATFORM === 'h5') {
  // 添加脚本文件对应的HTML
  for(var jsItemK in entry) {
    var jsItemV = entry[jsItemK]
    var jsParse = path.parse(jsItemV)
    if(info.name.extList.indexOf(jsParse.ext) !== -1 && jsParse.name !== 'app'){
      var jsHtmlPath = jsItemK.replace('.js', '.html')
      var jsHtmlName = jsItemK.match(/(.*)\.js/)[1]

      colorconsole.info('[INFO] 添加脚本对应的HTML: ', jsHtmlPath)

      webpackConf.plugins.push(new HtmlWebpackPlugin({
        title: jsHtmlName,
        chunks: ['app.js', jsItemK],
        filename: jsHtmlPath,
        template: path.join(__dirname, `./browser/template${nodeConf.NODE_PHASE === 'dv' ? '' : '.min'}.html`),
        inject: 'head'
      }))
    }
  }
}

if (nodeConf.NODE_PHASE === 'dv') {
  // 携带sourceMap
  webpackConf.devtool = 'source-map'
}
else {
  // 去重
  webpackConf.plugins.push(new webpack.optimize.DedupePlugin())
  // JS压缩
  webpackConf.plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: {
    }
  }))
}

module.exports = webpackConf


/**
 * 解析NODE环境的参数
 */
function parse(config){
  config = config || {}
  // 平台：na|h5
  config.NODE_PLATFORM = process.env.NODE_PLATFORM
  // 阶段: dv|qa|ol
  config.NODE_PHASE = process.env.NODE_PHASE
  // 是否注入测试框架
  config.NODE_TEST = process.env.NODE_TEST

  const NODE_ENV = `${config.NODE_PLATFORM}-${config.NODE_PHASE}`

  switch (NODE_ENV) {
    // NA环境
    case 'na-dv':
      break;
    case 'na-qa':
      break;
    case 'na-ol':
      break;
    // H5环境
    case 'h5-dv':
      break;
    case 'h5-qa':
      break;
    case 'h5-ol':
      break;
    default:
      throw new Error(`Unknown node environment: ${NODE_ENV}`)
  }

  colorconsole.info(`[INFO] 配置环境：${JSON.stringify(config)}`)
  return config
}

/**
 * 获取项目名
 */
function getProjectName() {
  const manifestPath = path.join(buildDir, '../src/manifest.json')
  const config = JSON.parse(fs.readFileSync(manifestPath))
  return (config && config.package) || 'Bundle'
}

/**
 * 获取本机ip
 * @returns {string}
 */
function getIPAdress() {
  const interfaces = require('os').networkInterfaces();
  for (const devName in interfaces) {
    const iface = interfaces[devName];
    for (let i = 0; i < iface.length; i++) {
      const alias = iface[i];
      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
        return alias.address;
      }
    }
  }
}

/**
 * 获取客户端ip
 * @param req
 * @returns {any|*|string}
 */
function getClientIPAdress(req) {
  return req.headers['x-forwarded-for'] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;
}

/**
 * 命令行输出二维码
 * @param text
 */
function outputQRCodeOnTerminal (text) {
  colorconsole.info(``)
  colorconsole.info(`生成HTTP服务器的二维码: ${text}`)
  qrTerminal.generate(text, {small: true})
}
