
const sendAjax = require('../../../utils/sendAjax.js')
const login = require('../../../utils/wxlogin.js')
Page({
  data: {
    userInfo: null, //用户信息
    phoneHeight:0,
    content:''
  },
  onLoad: function (options) {
    var userInfo = wx.getStorageSync('userinfo');
    this.setData({
      userInfo: userInfo
    })
    this.getPhoneInfo();
  },
  onShow: function (options) {
  },
  getPhoneInfo: function () {
    this.setData({
      phoneHeight: 750 / wx.getSystemInfoSync().windowWidth * wx.getSystemInfoSync().windowHeight
    })
  },
  //输入的内容
  input_content: function (e) {
    var content = e.detail.value;
    this.setData({
      content: content
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