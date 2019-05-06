const url = require('../../../config.js')
const sendAjax = require('../../../utils/sendAjax.js')
var app = getApp();
Page({
  data: {
    id:'', //愿望清单的id
    userInfo: null,  //用户的信息
    userId: null, //用户的id
    imgUrls: [], //愿望清单的图片
    arr_img: null, //愿望清单的上传时候的图片路径
    content: '', //愿望清单的内容
    lodingHidden: true, //是否隐藏
    canPublish: 1, //是否可以保存
  },
  onLoad: function (options) {
    var userInfo = wx.getStorageSync('userinfo');
    var userId = wx.getStorageSync('userinfo').userId;
    var id = options.id;
    this.setData({
      userInfo: userInfo,
      userId: userId,
      id:id
    })
  },
  //添加图片
  addPic: function () {
    var that = this
    var num = that.data.imgUrls.length
    var imgUrls = that.data.imgUrls
    var index = that.data.imgUrls.length;
    if (num < 9) {
      var cnt = 9 - num;
      wx.chooseImage({
        count: cnt,
        sizeType: ['compressed'],
        sourceType: ['album', 'camera'],
        success(res) {
          var tempFilePaths = res.tempFilePaths
          for (var i = tempFilePaths.length - 1; i >= 0; i--) {
            imgUrls.splice(index, 0, tempFilePaths[i])
          }
          that.setData({
            imgUrls: imgUrls
          })
          console.log(imgUrls)
        }
      })
    } else {
      wx.showToast({
        title: '最多上传9张图片噢~',
        icon: 'none'
      })
    }

  },
  //图片触发的方法
  uploadimg: function () {//这里触发图片上传的方法
    var pics = this.data.imgUrls;
    var that = this;
    that.uploadimgs({
      url: 'https://www.sxscott.com/crazyBird/upload/avatar',//这里是你图片上传的接口
      path: pics,//这里是选取的图片的地址数组
      formData: {
        picType: 'wish'
      }
    });
  },
  //上传图片
  uploadimgs: function (data) {
    var that = this;
    var i = data.i ? data.i : 0; //当前上传的哪张图片
    var success = data.success ? data.success : 0; //上传成功的个数
    var fail = data.fail ? data.fail : 0; //上传失败的个数
    var pics = data.pics ? data.pics : [];
    wx.uploadFile({
      header: {
        'content-type': 'application/json',
        'authorization': "KfvmkLWZVnVRKhw1H2AWxMNNbyy3BjGDt9ALjdto0sFekuR/7qCECmfjLtBKoZaT"
      },
      url: data.url,
      filePath: data.path[i],
      name: 'file', //这里根据自己的实际情况改
      formData: data.formData, //这里是上传图片时一起上传的数据
      success: (resp) => {
        console.log(JSON.parse(resp.data))
        success++; //图片上传成功，图片上传成功的变量+1
        pics.push(JSON.parse(resp.data).urlList[0]);

      },
      fail: (res) => {
        fail++; //图片上传失败，图片上传失败的变量+1
        console.log('fail:' + i + "fail:" + fail);
      },
      complete: () => {
        i++; //这个图片执行完上传后，开始上传下一张
        if (i == data.path.length) { //当图片传完时，停止调用          
          console.log('成功：' + success + " 失败：" + fail);
          that.setData({
            arr_img: pics
          })
          that.publish();
        } else { //若图片还没有传完，则继续调用函数
          data.i = i;
          data.success = success;
          data.fail = fail;
          data.pics = pics;
          that.uploadimgs(data);
        }
      }
    });
  },
  //发布保存
  publish: function () {
    var id = this.data.id;
    var userId = this.data.userId;
    var imgUrls = JSON.stringify(this.data.arr_img);
    var content = this.data.content;
    var that = this;
    let infoOpt = {
      url: '/lovers/wish',
      type: 'PUT',
      data: {
        id:id,
        userId: userId,
        content: content,
        url: imgUrls,
        state:1
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
          content: '记录成功',
          showCancel: false,
          success(res) {
            if (res.confirm) {
              wx.hideLoading();
              wx.navigateBack({})
            }
          }
        })
      }
    }
    infoCb.beforeSend = () => {
      wx.showLoading({
        title: '加载中',
      })
    }
    sendAjax(infoOpt, infoCb, () => { });
  },
  //判断所有条件是否完成
  publishBtn: function () {
    var that = this;
    var userInfo = this.data.userInfo;
    var userId = this.data.userId;
    var imgUrls = this.data.imgUrls;
    var content = this.data.content;
    that.setData({
      canPublish: 2
    })
    if (imgUrls.length == 0) {
      wx.showToast({
        title: '请先添加图片',
        icon: 'none'
      })
      that.setData({
        canPublish: 1
      })
    } else if (content == '') {
      wx.showToast({
        title: '请输入内容',
        icon: 'none'
      })
      that.setData({
        canPublish: 1
      })
    } else {
      this.uploadimg();
    }
  },
  //移除图片
  removePic: function (e) {
    var that = this;
    var imgUrls = that.data.imgUrls;
    console.log(e);
    var index = e.currentTarget.dataset.index;
    imgUrls.splice(index, 1);
    console.log(imgUrls)
    that.setData({
      imgUrls: imgUrls
    })
  },
  //输入的内容
  input_content: function (e) {
    var content = e.detail.value;
    this.setData({
      content: content
    })
  },
  delete: function () {
    var id =  this.data.id;
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
  onReady: function () { },
  onShow: function () {
  },
  onHide: function () { },
  onUnload: function () { },
  onPullDownRefresh: function () { },
  onReachBottom: function () { },
  onShareAppMessage: function () { }
})