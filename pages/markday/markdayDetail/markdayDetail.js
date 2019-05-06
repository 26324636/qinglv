const url = require('../../../config.js')
const sendAjax = require('../../../utils/sendAjax.js')
const login = require('../../../utils/wxlogin.js')
Page({
  data: {
    detail:''
  },
  onLoad: function (options) {
    console.log(options)
    var mes = JSON.parse(options.mes);
    // mes['markDate'] = mes.markDate.substring(0,10)
    this.setData({
      detail:mes
    })
  },
  edit:function(){
    var detail = this.data.detail;
    wx.navigateTo({
      url: '../markdayEdit/markdayEdit?detail=' + JSON.stringify(detail),
    })
  },
  onShow: function (options) {
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
    var detail = this.data.detail;
    return {
      title: detail.content,
      path: 'pages/markday/markdayDetail/markdayDetail?mes=' + JSON.stringify(detail),
    };
  }
})