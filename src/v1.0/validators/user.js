const { checkSchema } = require("express-validator");
const messages = require("../../config/messages");
const { getUserByEmail } = require("../services/internal/user");

const signUpValidator = async (req, res, next) => {
    const emailExist = await getUserByEmail(req?.body?.email);
    await checkSchema({
        name: { notEmpty: { errorMessage: messages?.usernameIsRequired } },
        password: { notEmpty: { errorMessage: messages?.passwordIsRequired } },
        confirmPassword: {
            notEmpty: { errorMessage: messages?.confirmPasswordIsRequired },
            custom: {
                options: () => {
                    return req?.body?.password !== req?.body.confirmPassword ? false : true;
                },
                errorMessage: messages?.passwordNotMatching,
            },
        },
        email: {
            notEmpty: { errorMessage: messages?.emailIsRequired, bail: true },
            isEmail: { errorMessage: messages?.emailIsInvalid, bail: true },
            custom: {
                options: () => {
                    return emailExist ? false : true;
                },
                errorMessage: messages?.emailIsUnique,
            },
        },
    }).run(req);
    next();
};

const jobValidator = async (req, res, next) => {
    await checkSchema({
        location: {
            notEmpty: { errorMessage: messages?.locationIsRequired, bail: true },
            matches: {
                options: [/^([^,]+),([^,]+),([^,]+),([^,]+)$/],
                errorMessage: messages?.locationIsInvalid,
            },
            custom: {
                options: (value) => {
                    // Split the location string into its parts
                    const parts = value.split(',');
                    // Check if all parts are present (Country, State, District, JobLocation)
                    if (parts.length === 4) {
                        // Implement additional validation if necessary, for example:
                        // - Check if the country, state, or district exist in your database or an external API
                        // - Ensure that jobLocation meets certain criteria
                        return true; // Return true if validation passes
                    }
                    return false; // Return false if validation fails
                },
                errorMessage: messages?.locationIsInvalid,
            },
        },
    }).run(req);
    next();
};

module.exports = (errorFormatter) => ({
    signUpValidator: [signUpValidator, errorFormatter],
    jobValidator: [jobValidator, errorFormatter],
});
