const { getUserById } = require("../services/internal/user");

const viewAccount = async (req) => {
  const profile = await getUserById(
    req?.user?._id,
    "email companyName webUrl workExperince fullName dob designation phoneNumber country city experience educations skills category Csalary description Esalary language address role image"
  );
  return {
    data: profile,
  };
};
module.exports = {
  viewAccount,
};
