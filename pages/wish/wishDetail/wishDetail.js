const url = require('../../../config.js')
const sendAjax = require('../../../utils/sendAjax.js')
const login = require('../../../utils/wxlogin.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: null, //商品的id，
    userId: null, //用户的id
    avatar: null, //用户的头像
    goodsDetail: ''

  },
  onLoad: function (options) {
    // var id = options.id;
    var id = 7;
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
    }
    infoCb.beforeSend = () => {
      // wx.showLoading({
      //   title: '加载中',
      // })
    }
    sendAjax(infoOpt, infoCb, () => { });
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