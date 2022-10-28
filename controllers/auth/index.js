const signup = require("../auth/signup");
const login = require("../auth/login");
const logout = require("../auth/logout");
const getCurrent = require("../auth/getCurrent");

module.exports = {
  signup,
  login,
  logout,
  getCurrent,
};
