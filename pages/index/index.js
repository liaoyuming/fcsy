//index.js
Page({
  data: {
    motto: 'Hello World',
    startBtn: {
      text: '开始',
      url: 'pages/secretary/secretary'
    }
  },
  //事件处理函数
  bindStart: function() {
    wx.navigateTo({
      url: '/pages/secretary/secretary',
  });
  },
  onLoad: function () {

  }
})
