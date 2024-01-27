const { validationResult } = require("express-validator");
const { FormValidatorException } = require("../../utils/customExceptions");

const errorFormatter = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new FormValidatorException(
            errors.array().reduce((acc, curr) => ((acc[curr?.param] = curr?.msg), acc), {})
        );
    }
    next();
};

module.exports = {
    auth: require("./auth")(errorFormatter),
    user: require("./user")(errorFormatter),
};
