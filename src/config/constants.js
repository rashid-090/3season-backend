module.exports = {
    YES: true, // boolean true
    NO: false, // boolean false
    SALT_ROUNDS: 10, // password salt rounds
    DATE_SAVING_FORMAT: "YYYY-MM-DD", // date is saving in this format
    ITEMS_PER_PAGE: 50, // number of items per page
    STATUS_ACTIVE: "active", // active
    STATUS_INACTIVE: "inactive", // in-active
    STATUS_SUSPENDED: "suspended", // suspended
    ROUTE_RESET_PASSWORD: "/auth/reset-password?token={token}",

    // email template keys
    EMAIL_SIGNUP_COMPLETED: "signUpCompleted", // signup completed
    EMAIL_RESET_PASSWORD: "resetPassword", // reset password link mail
    EMAIL_PASSWORD_CHANGED: "passwordChanged", // password changed mail

    // roles
    ROLE_SUPERADMIN: "superAdmin",
    ROLE_ADMIN: "admin",
    ROLE_USER: "User",
    ROLE_EMPLOYEE: "Employee",
    ROLE_EMPLOYER: "Employer",
};
