var url = require('../../config.js')
const sendAjax = require('../../utils/sendAjax.js')
var login = require('../../utils/wxlogin.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    isbound:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;  
    login.wxLogin(0, function (res) {
      that.setData({
        userInfo: res,
      })
    });
    var userInfo = wx.getStorageSync('userinfo');
    this.setData({
      userInfo: userInfo
    })
  },
  toYuanWang:function(){
    wx.navigateTo({
      url: '',
    })
  },
  toTianQi: function () {
    wx.navigateTo({
      url: '../weather/weather',
    })
  },
  toDianYing: function () {
    wx.navigateTo({
      url: '../movie/movie',
    })
  },
  toYouXi: function () {
    wx.navigateTo({
      url: '../game/game',
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})