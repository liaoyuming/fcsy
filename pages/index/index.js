const secretaryUrl = require('../../config').secretaryUrl

//index.js
//获取应用实例
var app = getApp()

Page({
  data: {
    motto: 'Hello World',
    startBtn: {
      text: '开始',
      url: 'pages/secretary/secretary'
    }
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '/pages/secretary/secretary',
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
          userInfo:userInfo
      })
    })
  }
})
