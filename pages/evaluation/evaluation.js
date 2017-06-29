// evaluation.js
const questionnaireShowUrl = require('../../config').questionnaireShowUrl;

Page({

  /**
   * 页面的初始数据
   */
  data: {
      questionnaire: {},
      user_questions: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
      var $this = this;
      wx.request({
          url: questionnaireShowUrl,
          data: {
            id: options.questionnaire,
          },
          header: {
              'content-type': 'application/json'
          },
          success: function(res) {
            var questionnaire = res.data.data[0];
            for (var i = 0, len = questionnaire.questions.length; i < len; ++i) {
                questionnaire.questions[i].current = i == 0 ? 1 : 0;
                questionnaire.questions[i].selectedOptionId = 0;
            }
console.log(questionnaire);
            $this.setData({
              questionnaire: questionnaire
            });
          }
      });
  },

  radioChange: function(e) {
    var questionnaire = this.data.questionnaire;
    var questions = questionnaire.questions;
    var radioValue = e.detail.value.split("-");
    var user_questions = this.data.user_questions;
    var questionLength = questions.length;
    var $this = this;

    for (var i = 0; i < questionLength; i++) {

        if (questions[i].id == radioValue[0] && i < questionLength - 1) {
            this.changeQuestion(questionnaire, i, i + 1);
        } else if (questions[i].id == radioValue[0] && i == questionLength - 1) {
            this.getSelectedOption();
        }
        questionnaire.questions[i].selectedOptionId = radioValue[1];
    }

    setTimeout(function() {
        $this.setData({
          questionnaire: questionnaire
        });
    }, 200);
  },

  getSelectedOption: function() {
      var questionnaire = this.data.questionnaire;
      var questions = questionnaire.questions;
      var questionLength = questions.length;
      var user_questions = [];

      for (var i = 0; i < questionLength; i++) {
          user_questions[i] = {
              question_id: questions[i].id,
              question_option_id: questions[i].selectedOptionId,
          };
      }
      console.log(user_questions);
  },

  changeQuestion: function(questionnaire, questionNum, nextNum) {

      questionnaire.questions[questionNum].current = 0;
      questionnaire.questions[nextNum].current = 1;
  },

  backQuestion: function() {


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
