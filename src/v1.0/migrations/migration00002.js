const { ROLE_SUPERADMIN } = require("../../config/constants");
const data = require("../seeds/seed00002");
const { createUser } = require("../services/internal/user");

// execution function
async function execute() {
    data.role=ROLE_SUPERADMIN
    await createUser(data);
}

module.exports = {
    execute,
};
