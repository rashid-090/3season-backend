const messages = require("../../config/messages");
const { ROLE_USER,ROLE_ADMIN,ROLE_EMPLOYEE,ROLE_EMPLOYER } = require("../../config/constants");

const {
  handleAuthenticate,
  handleForgotPassword,
  handleResetPassword,
  handleRefreshToken,
  handleLogout,
} = require("../services/internal/auth");
const { createUser } = require("../services/internal/user");

const login = async (req) => {
  // console.log(req.body);
  const { headers, data } = await handleAuthenticate(req?.body, req?.headers);
  return { message: messages?.loggedIn, headers, data };
};

const forgotPassword = async (req) => {
  await handleForgotPassword(req?.body);
  return { message: messages?.resetPasswordMailSent };
};

const resetPassword = async (req) => {
  await handleResetPassword(req?.body);
  return { message: messages?.passwordResetSuccess };
};

const refreshToken = async (req) => {
  const { headers, data } = await handleRefreshToken(req?.body, req?.headers);
  return { headers, data };
};

const logout = async (req) => {
  await handleLogout(req?.user, req?.headers);
  return { message: messages?.logoutSuccess };
};

const signUp = async (req) => {
  const data = req?.body;
  req?.body?.role == ROLE_EMPLOYEE
    ? (data.role = ROLE_EMPLOYEE)
    : (data.role = ROLE_EMPLOYER);
  await createUser(data);
  return {
    message: messages?.signUpSuccess,
  };
};

module.exports = {
  login,
  forgotPassword,
  resetPassword,
  refreshToken,
  logout,
  signUp,
};
