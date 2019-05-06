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

  },
  onShow: function (options) {
    this.getNote();
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
      that.setData({
        noteList:res.items
      })
    }
    infoCb.beforeSend = () => { }
    sendAjax(infoOpt, infoCb, () => { });
  },
  toAdd:function(){
    wx.navigateTo({
      url: 'noteAdd/noteAdd',
    })
  },
  toDetail:function(e){
    console.log(e)
    var content = e.currentTarget.dataset.content;
    var remindTime = e.currentTarget.dataset.remindtime;
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: 'noteEdit/noteEdit?content=' + content + '&remindTime=' + remindTime + '&id=' +id,
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