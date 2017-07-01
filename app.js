//app.js
App({
  data: {
    open_id:''
  },
  globalData: {
    config: require('config'),
  },

  onLaunch: function () {
    var app = getApp();
    var that = this;
    wx.login({
      success: function (res) {
        if (res.code) {
          wx.request({
            url: that.globalData.config.getOpenIdUrl,
            method: 'post',
            data: {
              code: res.code
            },
            success: function (response) {
              console.log(response.data);
              var open_id = response.data.data.openid
              wx.setStorageSync('open_id',open_id)
              wx.request({
                url: getApp().globalData.config.checkRegisterUrl,
                method: 'POST',
                data: {
                  open_id: open_id,
                },
                success: function (res) {
                  console.log(res.data);
                  wx.setStorage({
                    key: 'wechat_user_info',
                    data: res.data.wechat_user_info
                  });
                }
              });
            }
          })
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    });
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs);

    this.getUserInfo(function(userInfo) {
      wx.setStorageSync('userInfo', userInfo);
    });
    
  },
  getUserInfo:function(callback){
    var that = this
    if(this.globalData.userInfo){
      typeof callback == "function" && callback(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function (res) {
            console.log(res);
          wx.getUserInfo({
            success: function (res) {
              typeof callback == "function" && callback(res.userInfo)
            }
          })
        }
      })
    }
  },
  login: function() {

  },

  onLoad: function (options) {
    var app = getApp();
    var openid = wx.getStorageSync('openid');

  }
})
