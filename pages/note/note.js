const url = require('../../config.js')
const sendAjax = require('../../utils/sendAjax.js')
const login = require('../../utils/wxlogin.js')
Page({
  data: {
    noteList:[{},{},{}]
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
  onLoad: function (options) {
  },
  onShow: function (options) {
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