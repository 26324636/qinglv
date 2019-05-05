const url = require('../../../config.js')
const sendAjax = require('../../../utils/sendAjax.js')
const login = require('../../../utils/wxlogin.js')
Page({
  data: {
    userInfo: null, //用户信息
    title:'',
    date: '点击选择纪念日时间'
  },
  onLoad: function (options) {
    var userInfo = wx.getStorageSync('userinfo');
    this.setData({
      userInfo: userInfo
    })
  },
  onShow: function (options) {
  },
  add:function(){
    var that = this;
    var title = this.data.title;
    var loversId = this.data.userInfo.loversId;
    var markDate = this.data.date;
    if(title == ''){
      wx.showToast({
        title: '请输入纪念日名字',
        icon:'none'
      })
    } else if (markDate == '点击选择纪念日时间'){
       wx.showToast({
        title: '请选择纪念日时间',
        icon:'none'
      })
    }else{
      let infoOpt = {
        url: '/lovers/loversDate/insert',
        type: 'POST',
        data: {
          content: title,
          loversId: loversId,
          loverDate: markDate
        },
        header: {
          'content-type': 'application/json',
        },
      }
      let infoCb = {}
      infoCb.success = function (res) {
        console.log(res);
        if(res.code == '200'){
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
  title_input:function(e){
    var title = e.detail.value;
    this.setData({
      title: title
    })
  },
  bindDateChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
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