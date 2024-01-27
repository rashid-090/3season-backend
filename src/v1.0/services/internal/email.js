const { EMAIL_SIGNUP_COMPLETED, EMAIL_PASSWORD_CHANGED, EMAIL_RESET_PASSWORD } = require("../../../config/constants");
const { sendEmail } = require("../external/mail");

const sendSignUpCompletedEmail = async (email, { user }) => {
    sendEmail(email, EMAIL_SIGNUP_COMPLETED, { name: user?.firstName });
};

const sendResetPasswordLinkEmail = async (email, { user, resetPasswordLink }) => {
    sendEmail(email, EMAIL_RESET_PASSWORD, { name: user?.firstName, resetPasswordLink });
};

const sendResetPasswordSuccessEmail = async (email, { user }) => {
    sendEmail(email, EMAIL_PASSWORD_CHANGED, { name: user?.firstName });
};

module.exports = {
    sendSignUpCompletedEmail,
    sendResetPasswordLinkEmail,
    sendResetPasswordSuccessEmail,
};
