const sendAjax = require('../../../utils/sendAjax.js')
const login = require('../../../utils/wxlogin.js')
Page({
  data: {
    phoneHeight: 0, //当前系统手机高度
    mes:''
  },
  onLoad: function (options) {
    this.getPhoneInfo();
    this.setData({
      mes:JSON.parse(options.mes)
    })
  },
  onShow: function (options) {
  },
  delete: function () {
    var id = this.data.mes.id;
    wx.showModal({
      title: '确认删除？',
      showCancel: true,
      success(res) {
        if (res.confirm) {
          let infoOpt = {
            url: '/lovers/chat/delete?id=' + id,
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