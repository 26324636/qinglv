const url = require('../../config.js')
const sendAjax = require('../../utils/sendAjax.js')
const login = require('../../utils/wxlogin.js')
Page({
  data: {
    list: [{ cont: '我爱你一定爱到花儿都枯萎了' }, { cont: 'cao你千万遍' }, { cont: '晚安宝贝' }, { cont: '一定要天天开心啊' }, { cont: '我爱你一定爱到花儿都枯萎了' }, { cont: 'cao你千万遍' }, { cont: '晚安宝贝' }, { cont: '一定要天天开心啊' }]
  },
  onLoad: function (options) {
  },
  onShow: function (options) {
  },
  toAdd:function(){
    wx.navigateTo({
      url: 'leavemesAdd/leavemesAdd',
    })
  },
  toDetail:function(){
    wx.navigateTo({
      url: 'leavemesDetail/leavemesDetail',
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