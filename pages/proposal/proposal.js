// proposal.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    character: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCharacter();
  },

  getCharacter: function () {
    var that = this;
    wx.request({
      url: getApp().globalData.config.characterShowUrl,
      data: {
        id: wx.getStorageSync('max_character_type_id'),
      },
      success: function (res) {
        that.setData({
          character: res.data.data,
        });
      }
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
    if (!this.data.character) {
      this.getCharacter();
    }
    console.log(!this.data.character);
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