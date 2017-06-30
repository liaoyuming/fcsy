// login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:[],
    telphone: '',
    password: ''
  },

  /**
   * 监听手机号输入
   */
  listenerPhoneInput: function (e) {
    this.data.telphone = e.detail.value;
  },

  /**
   * 监听密码输入
   */
  listenerPasswordInput: function (e) {
    this.data.password = e.detail.value;
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var app = getApp();
    var that = this;
    app.getUserInfo(function (userInfo) {
      wx.setStorage({
        key: 'wechatUserInfo',
        data: userInfo
      })
    });
  },

  onSubmit: function () {
    try {
      var wechatUserInfo = wx.getStorageSync('wechatUserInfo')
      var currentUserData = {
        telphone: this.data.telphone,
        password: this.data.password
      }

      console.log(currentUserData)
    } catch (e) {
      console.log(e)
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