/**
 * 小程序配置文件
 */

var host = "liaoyuming.cn"

var config = {

  // 下面的地址配合云端 Server 工作
  host,

  // 登录地址，用于建立会话
  loginUrl: `https://${host}/login`,

  secretaryUrl: `https://${host}/secretary`,
};

module.exports = config
