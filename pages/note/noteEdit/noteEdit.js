
const sendAjax = require('../../../utils/sendAjax.js')
const login = require('../../../utils/wxlogin.js')
Page({
  data: {
    userInfo: null, //用户信息
    phoneHeight: 0, //当前系统手机的高度
    content: '', //备忘录编辑的内容
    id:'', //备忘录的id 
    date: '请选择日期', //备忘的提醒日期
    time: '请选择时间' //备忘的提醒时间
  },
  onLoad: function (options) {
    console.log(options)
    var userInfo = wx.getStorageSync('userinfo');
    var content = options.content;
    //将上个页面传回来的提醒时间拆分成日期和时间
    var date = options.remindTime.substring(0,10);
    var time = options.remindTime.substring(11, 16);
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
  //获取系统的手机高度
  getPhoneInfo: function () {
    this.setData({
      phoneHeight: 750 / wx.getSystemInfoSync().windowWidth * wx.getSystemInfoSync().windowHeight - 320
    })
  },
  //监听日期变更
  bindDateChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  //监听时间变更
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
  delete:function(){
    var id = this.data.id;
    wx.showModal({
      title: '确认删除？',
      showCancel: true,
      success(res) {
        if (res.confirm) {
          let infoOpt = {
            url: '/lovers/memo?id=' + id,
            type: 'DELETE',
            data: {
            },
            header: {
              'content-type': 'application/json',
            },
          }
          let infoCb = {}
          infoCb.success = function (res) {
            console.log(res);
          }
          infoCb.beforeSend = () => { }
          sendAjax(infoOpt, infoCb, () => { });
          wx.navigateBack({
          })
        }
      }
    })
   
  },
  //保存
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
    } else if (time == '请选择时间') {
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