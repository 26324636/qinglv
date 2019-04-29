const url = require('../../config.js')
const sendAjax = require('../../utils/sendAjax.js')
const login = require('../../utils/wxlogin.js')
Page({
  data: {
    list: [{ cont: '第一次亲吻的日子' }, { cont: '第一次拥抱的日子' }, { cont: '我们在一起啦' }, { cont: '第一次携手旅行的日子' }, { cont: '第一次约会的日子' }, { cont: '第一次看电影的日子' }]
  },
  onLoad: function (options) {
  },
  onShow: function (options) {
  },
  toAdd: function () {
    wx.navigateTo({
      url: 'markdayAdd/markdayAdd',
    })
  },
  toDetail: function () {
    wx.navigateTo({
      url: 'markdayDetail/markdayDetail',
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