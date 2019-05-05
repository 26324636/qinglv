const url = require('../../config.js')
const sendAjax = require('../../utils/sendAjax.js')
const login = require('../../utils/wxlogin.js')
Page({
  data: {
    userInfo: null, //用户信息
    list: null
  },
  onLoad: function (options) {
    var userInfo = wx.getStorageSync('userinfo');
    this.setData({
      userInfo: userInfo
    })

  },
  onShow: function (options) {
    this.getLeaveMes();
  },
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
  toAdd:function(){
    wx.navigateTo({
      url: 'leavemesAdd/leavemesAdd',
    })
  },
  // toDetail:function(){
  //   wx.navigateTo({
  //     url: 'leavemesDetail/leavemesDetail',
  //   })
  // },
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