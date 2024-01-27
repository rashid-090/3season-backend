const {
  ROLE_USER,
  ROLE_EMPLOYER,
  ROLE_EMPLOYEE,
} = require("../../config/constants");
const messages = require("../../config/messages");
const { makeQueryBuilder } = require("../services/internal/queryBuilder");
const {
  getUserById,
  getUsers,
  updateUserData,
  getAppliedJobs,
} = require("../services/internal/user");

const getUser = async (req) => {
  const user = await getUserById(req?.params.id);
  return {
    message: messages?.success,
    data: user,
  };
};
const getUsersList = async (req) => {
  const queryBuilder = makeQueryBuilder(req);
  if (req?.query?.role == "Employer") {
    const condition = { role: ROLE_EMPLOYER };
    const admins = await getUsers(queryBuilder, condition);
    return { message: messages?.success, data: admins };
  }
  if (req?.query?.role == "Employee") {
    const condition = { role: ROLE_EMPLOYEE };
    const admins = await getUsers(queryBuilder, condition);
    return { message: messages?.success, data: admins };
  }
  return { message: messages?.internalServerError };
};

const getAppliedList = async (req) => {
  const queryBuilder = makeQueryBuilder(req);
  // const condition ={role:ROLE_EMPLOYER}
  const admins = await getAppliedJobs(queryBuilder);
  return { message: messages?.success, data: admins };
};

const updateUser = async (req) => {
  const data = req?.body;
  await updateUserData(req?.user?._id, data);
  return {
    message: messages?.success,
  };
};

module.exports = {
  getUser,
  getUsersList,
  updateUser,
  getAppliedList,
};
