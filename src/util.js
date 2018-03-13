var common = require('./Common/common.js');
import fetch from '@system.fetch'
import device from '@system.device'
module.exports={
  onLaunch: function (data) {
    var muid = common.muid()
    this.muid = muid
    this.scene = data.scene
    console.log('App Launch')
  },
  onShow: function (data) {
    this.scene = data.scene
    console.log('App Show')
  },
  onHide: function () {
    console.log('App Hide')
  },
  getUserInfo: function (cb) {
    var that = this;
    if (this.userInfo) {
      typeof cb == "function" && cb(this.userInfo)
    } else {
      device.getInfo({
        success: function () {
          device.getId({
            type: ["device", "mac","user"],
            success: function (res) {
              that.userInfo = res.user;
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      });
    }
  },
  data: {
    userInfo: null,
    hasLogin: false,
    uid: '1109a590ace58b390d584b8f1eff9b30personal',//一期不做定制推荐，uid写死
    passport: '1746414975%2540sina.sohu.com', //一期不做定制推荐，passport写死
    muid: '',
    playInfoApi: 'https://api.tv.sohu.com/phone_playinfo?callback=',
    defaultHeader: 'https://css.tv.itc.cn/channel/space/avatar/03_small.jpg',
    scene: ''
  }
};
