const  mongoose  = require("mongoose");
const { generatePasswordHash, generateRandomPassword } = require("../../helpers/string");
const { User, UserRole, UserDevice,JobApplicants } = require("../../models");
const { sendSignUpCompletedEmail } = require("./email");
const { getRoleByName } = require("./role");

const createUser = async (data) => {
    data.password = await generatePasswordHash(data?.password);
    const user = await new User(data).save();
    const role = await getRoleByName(data?.role);
    await createUserRole({ userId: user?.id, roleId: role?.id });

    return user;
};

const getUserById = async (id, select = null) => {
    return await User.findById(id).select(select);
};
const getUsers = async (queryBuilder, condition) => {
    const [users, total] = await Promise.all([
        User.find(queryBuilder.getFindQuery(condition))
            .sort(queryBuilder.getSortQuery())
            .limit(queryBuilder.getPagination()?.limit)
            .skip(queryBuilder.getPagination()?.skip),
        User.countDocuments(queryBuilder.getFindQuery(condition)),
    ]);
    return { users, total };
};

const getAppliedJobs = async (match, select = null) => {
    return await JobApplicants.find().select(select).populate('userId itemId');
};

const updateUserData = async (UserId, data) => {
    const id = mongoose.Types.ObjectId(UserId);
    return await User.updateOne({ _id: id }, { $set: data });
  };

const getUserByMatch = async (match, select = null) => {
    return await User.findOne(match).select(select);
};

const getUsersByMatch = async (match, select = null) => {
    return await User.find(match).select(select);
};

// const getUsersByMatch = async (matches, select = null) => {
//     return await User.find({ _id: { $in: matches } }).select(select);
// };

const getUserByEmail = async (email, select = null) => {
    return await getUserByMatch({ email }, select);
};

const getUserByPhoneNumber = async (phoneNumber, select = null) => {
    return await getUserByMatch({ phoneNumber }, select);
};

const getUserByUsername = async (username, select = null) => {
    return await getUserByMatch({ username }, select);
};

const createUserRole = async (data) => {
    return await new UserRole(data).save();
};

const getUserRoleByMatch = async (match) => {
    return await UserRole.findOne(match);
};

const createUserDevice = async (data) => {
    return await new UserDevice(data).save();
};

const updateUserDeviceByMatch = async (match, data) => {
    return await UserDevice.updateOne(match, { $set: data });
};

const createOrUpdateUserDevice = async (data) => {
    const { userId, deviceId, appType, ...rest } = data;
    const match = { userId, deviceId, appType };
    const device = await getUserDeviceByMatch(match);
    return !device ? await createUserDevice(data) : await updateUserDeviceByMatch(match, rest);
};

const getUserDeviceByMatch = async (match) => {
    return await UserDevice.findOne(match);
};

module.exports = {
    createUser,
    getUserById,
    getUserByEmail,
    getUserByPhoneNumber,
    getUserByUsername,
    getUserByMatch,
    createUserRole,
    getUserRoleByMatch,
    createOrUpdateUserDevice,
    getUserDeviceByMatch,
    updateUserDeviceByMatch,
    getUsers,
    updateUserData,
    getAppliedJobs,
    getUsersByMatch
};
