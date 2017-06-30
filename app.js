//app.js
App({
  onLaunch: function () {
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
