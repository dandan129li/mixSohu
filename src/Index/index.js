import common from '../Common/common.js'
import Futil from '../util.js'
// import playInfo from '../Common/playinfo.js'
import fetch from '@system.fetch'
import router from '@system.router'
import network from '@system.network'
var video_blank_img = "https://m.tv.sohu.com/upload/touch/img/blank_h5.png?v=1";
var gData=Futil.data;
module.exports = {
  data: {
        toView: '0',
        scrollLeft: 0,
        channelList:[],
        currentChannelId:0,
        playList:[],
        queryData:{},
        video : {},
        playUrl : '',
        currPlayIndex : '',
        likeList : {},
        page : -1,
        currPlayedVideo:{},
        loadingMore:false,
        isWIFI : false,
        currPlayUrl : '',
        options:{}
    },
    onInit: function () {
        var self =this;
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
              }
          }
      });
        console.log("currnt ---> " +channel_id);
        //==========init model==============
    },
    onReady: function () {
        var self =this;
        self.chlList();
        self.chlData();
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
            }
          },
          fail: function () {
              prompt.showToast({
                  message: '失败'
              });
          }
      });
    },
    //频道页面数据
    chlData:function(){
      var self =this;
      fetch.fetch({
        url: common.api_uri + '/channel/' + self.options.channel_id +'/'+ gData.uid +'/rc/v1?passport='+gData.passport+'&flat=6&isH5=1',
          callback:function (rst) {
            console.log(common.api_uri + '/channel/' + self.options.channel_id +'/'+ gData.uid +'/rc/v1?passport='+gData.passport+'&flat=6&isH5=1')
              var rst=JSON.parse(rst.data);
              console.log(JSON.stringify(rst))
              if(rst && rst.data && rst.data.columns){
                var playList = [];
                var orgList = self.playList;
                var page = self.page;
                self.buildColumns(rst.data.columns, function(playList){
                  playList = orgList.concat(playList);
                  page++;
                  self.setData({'loadingMore':false ,'playList': playList, 'page': page});
                  if (page == 0 && self.isWIFI){
                    self.playVideo(playList[0].vid, playList[0].site,0);
                  }
                });
              }
          }
      });
    },
    onReachBottom: function() {
      this.loadingMore=true;
      this.chlData();
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
        for(var i = 0; i < chlList.length; i++) {
            var chlInfo = chlList[i];
            var channel_id = chlInfo["channel_id"];
            chlInfo.active="";
            if(curId == channel_id ){
                chlInfo.active="current";
                self.toView=curId;
                pos=i;
                self.scrollLeft=pos*100;
            }
                tags.push(chlInfo);
        }

        return tags;
    },
    getVideoLikeNum: function(vids,callback){
      fetch.fetch({
        url: 'https://score.my.tv.sohu.com/digg/get/v2.do?callback=?vids='+vids.join(',')+'type=9001&isH5=1',
        dataType: 'json',
        method: 'GET',
        timeout: 3000,
        header: {
          'content-type': 'application/json'
        },
        success: function(rst){
          var resultList;
          if (rst.data.status==200){
            resultList = rst.data.message || [];
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
                  obj['wx_play_url'] = common.makeWxPlayUrl(obj);
                  vids.push(obj.vid);
                  if (obj.vid) {
                      playList.push(obj);
                  }
                }
            }catch (e){
            }
        }
        this.getVideoLikeNum(vids,function(likeList){
          var i,item,len = likeList.length || 0;
          var _likeList = self.likeList;
          for(i=0;i<len;i++){
              item = likeList[i] || {};
              _likeList[item.vid] = {};
              _likeList[item.vid].likeNum = item.upCount;
              _likeList[item.vid].isLiked = false;
          }
          self.likeList=_likeList;
          callback && callback(playList);
        });
    },
    playVideo:function(vid,site,index){
      var url = '',me = this;
      var i=0,playList = this.playList;
      if(playList[index].playUrl == undefined){
        // playInfo.getPlayInfo(vid, site, function (rst) {
        //   url = rst;
        //   playList[index].playUrl = url;
        //   self.playList = playList;
        //   self.currPlayIndex = index;
        //   self.currPlayUrl = url;
        //   if (me.videoContext === undefined) {
        //     me.videoContext =  me.$element('player');
        //   }
        // }, function () {
        //   prompt.showToast({
        //     title: '提示',
        //     message: '该视频无法播放',
        //   })
        // });
      }else{
        self.playList = playList;
        self.currPlayIndex = index;
        self.currPlayUrl = playList[index].playUrl;
        if (me.videoContext === undefined) {
          me.videoContext =  me.$element('player');
        }
      }
    },
    play: function (event) {
      var dataset = event.currentTarget.dataset;
      var vid = dataset.vid;
      var site = dataset.site;
      var index = dataset.index;
      this.videoContext && this.videoContext.pause();
      this.playVideo(vid, site,index);
    },
    playNext: function(event){
      var nextIndex = ++this.currPlayIndex;
      if(nextIndex >= this.playList.length){
        return;
      }
      var nextVideo = this.playList[nextIndex];
      var nextVid = nextVideo.vid;
      var nextSite = nextVideo.site;
      this.videoContext && this.videoContext.pause();
      this.playVideo(nextVid,nextSite,nextIndex);
    },
    like : function(event){
      var dataset = event.currentTarget.dataset;
      var vid = dataset.vid;
      var _likeNum = dataset.likenum || 0;
      var self = this;
      var _likeList = self.likeList;
      _likeList[vid] = _likeList[vid] || {};
      var _isLike = _likeList[vid].isLiked || 'false';
      var isUp = (_isLike && _isLike === 'true') ? false : true;
      if(isUp === true){
        fetch.fetch({
          url: 'https://score.my.tv.sohu.com/digg/up/v2.do?callback=?vid='+vid+'&type=9001&from=&isUp=56-weixin'+isUp,
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
    jumpToPlay: function(event){
      var dataset = event.currentTarget.dataset;
      var index = dataset.index;
      var video = this.playList[index];
      if (this.likeList[video.vid]){
        video.likeNum = this.likeList[video.vid].likeNum;
      }
      var url = common.makeWxPlayUrl(video);
      this.videoContext && this.videoContext.pause();
      this.routePush('Play',url);
    },
    playError : function(e){
      console.log(e);
    },
    openPlayView:function (evt) {
        console.log(evt);
    },
    routePush: function (path,params) {
      if(path==='Index'){
        this.refreshUrl(params)
        return false;
      }
      router.push({
       uri:path,
        params: params
      })
    }
}