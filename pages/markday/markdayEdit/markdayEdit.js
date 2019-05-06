const url = require('../../../config.js')
const sendAjax = require('../../../utils/sendAjax.js')
const login = require('../../../utils/wxlogin.js')
Page({
  data: {
    detail:'' //纪念日详情
  },

  onLoad: function (options) { 
    //获取上一个页面传过来的纪念日的参数
    var detail = JSON.parse(options.detail);
    console.log(detail)
    this.setData({
      detail: detail
    })
  },

  //监听日期更换赋值
  bindDateChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var detail = this.data.detail;
    detail['markDate'] = e.detail.value
    this.setData({
      detail: detail
    })
  },
  //保存纪念日的
  save:function(){
    var content = this.data.detail.content;
    var id = this.data.detail.id;
    var markDate = this.data.detail.markDate;
    let infoOpt = {
      url: '/lovers/loversDate/update',
      type: 'POST',
      data: {
        content: content,
        id: id,
        loverDate: markDate
      },
      header: {
        'content-type': 'application/json',
      },
    }
    let infoCb = {}
    infoCb.success = function (res) {
      console.log(res);
      if(res.code =='200'){
        wx.showModal({
          title: '提示',
          content: '保存成功',
          showCancel: false,
          success(res) {
            if (res.confirm) {
              wx.switchTab({
                url: '../markday',
              })
            }
          }
        })
      }
    }
    infoCb.beforeSend = () => { }
    sendAjax(infoOpt, infoCb, () => { });
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
  }
})