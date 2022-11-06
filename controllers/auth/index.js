const signup = require("../auth/signup");
const verify = require("../auth/verify");
const resendVerifyEmail = require("../auth/resendVerifyEmail");
const login = require("../auth/login");
const logout = require("../auth/logout");
const getCurrent = require("../auth/getCurrent");

module.exports = {
  signup,
  verify,
  resendVerifyEmail,
  login,
  logout,
  getCurrent,
};
