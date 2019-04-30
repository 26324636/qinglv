var url = require('../../config.js')
const sendAjax = require('../../utils/sendAjax.js')
var login = require('../../utils/wxlogin.js')
var util = require('../../utils/util.js')
Page({
  data: {
    userInfo: null, //用户信息
    isbound: 0, //是否绑定，0未绑定，1已绑定
    userInfo1:null, //绑定后的自己用户的信息
    userInfo2:null, //绑定后另一半用户的信息
    num1: 0, //想他天数
    num2: 0, //想我天数
    hiddenBindid: true, //是否隐藏绑定ID
    hiddenSign:true, //是否隐藏签到按钮
    input_bindid: '' //输入的绑定ID
  },
  onLoad: function (options) {
    var that = this;
    login.wxLogin(0, function (res) { //调用登录接口
      that.setData({
        userInfo: res,
      })
      if (that.data.userInfo.isbound == 1) { //如果已经绑定了，就获取双方的信息
        that.getLoversInfo();
      }
    });
  },
  //获得情侣信息的接口
  getLoversInfo:function(){
    var that = this;
    var loversId = that.data.userInfo.loversId;
    let infoOpt = {
      url: '/user/list?loversId=' + loversId,
      type: 'GET',
      data: {
      },
      header: {
        'content-type': 'application/json',
      },
    }
    let infoCb = {}
    infoCb.success = function (res) {
      //判断返回过来的数据，保证第一个是自己
      if (res.items[0].spouseId == that.data.userInfo.spouseId){
        var userInfo1 = res.items[0];
        var userInfo2 = res.items[1];
      }else{
        var userInfo1 = res.items[1];
        var userInfo2 = res.items[0];
      }
      that.setData({
        userInfo1:userInfo1,
        userInfo2:userInfo2
      })
      that.getSignInfo(); //获取签到信息
    }
    infoCb.beforeSend = () => { }
    sendAjax(infoOpt, infoCb, () => { });
  },
  //获取签到信息
  getSignInfo:function(){
    var that = this;
    var loversId = that.data.userInfo.loversId;
    var spouseId1 = that.data.userInfo1.spouseId;
    var spouseId2 = that.data.userInfo2.spouseId;
    let infoOpt = {
      url: '/lovers/sign',
      type: 'GET',
      data: {
        loversId: loversId ,
        spouseId1: spouseId1,
        spouseId2: spouseId2
      },
      header: {
        'content-type': 'application/json',
      },
    }
    let infoCb = {}
    infoCb.success = function (res) {
      console.log(res);
      var hiddenSign = false;
      //遍历数据，判断自己是否签到过了，如果签到了，就把签到按钮隐藏
      for(var i = 0 ; i < res.items.length ; i ++){
        if (res.items[i].spouseId == that.data.userInfo.spouseId){
          if (res.items[i].signDate !=""){
            hiddenSign = true;
          }
          break;
        }
      }
      that.setData({
        hiddenSign: hiddenSign,
        num1: res.items[0].total, //赋值 想他的天数
        num2: res.items[1].total  //赋值 想我的天数
      })
    }
    infoCb.beforeSend = () => { }
    sendAjax(infoOpt, infoCb, () => { });
  },
  //签到
  qiandao: function () {
    var that = this;
    var loversId = that.data.userInfo.loversId;
    var spouseId = that.data.userInfo.spouseId;
    var time = util.formatTime(new Date()).replace(/\//g, "-");
    console.log(time)
    let infoOpt = {
      url: '/lovers/sign',
      type: 'POST',
      data: {
        loversId: loversId,
        spouseId: spouseId,
        signDate: time
      },
      header: {
        'content-type': 'application/json',
      },
    }
    let infoCb = {}
    infoCb.success = function (res) {
      console.log(res);
      if(res.message == ""){
        wx.showModal({
          title: '提示',
          content: '签到成功',
          showCancel: false,
          success(res) {
            if (res.confirm) {
              var num1 = that.data.num1 + 1;
              that.setData({
                num1: num1,
                hiddenSign: true
              })
            }
          }
        })
        
      }
    }
    infoCb.beforeSend = () => { }
    sendAjax(infoOpt, infoCb, () => { });
  },
  //绑定
  bind: function () {
    this.setData({
      hiddenBindid: false
    })
  },
  //绑定id
  input_bindid: function (e) {
    var val = e.detail.value;
    this.setData({
      input_bindid: val
    })
  },
  //取消绑定
  cancelBindid: function () {
    this.setData({
      hiddenBindid: true,
      input_bindid:''
    })
  },
  //确认绑定对方
  confirmBindid: function (e) {
    var that = this;
    var input_bindid = this.data.input_bindid;
    var userId = this.data.userInfo.userId;
    if (input_bindid == '') {
      wx.showToast({
        title: '请输入对方ID',
        icon: 'none'
      })
    } else {
      let infoOpt = {
        url: '/user/binding',
        type: 'POST',
        data: {
          user: userId,
          spouse: input_bindid
        },
        header: {
          'content-type': 'application/json',
        },
      }
      let infoCb = {}
      infoCb.success = function (res) {
        console.log(res);
        if(res.message == "绑定失败"){
          wx.showToast({
            title: '请输入正确的ID',
            icon:'none'
          })
        }else{
          wx.showModal({
            title: '提示',
            content: '绑定成功',
            showCancel: false,
            success(res) {
              if (res.confirm) {
                login.wxLogin(0, function (res) {
                  that.setData({
                    userInfo: res,
                    hiddenBindid: true,
                    input_bindid: ''
                  })
                  that.getLoversInfo();
                });
                
              }
            }
          })
        }
      }
      infoCb.beforeSend = () => { }
      sendAjax(infoOpt, infoCb, () => { });
    }
  },
  //跳转愿望清单
  toYuanWang: function () {
    var isbound = this.data.userInfo.isbound;
    if (isbound == 0) {
      wx.showToast({
        title: '请先进行绑定',
        icon: 'none'
      })
    } else {
      wx.navigateTo({
        url: '../wish/wish',
      })
    }

  },
  //跳转今日天气
  toTianQi: function () {
    var isbound = this.data.userInfo.isbound;
    if (isbound == 0) {
      wx.showToast({
        title: '请先进行绑定',
        icon: 'none'
      })
    } else {
      wx.navigateTo({
        url: '../weather/weather',
      })
    }
  },
  //跳转电影推荐
  toDianYing: function () {
    var isbound = this.data.userInfo.isbound;
    if (isbound == 0) {
      wx.showToast({
        title: '请先进行绑定',
        icon: 'none'
      })
    } else {
      wx.navigateTo({
        url: '../movie/movie',
      })
    }
  },
  //跳转游戏娱乐
  toYouXi: function () {
    var isbound = this.data.userInfo.isbound;
    if (isbound == 0) {
      wx.showToast({
        title: '请先进行绑定',
        icon: 'none'
      })
    } else {
      wx.navigateTo({
        url: '../game/game',
      })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})