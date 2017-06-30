/**
 * 小程序配置文件
 */

var apiBaseUrl = "https://fcsyapi.liaoyuming.cn/api/"

var config = {
  apiBaseUrl,
  loginUrl: apiBaseUrl + 'login',
  questionnaireShowUrl: apiBaseUrl + 'questionnaire/show',
  questionnaireIndexUrl: apiBaseUrl + 'questionnaire',
};

module.exports = config
