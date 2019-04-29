const url = require('../../../config.js')
const sendAjax = require('../../../utils/sendAjax.js')
const login = require('../../../utils/wxlogin.js')
Page({
  data: {
    date: '点击选择纪念日时间'
  },
  onLoad: function (options) {
  },
  onShow: function (options) {
  },
  bindDateChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
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