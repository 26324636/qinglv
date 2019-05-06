const url = require('../../config.js')
const sendAjax = require('../../utils/sendAjax.js')
const login = require('../../utils/wxlogin.js')
Page({
  data: {
    userInfo: null, //用户信息
    list: null //留言列表
  },
  onLoad: function (options) {
  },
  onShow: function (options) {
    var userInfo = wx.getStorageSync('userinfo');
    this.setData({
      userInfo: userInfo
    })
    this.getLeaveMes();
  },
  //获取留言信息
  getLeaveMes:function(){
    var that = this;
    var loversId = this.data.userInfo.loversId;
    let infoOpt = {
      url: '/lovers/chat/get',
      type: 'GET',
      data: {
        loversId: loversId
      },
      header: {
        'content-type': 'application/json',
      },
    }
    let infoCb = {}
    infoCb.success = function (res) {
      console.log(res);
      that.setData({
        list:res.items
      })
    }
    infoCb.beforeSend = () => { }
    sendAjax(infoOpt, infoCb, () => { });
  },
  //跳转留言
  toAdd:function(){
    var isbound = wx.getStorageSync('userinfo').isbound;
    if(isbound == 1){
      wx.navigateTo({
        url: 'leavemesAdd/leavemesAdd',
      })
    }else{
      wx.showToast({
        title: '请先绑定情侣再进行操作',
        icon:'none'
      })
    }

  },
  toDetail:function(e){
    console.log(e)
    var mes = JSON.stringify(e.currentTarget.dataset.mes);
    wx.navigateTo({
      url: 'leavemesDetail/leavemesDetail?mes=' + mes,
    })
  },
  onReady: function () {
  },

  onHide: function () {
  },
  onUnload: function () {
  },
  onPullDownRefresh: function () {
  },
  onReachBottom: function () {
  },
  onShareAppMessage: function () {
  }
})