/**
 * 播放信息
 * https://api.tv.sohu.com/phone_playinfo
 */

var _ = require("./underscore.js");
(function(){
  var useM3u8 = false;
  var util = {
    isArray : function (obj) {
      return Object.prototype.toString.call(obj) === '[object Array]';
    },
    formatUrl : function(url){
      url = url || '';
      if (this.isArray(url)) {
        url = url[0];
      }
      url = url.replace('http://', 'https://');// mp4
      return url;
    }
  }
  var playInfo = {
    video : {},
    playUrl : '',
     gData :{},
    getPlayInfo : function(vid,site,callback){
      var video = {};
      var me = this;
      fetch.fetch({
        url: gData.playInfoApi+'vid='+vid+'&uid='+gData.uid+'&muid='+ gData.muid+'&site='+site+'&plat=17&api_key=f351515304020cad28c92f70f002261c&sver=6.2&partner=78&poid=1&encoding=UTF-8',
        dataType: 'json',
        method: 'GET',
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          if (res.data.status == 200 && res.data) {
            var urls = {},videosrc = '';
            video = res.data.data;
            urls = video.urls || {};
            for (var i in urls) {
              if (urls.hasOwnProperty(i)) {
                //i=m3u8 | mp4
                if (i === 'downloadUrl') {
                  if (urls[i][0] && urls[i][0] !== '') {
                    urls[i][0] = util.formatUrl(urls[i][0]);
                  }
                }
                else {
                  for (var j in urls[i]) {
                    if (urls[i].hasOwnProperty(j)) {
                      //j= nor|hig| sup
                      _.each(urls[i][j], function (src, idx) {
                        src = util.formatUrl(src);
                        urls[i][j][idx] = src;
                      },me);
                    }
                  }
                }
              }
            }

            //优先m3u8
            // if (me.IsIphone && useM3u8 && !!urls['m3u8']) {
              console.log('userM3u8:'+useM3u8);
            if (useM3u8 && !!urls['m3u8']) {
              console.log('m3u8')
              videosrc = urls['m3u8']['nor'][0] || urls['m3u8']['hig'][0] || urls['m3u8']['sup'][0];
              videosrc = encodeURI(videosrc);
            }
            else {
              console.log('not m3u8')
              videosrc = urls['downloadUrl'][0] || urls['mp4']['hig'][0] ||   '';
              videosrc = encodeURI(videosrc);
            }
            console.log(videosrc);
            video.urls = urls;
            //test
            // console.info(" useM3u8:" + useM3u8 + " videosrc====> " + videosrc);

            me.video = video;
            me.playUrl = videosrc;
            callback && callback(me.playUrl);
          }
        },
        fail: function (res) {
          prompt.showToast({
            title: '提示',
            message: 'playInfo'+res.errMsg,
          })
        }
      })
    },
    getVideoInfo: function (vid,site, callback) {
      fetch.fetch({
        url: gData.playInfoApi+'vid='+vid+'&uid='+gData.uid+'&muid='+ gData.muid+'&site='+site+'&plat=17&api_key=f351515304020cad28c92f70f002261c&sver=6.2&partner=78&poid=1&encoding=UTF-8',
        dataType: 'json',
        method: 'GET',
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          if (res.data.status == 200 && res.data) {
            var video = res.data.data;
            callback && callback(video);
          }
        },
        fail: function (res) {
          prompt.showToast({
            title: '提示',
            message: 'playInfo' + res.errMsg,
          })
        }
      })
    },
  }
  module.exports = playInfo;
})()