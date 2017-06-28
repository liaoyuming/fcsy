// secretary.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [{
      /**
       * 费才博士 144 题
       */
      id: 'feicai',
      name: '费才博士 144 题',
      isAvailable: true,
      img: '../../images/secretary_feicai.png',
    }, {
      /**
       * 雅雅秘书 36 题
       */
      id: 'yaya',
      name: '雅雅秘书 36 题',
      isAvailable: true,
      img: '../../images/secretary_yaya.png',
    },{
      /**
       * 杰森
       */
      id: 'jiesen',
      name: '杰森',
      isAvailable: true,
      img: '../../images/secretary_jiesen.png',
    }],
  },

  bindStart: function() {
    wx.navigateTo({
      url: '/pages/secretary/secretary',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
