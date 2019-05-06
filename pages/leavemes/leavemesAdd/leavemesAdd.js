const sendAjax = require('../../../utils/sendAjax.js')
const login = require('../../../utils/wxlogin.js')
Page({
  data: {
    userInfo: null, //用户信息
    content:'', //留言的内容 
    phoneHeight: 0 //当前系统手机高度
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
  //发布留意
  publish: function(){
    console.log(1111)
    var that = this;
    var userId = this.data.userInfo.userId;
    var loversId = this.data.userInfo.loversId;
    var content = this.data.content;
    if(content == ''){
      wx.showToast({
        title: '请输入留言内容',
        icon:'none'
      })
    }else{
      let infoOpt = {
        url: '/lovers/chat/add',
        type: 'POST',
        data: {
          userId: userId,
          loversId: loversId,
          content: content
        },
        header: {
          'content-type': 'application/json',
        },
      }
      let infoCb = {}
      infoCb.success = function (res) {
        console.log(res);
        if (res.code == '200') {
          wx.showModal({
            title: '提示',
            content: '留言成功',
            showCancel: false,
            success(res) {
              if (res.confirm) {
                wx.navigateBack({

                })
              }
            }
          })
        }
      }
      infoCb.beforeSend = () => { }
      sendAjax(infoOpt, infoCb, () => { });
    }
    
  },
  //输入的内容
  input_content: function (e) {
    var content = e.detail.value;
    console.log(content)
    this.setData({
      content: content
    })
  },
  //获取手机的高度
  getPhoneInfo: function () {
    this.setData({
      phoneHeight: 750 / wx.getSystemInfoSync().windowWidth * wx.getSystemInfoSync().windowHeight
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