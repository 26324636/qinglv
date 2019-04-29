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
    goodsDetail: { goodsContent: '的王菲王菲王菲为额外购房热Greg然而港口附近问和我福IE我回复为会', goodsImg: ['https://wx.qlogo.cn/mmopen/vi_32/sh9EPvS6dHWkTxZ6sPRH55nIIUZdMU2Xz26OGrSAGrbmPuib765Y0DafRP9KicD1DSmFcB5tHAicfJYSC5g6yFdwQ/132', 'https://wx.qlogo.cn/mmopen/vi_32/sh9EPvS6dHWkTxZ6sPRH55nIIUZdMU2Xz26OGrSAGrbmPuib765Y0DafRP9KicD1DSmFcB5tHAicfJYSC5g6yFdwQ/132', 'https://wx.qlogo.cn/mmopen/vi_32/sh9EPvS6dHWkTxZ6sPRH55nIIUZdMU2Xz26OGrSAGrbmPuib765Y0DafRP9KicD1DSmFcB5tHAicfJYSC5g6yFdwQ/132', 'https://wx.qlogo.cn/mmopen/vi_32/sh9EPvS6dHWkTxZ6sPRH55nIIUZdMU2Xz26OGrSAGrbmPuib765Y0DafRP9KicD1DSmFcB5tHAicfJYSC5g6yFdwQ/132', 'https://wx.qlogo.cn/mmopen/vi_32/sh9EPvS6dHWkTxZ6sPRH55nIIUZdMU2Xz26OGrSAGrbmPuib765Y0DafRP9KicD1DSmFcB5tHAicfJYSC5g6yFdwQ/132', 'https://wx.qlogo.cn/mmopen/vi_32/sh9EPvS6dHWkTxZ6sPRH55nIIUZdMU2Xz26OGrSAGrbmPuib765Y0DafRP9KicD1DSmFcB5tHAicfJYSC5g6yFdwQ/132', 'https://wx.qlogo.cn/mmopen/vi_32/sh9EPvS6dHWkTxZ6sPRH55nIIUZdMU2Xz26OGrSAGrbmPuib765Y0DafRP9KicD1DSmFcB5tHAicfJYSC5g6yFdwQ/132', 'https://wx.qlogo.cn/mmopen/vi_32/sh9EPvS6dHWkTxZ6sPRH55nIIUZdMU2Xz26OGrSAGrbmPuib765Y0DafRP9KicD1DSmFcB5tHAicfJYSC5g6yFdwQ/132', 'https://wx.qlogo.cn/mmopen/vi_32/sh9EPvS6dHWkTxZ6sPRH55nIIUZdMU2Xz26OGrSAGrbmPuib765Y0DafRP9KicD1DSmFcB5tHAicfJYSC5g6yFdwQ/132']}//商品的详情

  },
  onLoad: function (options) {
    var id = options.id;
    // var id = 1;

    this.setData({
      id: id,
    })

  },
  onShow: function () {
    var that = this;
    login.wxLogin(0, function (res) {
      console.log(res);
      that.setData({
        userInfo: res,
      })
    })
    var userId = wx.getStorageSync('userinfo').userId;
    var avatar = wx.getStorageSync('userinfo').avatar;
    that.setData({
      userId: userId,
      avatar: avatar
    })
    that.getDetail(); //获取商品的详情
  },
  //获取二手详情
  getDetail: function () {
    var that = this;
    let infoOpt = {
      url: '/secondary/goods/' + this.data.id,
      type: 'GET',
      data: {},
      header: {
        'content-type': 'application/json',
      },
    }
    let infoCb = {}
    infoCb.success = function (res) {
      // console.log(res);
      var goodsDetail = res.list[0];
      var arr = goodsDetail.goodsImg;
      goodsDetail['goodsImg'] = JSON.parse(arr);
      that.setData({
        goodsDetail: goodsDetail,
        schoolNum: goodsDetail.userId
      })
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
    this.setData({
      pageNo: 1,
      comment: [],
    })
    wx.showLoading({
      title: '加载中',
    })
    this.getDetail();
    this.getIsCollection();
    this.getCollectionNum();
    this.getComment();
    wx.stopPullDownRefresh();
  },
  //上拉加载
  onReachBottom: function () {
    var pageNo = this.data.pageNo;
    var pageSize = this.data.pageSize;
    if (this.data.comment.length >= pageSize) {
      this.setData({
        pageNo: pageNo + 1,
        lodingHidden: false
      })
      this.getBottomComment();
    }
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