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
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var app = getApp();
    var open_id = wx.getStorageSync('open_id');
    var that = this;
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
    })

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

  educationFormSubmit: function (e) {
    var that = this;
    this.resumeItemUpdate('education', e.detail.value, function (data) {
      that.updateEducationData(e.detail.value);  
    });
  },

  workFormSubmit: function (e) {
    var that = this;
    var work = [];
    var k = 0;
    for (var i in this.data.work) {
      if (!!this.data.work[i]) {
        console.log(this.data.work[i], !!this.data.work[i])
        work[k++] = this.data.work[i];
      }
    }
    that.setData({
      work: work,
    });
    this.resumeItemUpdate('work', work, function(data) {
      that.setData({
        workEdit: false,
      });
    });
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

  inputChange: function (e) {
    console.log(e.target.dataset.index,e.detail.value);
    var index = e.target.dataset.index;
    var value = e.detail.value;
    this.data.work[index] = value;
    this.setData({ 
      work: this.data.work 
    });
    console.log(this.data.work)
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