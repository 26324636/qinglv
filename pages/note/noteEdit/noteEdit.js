
const sendAjax = require('../../../utils/sendAjax.js')
const login = require('../../../utils/wxlogin.js')
Page({
  data: {
    userInfo: null, //用户信息
    phoneHeight: 0,
    content: '',
    id:'',
    date: '请选择日期',
    time: '请选择时间'
  },
  onLoad: function (options) {
    console.log(options)
    var userInfo = wx.getStorageSync('userinfo');
    var content = options.content;
    var date = options.remindTime.substring(0,10);
    var time = options.remindTime.substring(11, options.remindTime.length);
    var id = options.id;
    this.setData({
      userInfo: userInfo,
      content: content,
      date: date,
      time: time,
      id:id
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
  save: function () {
    var userId = this.data.userInfo.userId;
    var content = this.data.content;
    var day = this.data.date;
    var time = this.data.time;
    var remindTime = day + ' ' + time;
    var id = this.data.id;
    if (day == '请选择日期') {
      wx.showToast({
        title: '请选择日期',
        icon: 'none'
      })
    } else if (time = '请选择时间') {
      wx.showToast({
        title: '请选择时间',
        icon: 'none'
      })
    } else {
      let infoOpt = {
        url: '/lovers/memo',
        type: 'PUT',
        data: {
          userId: userId,
          content: content,
          remindTime: remindTime,
          id:id
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
            content: '修改成功',
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