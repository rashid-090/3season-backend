const bcrypt = require("bcrypt");
const { NotFoundException, BadRequestException } = require("../../../utils/customExceptions");
const config = require("../../../config");
const { STATUS_SUSPENDED, ROUTE_RESET_PASSWORD, STATUS_ACTIVE, NO, YES } = require("../../../config/constants");
const messages = require("../../../config/messages");
const {
    getUserByEmail,
    getUserRoleByMatch,
    getUserById,
    getUserByMatch,
    createOrUpdateUserDevice,
    updateUserDeviceByMatch,
} = require("./user");
const { getRoleById } = require("./role");
const { generateJwtToken, generatePasswordHash, generateUUID } = require("../../helpers/string");
const { sendResetPasswordLinkEmail, sendResetPasswordSuccessEmail } = require("./email");

const authenticateUser = async (username) => {
    const user = await getUserByMatch({
        $or: [
            {
                email: username,
            },
            {
                phoneNumber: username,
            },
            {
                username: username,
            },
        ],
    });
    if (!user) throw new NotFoundException(messages?.invalidEmailPass);
    return user;
};

const validatePassword = async (inputPassword, encryptedPassword) => {
    const validPass = await bcrypt.compare(inputPassword, encryptedPassword || "");
    if (!validPass) throw new NotFoundException(messages?.invalidEmailPass);
    return true;
};

const checkUserStatus = async (user) => {
    const { status } = user;
    if (status === STATUS_ACTIVE) return true;
    if (status === STATUS_SUSPENDED) throw new NotFoundException(messages?.suspendedAccount);
    throw new NotFoundException(messages?.inactiveAccount);
};

const getActiveRole = async (user) => {
    const userRole = await getUserRoleByMatch({ userId: user._id, isActive: YES });
    if (!userRole) throw new NotFoundException(messages?.hasNoRole);
    const role = await getRoleById(userRole.roleId);
    if (!role) throw new NotFoundException(messages?.hasNoRole);
    return role;
};

const generatePayload = async (user, role) => {
    return {
        userId: user?.id,
        role: role?.name,
        mobileNumber: user?.mobileNumber,
        email: user?.email,
        sessionId: await generateUUID(),
    };
};

const generateAccessToken = async (payload) => {
    return generateJwtToken(payload, config?.accessTokenSecret, {
        expiresIn: config?.jwtTokenExpiresIn,
    });
};

const generateRefreshToken = async (payload, headers) => {
    const { userId, sessionId } = payload;
    const { "device-id": deviceId = "", "app-type": appType = "" } = headers;
    const refreshToken = await generateJwtToken(payload, config?.refreshTokenSecret, {
        expiresIn: config?.jwtRefreshTokenExpiresIn,
    });
    const deviceData = {
        userId,
        deviceId,
        appType,
        sessionId,
        refreshToken,
        isActive: YES,
    };
    await createOrUpdateUserDevice(deviceData);
    return refreshToken;
};

const generateTokens = async (payload, headers) => {
    const [accessToken, refreshToken] = await Promise.all([
        generateAccessToken(payload),
        generateRefreshToken(payload, headers),
    ]);
    return { accessToken, refreshToken };
};

const getProfile = async (userId) => {
    return await getUserById(userId, "firstName lastName username email phoneNumber");
};

const generateResetPasswordToken = async (payload) => {
    return generateJwtToken(payload, config?.resetPasswordTokenSecret, {
        expiresIn: config?.jwtResetPasswordTokenExpiresIn,
    });
};

const generateResetPasswordLink = (resetPasswordJwtToken) => {
    let link = `${config?.app?.passwordRecoveryUrl}${ROUTE_RESET_PASSWORD}`;
    return link.replace("{token}", resetPasswordJwtToken);
};

const sendResetPasswordLink = async (user) => {
    const token = await generateUUID();
    const resetPasswordJwtToken = await generateResetPasswordToken({ email: user?.email, token });
    user.resetPasswordToken = token;
    await user.save();

    // send reset password link
    sendResetPasswordLinkEmail(user?.email, {
        user,
        resetPasswordLink: generateResetPasswordLink(resetPasswordJwtToken),
    });
};

const validateResetPassword = (data) => {
    if (data?.newPassword !== data?.confirmPassword) return false;
    return true;
};

const logoutFromUserDevice = async (user, headers) => {
    const { "device-id": deviceId = "", "app-type": appType = "" } = headers;
    await updateUserDeviceByMatch(
        {
            userId: user?._id,
            deviceId,
            appType,
        },
        { isActive: NO }
    );
    return true;
};

const generateTokenHeaders = ({ accessToken, refreshToken }) => {
    return { "Auth-Access-Token": accessToken, "Auth-Refresh-Token": refreshToken };
};

const handleAuthenticate = async (data, headers) => {
    const user = await authenticateUser(data?.email);
    await validatePassword(data?.password, user?.password);
    await checkUserStatus(user);
    const role = await getActiveRole(user);
    const payload = await generatePayload(user, role);
    const tokens = await generateTokens(payload, headers);
    const profile = await getProfile(payload?.userId);
    return {
        headers: generateTokenHeaders(tokens),
        data: { role: payload?.role, profile },
    };
};

const handleForgotPassword = async (data) => {
    const user = await getUserByEmail(data?.email);
    await checkUserStatus(user);
    await sendResetPasswordLink(user);
};

const handleResetPassword = async (data) => {
    const validated = validateResetPassword(data);
    if (!validated) throw new BadRequestException();
    const user = await getUserByEmail(data?.email);
    user.password = await generatePasswordHash(data?.newPassword);
    user.resetPasswordToken = "";
    await user.save();

    // send password changed mail
    sendResetPasswordSuccessEmail(user?.email, { user });
};

const handleRefreshToken = async (data, headers) => {
    const user = await getUserByEmail(data?.email);
    await checkUserStatus(user);
    const role = await getActiveRole(user);
    const payload = await generatePayload(user, role);
    const tokens = await generateTokens(payload, headers);
    return { headers: generateTokenHeaders(tokens) };
};

const handleLogout = async (user, headers) => {
    await logoutFromUserDevice(user, headers);
    return true;
};

module.exports = {
    handleAuthenticate,
    handleForgotPassword,
    handleResetPassword,
    handleRefreshToken,
    handleLogout,
};
