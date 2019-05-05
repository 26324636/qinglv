const url = require('../../config.js')
const sendAjax = require('../../utils/sendAjax.js')
const login = require('../../utils/wxlogin.js')
Page({
  data: {
    userInfo: null, //用户信息
    list: []
  },
  onLoad: function (options) {
    var userInfo = wx.getStorageSync('userinfo');
    this.setData({
      userInfo: userInfo
    })


  },
  onShow: function (options) {
    this.getMarkDay();
  },
  getMarkDay: function () {
    var that = this;
    var loversId = this.data.userInfo.loversId;
    let infoOpt = {
      url: '/lovers/loversDate/get',
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
        list: res.items
      })
    }
    infoCb.beforeSend = () => { }
    sendAjax(infoOpt, infoCb, () => { });
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