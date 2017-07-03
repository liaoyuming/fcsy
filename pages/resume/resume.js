// resume.js
var util = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: "",
    captchaBtnText: "发送验证码",
    username: "",
    mobile: "",
    captchaBtnDisabled: false,
    resume: "",
    educationEdit: false,
    educationNum: 1,
    education: {
      bachelor: "",
      master: "",
      doctor: "",
    },
    workEdit: false,
    work: [""],
    specialityEdit: false,
    speciality: [""],
    practice: [],
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userInfo: wx.getStorageSync('userInfo')
    });
    this.getResumeInfo();

  },

  getResumeInfo: function() {
    var app = getApp();    
    var that = this;
    var open_id = wx.getStorageSync('open_id');
    
    wx.request({
      url: app.globalData.config.resumeInfoUrl + '/' + open_id,
      method: 'post',
      success: function (res) {
        that.updateEducationData(res.data.education);
        var resume = res.data;
        that.setData({
          resume: resume,
        });
        if (resume.work) {
          that.setData({
            work: resume.work,
          });
        }
      }
    });
  },


  updateEducationData: function (resumeEducation) {
    if (!resumeEducation) {
      return;
    }
    var educationNum = this.data.educationNum;
    var education = this.data.education;
    for (var i in resumeEducation) {
      if (resumeEducation[i]) {
        educationNum++;
        education[i] = resumeEducation[i];
        console.log(education, i);
      }
    }
    this.setData({
      educationNum: educationNum == 0 ? 1 : educationNum,
      education: education,
      educationEdit: false,
    });
  },

  /**
   * switch开关监听
   */
  listenerSwitch: function (e) {

    wx.request({
      url: getApp().globalData.config.changeResumeStatus,
      method: 'POST',
      data: {
        open_id: wx.getStorageSync('open_id'),
        status: e.detail.value,
      },
      success: function (res) {
        console.log(res.data)
      }
    })
    console.log('switch类型开关当前状态-----', e.detail.value);
  },

  educationEditEvent: function (e) {
    this.setData({
      educationEdit: !this.data.educationEdit,
    });
  },
  workEditEvent: function (e) {
    this.setData({
      workEdit: !this.data.workEdit,
    });
  },
  specialityEditEvent: function (e) {
    this.setData({
      specialityEdit: !this.data.specialityEdit,
    });
  },
  educationAddEvent: function (e) {
    var educationNum = this.data.educationNum;
    educationNum = educationNum >= 3 ? 3 : educationNum + 1;
    console.log(educationNum);
    this.setData({
      educationNum: educationNum,
    });
  },

  workAddEvent: function (e) {
    var work = this.data.work;
    work.push("");
    this.setData({
      work: work,
    });
  },

  specialityAddEvent: function (e) {
    var speciality = this.data.speciality;
    speciality.push("");
    this.setData({
      speciality: speciality,
    });
  },

  educationFormSubmit: function (e) {
    var that = this;
    this.resumeItemUpdate('education', e.detail.value, function (data) {
      that.updateEducationData(e.detail.value);  
    });
  },

  workFormSubmit: function (e) {
    var that = this;
    var work = this.trimData(this.data.work);

    this.resumeItemUpdate('work', work, function(data) {
      that.setData({
        work: work.length < 1 ? [""] : work,        
        workEdit: false,
      });
    });
  },

  specialityFormSubmit: function (e) {
    var that = this;
    var speciality = this.trimData(this.data.speciality);

    this.resumeItemUpdate('speciality', speciality, function (data) {
      
      that.setData({
        speciality: speciality.length < 1 ? [""] : speciality,        
        specialityEdit: false,
      });
    });
  },

  trimData: function (data) {
    var res = [];
    var k = 0;
    for (var i in data) {
      if (!!data[i]) {
        res[k++] = data[i];
      }
    }
    return res;
  },

  resumeItemUpdate: function (key, data, callback) {
    wx.request({
      url: getApp().globalData.config.resumeUpdateUrl,
      data: {
        open_id: wx.getStorageSync('open_id'),
        key: key,
        data: data,
      },
      method: 'post',
      success: function (res) {
        callback(res.data);
      }
    });
  },

  workInputChange: function (e) {
    var index = e.target.dataset.index;
    var value = e.detail.value;
    this.data.work[index] = value;
    this.setData({ 
      work: this.data.work 
    });
  },

  specialityInputChange: function (e) {
    var index = e.target.dataset.index;
    var value = e.detail.value;
    this.data.speciality[index] = value;
    this.setData({
      speciality: this.data.speciality
    });
  },

  mobileInputEvent: function (e) {
    var reg = /^1[3|4|5|7|8][0-9]{9}$/;

    this.setData({
      captchaBtnDisabled: !reg.test(e.detail.value),
      mobile: e.detail.value,
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

  sendCaptcha: function (e) {
    var app = getApp();
    var that = this;

    wx.request({
      url: app.globalData.config.sendCaptchaUrl,
      data: {
        mobile: this.data.mobile,
      },
      method: 'POST',
      success: function (res) {
        that.disableCaptchaBtn();

        if (res.statusCode === 500) {
          wx.showToast({
            title: '发送短信失败，该号码已超过日发送次数',
            icon: 'error',
            duration: 3000
          })
        } else {
          that.disableCaptchaBtn();
        }
      }
    })
  },

  disableCaptchaBtn: function () {
    var that = this;
    var second = 60;

    this.setData({
      captchaBtnText: second + '秒后重发',
      captchaBtnDisabled: true,
    });

    var i = setInterval(function () {
      second--;
      that.setData({
        captchaBtnText: second + '秒后重发',
      });
      if (second == 0) {
        clearInterval(i);
        that.setData({
          captchaBtnText: '发送验证码',
          captchaBtnDisabled: false,
        });
      }
    }, 1000);
  },


  registerEvent: function (e) {
    var app = getApp();
    var postData = this.data.userInfo;
    postData['mobile'] = this.data.mobile;
    postData['password'] = this.data.password;
    postData['openId'] = wx.getStorageSync('open_id')
    postData['code'] = this.data.code;

    util.register(postData);
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