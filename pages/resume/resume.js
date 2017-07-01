// resume.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    captchaBtnText: "发送验证码",
    username: "",
    mobile: "",
    captchaBtnDisabled: false,
    switchStatus: false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var wechat_user_info = wx.getStorageSync('wechat_user_info')
    if (!wechat_user_info || wechat_user_info.id <= 0) {
      wx.redirectTo({
        url: '/pages/register/register',
      })
    }

    // todo 没有简历 的时候该跳转到哪个页面
    if (wechat_user_info.has_one_resume){
      this.data.switchStatus = wechat_user_info.has_one_resume.is_open 
    }

  },

  /**
   * switch开关监听
   */
  listenerSwitch: function (e) {
    var wechat_user_info = wx.getStorageSync('wechat_user_info')
    wx.request({
      url: getApp().globalData.config.changeResumeStatus,
      method: 'POST',
      data: {
        id: wechat_user_info.user_id,
        status: this.data.switchStatus,
      },
      success: function (res) {
        console.log(res.data)
      }
    })
    console.log('switch类型开关当前状态-----', e.detail.value);
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