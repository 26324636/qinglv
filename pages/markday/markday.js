const url = require('../../config.js')
const sendAjax = require('../../utils/sendAjax.js')
const login = require('../../utils/wxlogin.js')
Page({
  data: {
    userInfo: null, //用户信息
    list: [] //纪念日列表
  },
  onLoad: function(options) {
  },
  onShow: function(options) {
    var userInfo = wx.getStorageSync('userinfo');
    this.setData({
      userInfo: userInfo
    })
    this.getMarkDay();
  },
  //获取纪念日列表
  getMarkDay: function() {
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
    infoCb.success = function(res) {
      console.log(res);
      var list = res.items;
      for (var i = 0; i < list.length; i++) {
        list[i].markDate = list[i].markDate.substring(0, 10)
      }
      that.setData({
        list: list
      })
    }
    infoCb.beforeSend = () => {}
    sendAjax(infoOpt, infoCb, () => {});
  },
  //跳转增加
  toAdd: function() {
    var isbound = wx.getStorageSync('userinfo').isbound;
    if (isbound == 1) {
      wx.navigateTo({
        url: 'markdayAdd/markdayAdd',
      })
    } else {
      wx.showToast({
        title: '请先绑定情侣再进行操作',
        icon: 'none'
      })
    }
  },
  //跳转详情
  toDetail: function(e) {

    var mes = e.currentTarget.dataset.mes;
    console.log(mes)
    wx.navigateTo({
      url: 'markdayDetail/markdayDetail?mes=' + JSON.stringify(mes),
    })
  },
  onReady: function() {},

  onHide: function() {},
  onUnload: function() {},
  onPullDownRefresh: function() {},
  onReachBottom: function() {},
  onShareAppMessage: function() {}
})