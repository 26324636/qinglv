//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    wx.login({
      success: (res) => {
        if (res.code) {
          wx.request({
            url: "https://api.weixin.qq.com/sns/jscode2session",
            data: {
              appid: 'wx2182929c9a623dcd', //你的appid
              secret: '4122dac9c89fd205684cdc7f04cb5ee2', //你的secret
              js_code: res.code,
              grant_type: "authorization_code"
            },
            success: (res) => {
              console.log(res);
              wx.setStorageSync('oppenid', res.data.openid)
            }
          })
        }
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  //获取用户的位置信息
  getUserLocation() {
    wx.getLocation({
      //成功授权
      success: (res) => {
        const latitude = res.latitude;
        const longitude = res.longitude;
        // 使用腾讯地图接口将位置坐标转出成名称（为什么弹框出出现两次？）
        qqmapsdk.reverseGeocoder({
          location: {   //文档说location默认为当前位置可以省略，但是还是要手动加上，否则弹框会出现两次，手机端则出现问题
            latitude,
            longitude
          },
          success: (res) => {
            const cityFullname = res.result.address_component.city;
            const cityInfo = {
              latitude,
              longitude,
              cityName: cityFullname.substring(0, cityFullname.length - 1),
              status: 1
            }
            this.globalData.userLocation = { ...cityInfo }   //浅拷贝对象
            this.globalData.selectCity = { ...cityInfo } //浅拷贝对象
            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回，所以此处加入 callback 以防止这种情况
            if (this.userLocationReadyCallback) {
              this.userLocationReadyCallback()
            }
          }
        })
      },
      fail: () => {
        this.globalData.userLocation = { status: 0 }
        //防止当弹框出现后，用户长时间不选择，
        if (this.userLocationReadyCallback) {
          this.userLocationReadyCallback()
        }
      }
    })
  },
  globalData: {
    userLocation: null, //用户的位置信息
    selectCity: null //用户切换的城市
  }
})