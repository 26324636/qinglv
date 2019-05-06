const url = require('../../config.js')
const sendAjax = require('../../utils/sendAjax.js')
const login = require('../../utils/wxlogin.js')
Page({
  data: {
    userInfo:null,
    phoneHeight:null,
    list: [{ type: 0 }, { type: 1 }, { type: 1 }, { type: 0 }, { type: 1 }, { type: 1 }, { type: 0 }, { type: 1 }, { type: 1 }, { type: 0 }, { type: 1 }, { type: 1 }, { type: 0 }, { type: 1 }, { type: 1 }, { type: 0 }],
    hiddenAdd: true,
    input_add:''
  },
  onLoad: function (options) {
    var userInfo = wx.getStorageSync('userinfo');
    this.setData({
      userInfo: userInfo
    })
    this.getPhoneInfo();
  },
  onShow: function (options) {
    this.getWishList();
  },
  getPhoneInfo: function () {
    this.setData({
      phoneHeight: 750 / wx.getSystemInfoSync().windowWidth * wx.getSystemInfoSync().windowHeight -360
    })
  },
  getWishList:function(){
    var that = this;
    var userId = this.data.userInfo.userId;
    let infoOpt = {
      url: '/lovers/wish',
      type: 'GET',
      data: {
        userId: userId,
      },
      header: {
        'content-type': 'application/json',
      },
    }
    let infoCb = {}
    infoCb.success = function (res) {
      console.log(res);
      that.setData({
        list:res.items
      })
    }
    infoCb.beforeSend = () => { }
    sendAjax(infoOpt, infoCb, () => { });
  },
  addList:function(){
    this.setData({
      hiddenAdd:false
    })
  },
  //绑定id
  input_add: function (e) {
    var val = e.detail.value;
    this.setData({
      input_add: val
    })
  },
  //取消绑定
  cancelAdd: function () {
    this.setData({
      hiddenAdd: true,
      input_add: ''
    })
  },
  //确认绑定对方
  confirmAdd: function (e) {
    var that = this;
    var input_add = this.data.input_add;
    var userId = this.data.userInfo.userId;
    if (input_add == '') {
      wx.showToast({
        title: '请输入清单',
        icon: 'none'
      })
    } else {
      let infoOpt = {
        url: '/lovers/wish',
        type: 'POST',
        data: {
          userId: userId,
          title: input_add,
          state:0
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
                that.setData({
                  hiddenAdd:true
                })
                that.getWishList();
              }
            }
          })
        }
      }
      infoCb.beforeSend = () => { }
      sendAjax(infoOpt, infoCb, () => { });
    }
  },

  toAdd:function(e){
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: 'wishAdd/wishAdd?id=' + id,
    })
  },
  toDetail: function () {
    wx.navigateTo({
      url: 'wishDetail/wishDetail',
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