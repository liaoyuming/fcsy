//app.js
App({
  data: {
    open_id:''
  },
  globalData: {
    config: require('config'),
  },

  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs);

    this.init();
  },

  init: function() {
    var that = this;

    wx.login({
      success: function (res) {
        if (res.code) {
          that.ininWxUserInfo();
          that.initLoginInfo(res.code);
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    });
  },

  ininWxUserInfo: function () {
    wx.getUserInfo({
      success: function (res) {
        console.log(res.userInfo);
        wx.setStorageSync('userInfo', res.userInfo);
      }
    });
  },

  initLoginInfo: function (code) {
    var that = this;

    wx.request({
      url: this.globalData.config.wechatLoginInfoUrl,
      method: 'post',
      data: {
        code: code
      },
      success: function (response) {
        console.log(response.data);
        var open_id = response.data.data.openid
        wx.setStorageSync('open_id', open_id)
        that.checkRegister(open_id);
      }
    })
  },

  checkRegister: function (open_id) {
    var that = this;
    wx.request({
      url: this.globalData.config.checkRegisterUrl,
      method: 'POST',
      data: {
        open_id: open_id,
      },
      success: function (res) {
        console.log(res.data);
        if (!res.data.result && res.data.status_code == 20001) {
          that.createWxUser();
        } else {
          wx.setStorageSync('user_id', user_id); 
        }
      }
    });
  },

  createWxUser: function () {
    var postData = wx.getStorageSync('userInfo');
    postData['open_id'] = wx.getStorageSync('open_id');
    wx.request({
      url: this.globalData.config.wxUserCreateUrl,
      method: 'post',
      data: postData,
      success: function (res) {
        console.log(res.data);
     }
    });
  }

})
