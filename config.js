/**
 * 小程序配置文件
 */

var apiBaseUrl = "https://fcsyapi.liaoyuming.cn/api/"

var config = {
  apiBaseUrl,
  loginUrl: apiBaseUrl + 'login',
  questionnaireShowUrl: apiBaseUrl + 'questionnaire/show',
  questionnaireIndexUrl: apiBaseUrl + 'questionnaire',
  sendCaptchaUrl: apiBaseUrl +  'getSmsCode',
  wechatLoginInfoUrl: apiBaseUrl + 'wechat/login_info',
  loginUrl: apiBaseUrl + 'login',
  registerUrl: apiBaseUrl + 'register',
  checkRegisterUrl: apiBaseUrl + 'register/check',
  userAnswerUrl: apiBaseUrl + 'wxuser/answer',
  changeResumeStatus: apiBaseUrl + 'changeResumeStatus',
  wxUserCreateUrl: apiBaseUrl + 'wxuser/create',
  resumeInfoUrl: apiBaseUrl + 'wxuser/information',
  resumeUpdateUrl: apiBaseUrl + 'wxuser/update',
};

module.exports = config;
