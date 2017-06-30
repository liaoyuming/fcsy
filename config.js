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
  getOpenId: apiBaseUrl + 'wechat',
  loginUrl: apiBaseUrl + 'login',
  registerUrl: apiBaseUrl + 'register',
};

module.exports = config;
