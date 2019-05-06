const url = require('../../../config.js')
const sendAjax = require('../../../utils/sendAjax.js')
const login = require('../../../utils/wxlogin.js')
Page({
  data: {
    detail:'' //纪念日详情
  },
  onLoad: function (options) {
    console.log(options)
    var mes = JSON.parse(options.mes);
    // mes['markDate'] = mes.markDate.substring(0,10)
    this.setData({
      detail:mes
    })
  },
  //跳转纪念日编辑
  edit:function(){
    var detail = this.data.detail;
    wx.navigateTo({
      url: '../markdayEdit/markdayEdit?detail=' + JSON.stringify(detail),
    })
  },
  delete: function () {
    var id = this.data.detail.id;
    wx.showModal({
      title: '确认删除？',
      showCancel: true,
      success(res) {
        if (res.confirm) {
          let infoOpt = {
            url: '/lovers/loversDate/delete?id=' + id,
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