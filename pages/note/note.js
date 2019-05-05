const url = require('../../config.js')
const sendAjax = require('../../utils/sendAjax.js')
const login = require('../../utils/wxlogin.js')
Page({
  data: {
    userInfo: null, //用户信息
    noteList:[{},{},{}]
  },
  onLoad: function (options) {
    var userInfo = wx.getStorageSync('userinfo');
    this.setData({
      userInfo:userInfo
    })
    this.getNote();
  },
  onShow: function (options) {
  },
  getNote:function(){
    var that = this;
    var userId = this.data.userInfo.userId;
    let infoOpt = {
      url: '/lovers/memo',
      type: 'GET',
      data: {
        userId:userId
      },
      header: {
        'content-type': 'application/json',
      },
    }
    let infoCb = {}
    infoCb.success = function (res) {
      console.log(res);
    }
    infoCb.beforeSend = () => { }
    sendAjax(infoOpt, infoCb, () => { });
  },
  toAdd:function(){
    wx.navigateTo({
      url: 'noteAdd/noteAdd',
    })
  },
  toDetail:function(){
    wx.navigateTo({
      url: 'noteEdit/noteEdit',
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