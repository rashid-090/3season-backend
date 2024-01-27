const { ROLE_SUPERADMIN } = require("../../config/constants");

module.exports = {
    name: "Super Admin",
    email: process?.env?.SUPERADMIN_EMAIL,
    username: process?.env?.SUPERADMIN_USERNAME,
    password: process?.env?.SUPERADMIN_PASSWORD,
    role: ROLE_SUPERADMIN,
};
