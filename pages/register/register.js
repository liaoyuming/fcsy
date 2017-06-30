// register.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    captchaBtnDisabled: true,
    userInfo: '',
    telphone: '',
    password: '',
    code: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userInfo: wx.getStorageSync('userInfo')
    });
    
    console.log(this.data.userInfo);

  },

  mobileInputEvent: function (e) {
    var reg = /^1[3|4|5|7|8][0-9]{9}$/;

    this.setData({
      captchaBtnDisabled: !reg.test(e.detail.value),
      telphone: e.detail.value,
    })
  },

  sendCaptcha: function (e) {
    var app = getApp();
    var that = this;
    wx.request({
      url: app.globalData.config.sendCaptchaUrl,
      data: {
        telphone: this.data.telphone,
      },
      method: 'POST',
      success: function(res) {
        console.log(res.data);
        that.setData({
          captchaBtnDisabled: true,
        });

      }
    })
  },

  passwordInputEvent: function (e) {
    this.setData({
      password: e.detail.value,
    });
  },

  captchaInputEvent: function (e) {
    this.setData({
      code: e.detail.value,
    });
  },

  register: function (e) {
    var app = getApp();
    var postData = this.data.userInfo;
    postData['telphone'] = this.data.telphone;
    postData['password'] = this.data.password;
    postData['code'] = this.data.code;
console.log(postData);
    wx.request({
      url: app.globalData.config.registerUrl,
      method: 'post',
      data: postData,
      success: function (res) {
        console.log(res);
      },
    });
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