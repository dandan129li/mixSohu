import common from '../Common/common.js'
import Futil from '../util.js'
import playInfo from '../Common/playInfo.js'
import prompt from '@system.prompt'
import fetch from '@system.fetch'
import router from '@system.router'
import network from '@system.network'
import storage from '@system.storage'
import share from '@system.share'
var video_blank_img = "https://m.tv.sohu.com/upload/touch/img/blank_h5.png?v=1";
var gData=Futil.data;
module.exports = {
  data: {
        toView: '0',
        scrollLeft: 0,
        channelList:[],
        currentChannelId:0,
        currentIndex:0,
        playList:[],
        queryData:{},
        isRefreshing: false,
        timer:null,
        video : {},
        playUrl : '',
        currPlayIndex : '',
        likeList : {},
        page : -1,
        scrollPage:false,
        currPlayedVideo:{},
        loadingMore:false,
        isWIFI : false,
        videoContext:undefined,
        currPlayUrl : '',
        options:{}
    },
    onInit: function () {
      // storage.clear({
      //   success:function(data){console.log("clear   handling success");},
      //   fail: function(data, code) {
      //     console.log("clear   handling fail, code=" + code);
      //   }
      // })
        var self =this;
        self.chlList();
        // self.storageGet("channelList",function(){
        //     self.chlList();
        // })
        var channel_id = self.options && self.options.channel_id ||self.channel_id|| self.currentChannelId||0;
        self.options={
          channel_id:channel_id
        }
        self.queryData=self.options;
        network.getType({
          success: (ret) => {
            var networkType = ret
              if (networkType['type'] !== 'wifi') {
                  self.isWIFI=false;
                  setTimeout(function () {
                  self.isWIFI=true;
                  }, 3000)
              }else{
                  self.isWIFI=true;
                    //WiFi自动播放
                    setTimeout(function () {
                    self.videoContext && self.videoContext.start()
                    }, 1000);
                }
          }
      });
        console.log("currnt ---> " +channel_id);
        //==========init model==============
    },
    onReady: function () {
        var self =this;
        // self.chlData('fresh');
        // self.storageGet("playList"+self.currentIndex,function(){
        //   self.chlData('fresh');
        // })

    },
    //频道一级菜单
    chlList:function(){
      var self =this;
      fetch.fetch({
        url: common.api_uri + '/channel/' + gData.uid +'/list?passport='+self.passport,
          success: function (rst) {
            var rst=JSON.parse(rst.data);
            if(rst && rst.data && rst.data.cateCodes){
              var channelList = self.buildTopNav(rst.data.cateCodes, self.currentChannelId);
              self.scrollLeft=0;
              self.channelList=channelList;
              self.storageDelete("channelList",function(){
                self.storageSet("channelList",self.channelList)
              })
            }
          },
          fail: function () {
              prompt.showToast({
                  message: '失败'
              });
          }
      });
    },
    storageSet:function(name,list){
      var self=this;
      storage.set({
        key:name,
        value: list,
        success:function(data){console.log("set:"+name+':length:'+list.length);},
        fail: function(data, code) {
          console.log("handling fail, code=" + code);
        }
      });
    },
    storageGet:function(name,index,callback,callback2){
      console.log('get storage')
      var self=this;
      storage.get({
        key:name,
        success:function(data){
          if(name==='playList'){
            if(data){
              self.playList=JSON.parse(data);
            }
            if(!self.playList[index]||self.playList[index].length<1){
              callback&&callback();
            }else{
              callback2&&callback2();
            }
          }else if(name=='channelList'){
              if(data){
                self.channelList=JSON.parse(data);
              }
              console.log(name+'storageGet*length**'+self.channelList.length);
              if(!self.channelList||self.channelList.length<1){
                callback&&callback();
              }
          }else{
            var indx=name.split('playList')[1];
            if(data){
              self.playList[indx]=JSON.parse(data);
            }
            console.log(name+'get*length**'+self.playList[indx].length);
            if(!self.playList[indx]||self.playList[indx].length<1){
              callback&&callback();
            }else{
              callback2&&callback2();
            }
          }

        },
        fail: function(data, code) {
          callback&&callback();
          console.log("handling fail, code=" + code);
        }
      });
    },
    storageDelete:function(name,callback){
      var self=this;
      storage.delete({
        key:name,
        success:function(data){
            callback&&callback();
            console.log(name+"storageDelete success=");
        },
        fail: function(data, code) {
          callback&&callback();
          console.log(name+"storageDelete fail, code=" + code);
        }
      });
    },
    //频道页面数据
    chlData:function(act){
      var self =this;
      fetch.fetch({
        url: common.api_uri + '/channel/' + self.options.channel_id +'/'+ gData.uid +'/rc/v1?passport='+gData.passport+'&flat=6&isH5=1',
          callback:function (rst) {
            console.log(common.api_uri + '/channel/' + self.options.channel_id +'/'+ gData.uid +'/rc/v1?passport='+gData.passport+'&flat=6&isH5=1')
              var rst=JSON.parse(rst.data);
              if(rst && rst.data && rst.data.columns){
                var playList = [];
                var orgList =[];
                if(act=='more'){
                   orgList = self.playList[self.currentIndex];
                }else{
                  orgList =[];
                }
                var page = self.page;
                self.buildColumns(rst.data.columns, function(playList){
                  playList = orgList.concat(playList);
                  page++;
                  self.loadingMore=false;
                  self.playList[self.currentIndex]=playList;
                  // self.storageDelete("playList",function(){
                  //   self.storageSet("playList",self.playList);
                  // })
                  self.page=page;
                  if (page == 0 && self.isWIFI){
                    // self.playVideo(playList[0].vid, playList[0].site,0);
                  }
                });
              }
              self.isRefreshing = false
              clearTimeout(self.timer)
              self.timer = null
          }
      });
    },
    onReachBottom: function() {
      this.loadingMore=true;
      this.chlData('more');
        // Do something when page reach bottom.
    },
    upper: function(evt) {
        //滚动到顶部/左边
        console.log(evt)
        try {
            console.log("----->> ",evt);
            this.scrollLeftPos=0;
        } catch (e) {
            console.log(e);
        }
    },
    lower: function(evt) {
        //滚动到底部/右边
        console.log(evt)
    },
    scroll: function(evt) {
        console.log(evt)
        try {
            console.log("----->> ",evt);
            this.scrollLeftPos=0;
        } catch (e) {
            console.log(e);
        }
    },
    buildTopNav : function(chlList,curId){
        var self =this;
        var tags=[];
        var chlList = chlList || [];
        // var filter=[71270000,71200000];
        var pos=1;
        var _playList=[];
        for(var i = 0; i < chlList.length; i++) {
          _playList.push([])
            var chlInfo = chlList[i];
            var channel_id = chlInfo["channel_id"];
            chlInfo.active="";
            if(curId == channel_id ){
                chlInfo.active="current";
                self.toView=curId;
                pos=i;
            }
                tags.push(chlInfo);
        }
        self.playList=_playList;
        console.log('************'+_playList.length)
        return tags;
    },
    getVideoLikeNum: function(vids,callback){
      fetch.fetch({
        url: 'https://score.my.tv.sohu.com/digg/get/v2.do?callback=&vids='+vids.join(',')+'&type=9001&isH5=1',
        dataType: 'json',
        method: 'GET',
        timeout: 3000,
        header: {
          'content-type': 'application/json'
        },
        success: function(rst){
          var rst=JSON.parse(rst.data)
          var resultList;
          if (rst.status==200){
            resultList = rst.message || [];
            callback && callback(resultList);
          }
        }
      });
    },
    buildColumns:function (data,callback) {
        var columns = data || [];
        var playList = [];
        var vids = [];
        var self = this;
        for (var col = 0, cnt = columns.length; col < cnt; col++) {
            try{
                var rs = columns[col] || {};
                var data_list = rs['data_list'] || [];
                rs.zh_name=encodeURIComponent(rs.name);
                var focus_img=[];
                if(data_list && data_list.length>0) {
                  var obj = data_list[0];
                  obj['play_count'] = obj.play_count || 0; //播放数
                  obj['cover'] = obj.data.hor_high_pic || obj["hor_w8_pic"] || video_blank_img;
                  obj['cover'] = common.formatUrl(obj['cover']);
                  obj['header'] = obj.pgc_header || gData.defaultHeader || '';
                  obj['userName'] = (obj.nick_name.length > 11 ? obj.nick_name.slice(0,11)+'...' : obj.nick_name) || '56视频';
                  //h5播放url
                  obj['play_url'] = common.makePlayUrl(obj);
                  obj['play_count_short'] = common.shortFixedCount(obj.play_count);
                  //小程序播放url
                  vids.push(obj.vid);
                  if (obj.vid) {
                      playList.push(obj);
                  }
                }
            }catch (e){
            }
        }
        callback&&callback(playList);
        this.getVideoLikeNum(vids,function(likeList){
          var i,item,len = likeList.length || 0;
          var _likeList = self.likeList||{};
          for(i=0;i<len;i++){
              item = likeList[i] || {};
              _likeList[item.vid] = {
                likeNum : item.upCount,
                isLiked : false
              };
              // _likeList[item.vid]=item.upCount;
          }
          self.likeList=_likeList;
          // console.log('likelist:'+JSON.stringify(self.likeList))
        });
    },
    playVideo:function(vid,site,index){
      var url = '',self = this;
      var i=0,playList = self.playList[self.currentIndex];
      if(playList[index].playUrl == undefined){
        playInfo.getPlayInfo(vid, site, function (rst) {
          playList[index].playUrl = rst;
          self.playList[self.currentIndex] = playList;
          self.currPlayIndex = index;
          self.currPlayUrl = rst;
        }, function () {
          prompt.showToast({
            title: '提示',
            message: '该视频无法播放',
          })
        });
      }else{
        self.playList[self.currentIndex] = playList;
        self.currPlayIndex = index;
        self.currPlayUrl = playList[index].playUrl;
      }
    },
    play: function (dataset) {
      var vid = dataset.vid;
      var site = dataset.site;
      var index = dataset.index;
      this.currPlayIndex = index;
      this.playVideo(vid, site,index);
    },
    playNext: function(event){
      console.log('playNext')
      var nextIndex = ++this.currPlayIndex;
      if(nextIndex >= this.playList[self.currentIndex].length){
        return;
      }
      var nextVideo = this.playList[self.currentIndex][nextIndex];
      var nextVid = nextVideo.vid;
      var nextSite = nextVideo.site;
      this.currPlayIndex = nextIndex;
      this.playVideo(nextVid,nextSite,nextIndex);
    },
    like : function(dataset){
      var vid = dataset.vid;
      var _likeNum = dataset.likenum || 0;
      var self = this;
      var _likeList = self.likeList;
      _likeList[vid] = _likeList[vid] || {};
      var _isLike = _likeList[vid].isLiked || 'false';
      var isUp = (_isLike && _isLike === 'true') ? false : true;
      if(isUp === true){
        fetch.fetch({
          url: 'https://score.my.tv.sohu.com/digg/up/v2.do?callback=&vid='+vid+'&type=9001&from=&isUp=56-weixin'+isUp,
          dataType: 'json',
          method: 'GET',
          timeout: 3000,
          header: {
            'content-type': 'application/json'
          },
          success: function (rst) {
            var msg = rst.data.message;
            if (rst.statusCode == 200 && msg !== {}) {
              _likeList[vid] = _likeList[vid] || {};
              _likeList[vid].isLiked = msg.isUp;
              _likeList[vid].likeNum = _likeNum+1;
              self.likeList=_likeList;
            }
          }
        });
      }else{
        _likeList[vid].isLiked = 'fasle';
        _likeList[vid].likeNum = _likeNum-1;
        self.likeList=_likeList;
      }
    },
    playError : function(e){
      console.log('error:'+e);
    },
    openPlayView:function (evt) {
        console.log('openPlayView:'+evt);
    },
    onShow: function () {
        var me = this;
        if (me.isWIFI) {
            network.subscribe({
                success: function (res) {
                    var networkType =JSON.stringify(res).type; // 返回网络类型2g，3g，4g，wifi
                    if (networkType !== 'wifi') {
                    me.isWIFI=false;
                        setTimeout(function () {
                        me.isWIFI=true;
                        }, 3000)
                    } else {
                    }
                }
            });
        }
    },
    goIndex: function (name,index) {
      this.$element(name)&&this.$element(name).scrollTo({ index: index, smooth: true })
    },
    refresh: function(e){
      var that = this;
      that.isRefreshing = e.refreshing
      this.chlData('fresh');
      if (this.timer === null) {
        this.timer = setTimeout(() => {
          // 关闭刷新状态
          this.isRefreshing = false;
          prompt.showToast({
            message: '刷新完成'
          })
          clearTimeout(this.timer)
          this.timer = null
        },3000)
      }
    },
    changeTabactive: function (e) {
      var self=this;
      // 切换tab
      console.log('----------切换tab: ' + e.index);
      console.log('----------channel_id: ' +this.options.channel_id);
      self.currentIndex=e.index;
      // this.playList[self.currentIndex]=[];
      this.options.channel_id=this.channelList&&this.channelList[e.index].channel_id;
      this.currentChannelId=this.options.channel_id;
      this.currPlayIndex='';
      // if(!(e.index==0&&this.options.channel_id==0)){return false;}
      self.chlData('fresh');
      // self.storageGet("playList",self.currentIndex,function(){
      //   self.chlData('fresh');
      // },function(){
      //   console.log("!!fresh!!!!!"+JSON.stringify(self.playList.length))
      // })
    },
    routePush: function (path,params) {
      console.log(JSON.stringify(params))
      // return false;
      router.push({
       uri:path,
        params: params
      })
    },
    shareText: function (sharedata) {
      share.share({
        type: 'text/html',
        data:sharedata.title+sharedata.playUrl,
        success:function(data){
          console.log("分享成功");
        },
        fail: function(data, code) {
          console.log("handling fail, code=" + code);
        }
      });
    }
}
