// register.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    captchaBtnDisabled: true,
    userInfo: '',
    mobile: '',
    password: '',
    code: '',
    captchaBtnText: '发送验证码'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userInfo: wx.getStorageSync('userInfo')
    });
  },

  mobileInputEvent: function (e) {
    var reg = /^1[3|4|5|7|8][0-9]{9}$/;

    this.setData({
      captchaBtnDisabled: !reg.test(e.detail.value),
      mobile: e.detail.value,
    })
  },

  sendCaptcha: function (e) {
    var app = getApp();
    var that = this;
    that.setData({
      captchaBtnDisabled: true,
    });
    that.setData({
      captchaBtnText: '60秒后重发',
    })
    wx.request({
      url: app.globalData.config.sendCaptchaUrl,
      data: {
        mobile: this.data.mobile,
      },
      method: 'POST',
      success: function(res) {
        if (res.statusCode === 500) {
          wx.showToast({
            title: '发送短信失败，该号码已超过日发送次数',
            icon: 'error',
            duration: 3000
          })
          // Todo 代码可以优化 
          // 重置按钮状态
          that.setData({
            captchaBtnText: '发送验证码',
          })
          that.setData({
            captchaBtnDisabled: false,
          })
        }

        setTimeout(function () {
          that.setData({
            captchaBtnText: '发送验证码',
          })
          that.setData({
            captchaBtnDisabled: false,
          })
        }, 1000*60);
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
    postData['mobile'] = this.data.mobile;
    postData['password'] = this.data.password;
    postData['openId']  = wx.getStorageSync('open_id') 
    postData['code'] = this.data.code;
   // 检测用户是否注册过 

    wx.request({
      url: app.globalData.config.checkRegisterUrl,
      method: 'post',
      data: {open_id: postData['openId']},
      success: function (res) {
        // 如果用户未注册
        if (!res.data.result) {
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
    })
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