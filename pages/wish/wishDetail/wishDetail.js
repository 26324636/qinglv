const url = require('../../../config.js')
const sendAjax = require('../../../utils/sendAjax.js')
const login = require('../../../utils/wxlogin.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: null, 
    userInfo: null,
    detail: ''

  },
  onLoad: function (options) {
    var id = options.id;
    // var id = 7;
    this.setData({
      id: id,
    })

  },
  onShow: function () {
    var that = this;
    login.wxLogin(0, function (res) {
      that.setData({
        userInfo: res,
      })
    })
    that.getDetail(); //获取商品的详情
  },
  //获取详情
  getDetail: function () {
    var that = this;
    let infoOpt = {
      url: '/lovers/wish/item?id=' + this.data.id,
      type: 'GET',
      data: {},
      header: {
        'content-type': 'application/json',
      },
    }
    let infoCb = {}
    infoCb.success = function (res) {
      console.log(res);
      var detail = res;
      detail['url'] = JSON.parse(detail.url);
      that.setData({
        detail:detail
      })
    }
    infoCb.beforeSend = () => {
      // wx.showLoading({
      //   title: '加载中',
      // })
    }
    sendAjax(infoOpt, infoCb, () => { });
  },
  delete: function () {
    var id = this.data.id;
    wx.showModal({
      title: '确认删除？',
      showCancel: true,
      success(res) {
        if (res.confirm) {
          let infoOpt = {
            url: '/lovers/wish?id=' + id,
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
  onReady: function () {

  },

  onHide: function () {

  },
  onUnload: function () {

  },
  //下拉刷新
  onPullDownRefresh: function () {
  },
  //上拉加载
  onReachBottom: function () {
  },
  onShareAppMessage: function () {
    var id = this.data.id;
    var name = this.data.goodsDetail.goodsTitle;
    return {
      title: '推荐给您 ' + name,
      path: 'pages/secondHand/secondHandDetail/secondHandDetail?id=' + id,
    };
  }
})