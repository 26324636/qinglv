
const sendAjax = require('../../../utils/sendAjax.js')
const login = require('../../../utils/wxlogin.js')
Page({
  data: {
    userInfo: null, //用户信息
    phoneHeight:0,
    content:'',
    date:'请选择日期',
    time:'请选择时间'
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
      phoneHeight: 750 / wx.getSystemInfoSync().windowWidth * wx.getSystemInfoSync().windowHeight - 320
    })
  },
  bindDateChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  bindTimeChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      time: e.detail.value
    })
  },
  //输入的内容
  input_content: function (e) {
    var content = e.detail.value;
    this.setData({
      content: content
    })
  },
  save:function(){
    var userId = this.data.userInfo.userId;
    var content = this.data.content;
    var day = this.data.date;
    var time = this.data.time;
    var remindTime = day + ' ' + time;
    if (day == '请选择日期'){
      wx.showToast({
        title: '请选择日期',
        icon:'none'
      })
    }else if(time == '请选择时间'){
      wx.showToast({
        title: '请选择时间',
        icon:'none'
      })
    }else{
      let infoOpt = {
        url: '/lovers/memo',
        type: 'POST',
        data: {
          userId: userId,
          content: content,
          remindTime: remindTime
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
            content: '添加成功',
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