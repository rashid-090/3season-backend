const { ROLE_SUPERADMIN, ROLE_ADMIN,  ROLE_USER ,ROLE_EMPLOYEE,ROLE_EMPLOYER} = require("../../config/constants");

module.exports = [
    {
        name: ROLE_SUPERADMIN,
        label: "Super Administrator",
        description: "Super Administrator role",
    },
    {
        name: ROLE_ADMIN,
        label: "Administrator",
        description: "Administrator role",
    },
    {
        name: ROLE_USER,
        label: "User",
        description: "User role",
        allowSignup: true,
    },
    {
        name: ROLE_EMPLOYER,
        label: "Employer",
        description: "Employer role",
        allowSignup: true,
    },
    {
        name: ROLE_EMPLOYEE,
        label: "Employee",
        description: "Employee role",
        allowSignup: true,
    },
];
