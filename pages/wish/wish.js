const url = require('../../config.js')
const sendAjax = require('../../utils/sendAjax.js')
const login = require('../../utils/wxlogin.js')
Page({
  data: {
    phoneHeight:null,
    list: [{ type: 0 }, { type: 1 }, { type: 1 }, { type: 0 }, { type: 1 }, { type: 1 }, { type: 0 }, { type: 1 }, { type: 1 }, { type: 0 }, { type: 1 }, { type: 1 }, { type: 0 }, { type: 1 }, { type: 1 }, { type: 0 }]
  },
  onLoad: function (options) {
    this.getPhoneInfo();
  },
  onShow: function (options) {
  },
  getPhoneInfo: function () {
    this.setData({
      phoneHeight: 750 / wx.getSystemInfoSync().windowWidth * wx.getSystemInfoSync().windowHeight -360
    })
  },
  toAdd:function(){
    wx.navigateTo({
      url: 'wishAdd/wishAdd',
    })
  },
  toDetail: function () {
    wx.navigateTo({
      url: 'wishDetail/wishDetail',
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