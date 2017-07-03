function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function register(postData) {
  var app = getApp();
  if (!wx.getStorageSync('user_id')) {
    wx.request({
      url: app.globalData.config.registerUrl,
      method: 'post',
      data: postData,
      success: function (res) {
        if (res.data.status_code == 200) {
          //注册成功
          wx.showToast({
            title: '注册成功',
            icon: 'success',
            duration: 3000
          })

          wx.setStorage({
            key: 'userInfo',
            data: res.data.result
          })

          wx.switchTab({
            url: '/pages/member/member',
          })

        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'error',
            duration: 3000
          })
        }
      }
    })
  } else {
    wx.showToast({
      title: '用户已注册啊',
      icon: 'error',
      duration: 3000
    })
  }
}

module.exports = {
  formatTime: formatTime,
  register: register,
}
