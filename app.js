//app.js
App({
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
            success: function (res) { 
              
              wx.setStorageSync('openid', res.data.data.openid);
            },
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
  globalData:{
    config:  require('config'),
  }
})
