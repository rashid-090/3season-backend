const router = require("express").Router();
const makeCallback = require("../../utils/callback");
const authController = require("../controllers/auth");
const { isValidResetPasswordToken, isValidRefreshToken, isUserAuthenticated } = require("../middlewares/authorizer");
const {
    auth: { loginValidator, forgotPasswordValidator, resetPasswordValidator },
} = require("../validators");

const {
    user: { signUpValidator },
} = require("../validators");

// POST : signup
router.post("/signup", signUpValidator, makeCallback(authController.signUp));

// POST : login
router.post("/login", loginValidator, makeCallback(authController.login));


// POST : forgot password
router.post("/forgot-password", forgotPasswordValidator, makeCallback(authController.forgotPassword));

// POST : validate reset password request
router.post(
    "/reset-password/validate",
    isValidResetPasswordToken,
    makeCallback(async () => ({}))
);

// POST : reset password
router.post(
    "/reset-password",
    isValidResetPasswordToken,
    resetPasswordValidator,
    makeCallback(authController.resetPassword)
);

// POST : refresh token
router.post("/token", isValidRefreshToken, makeCallback(authController.refreshToken));

// POST : logout
router.post("/logout", isUserAuthenticated, makeCallback(authController.logout));

module.exports = router;
