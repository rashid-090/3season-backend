const {
    STATUS_ACTIVE,
    STATUS_INACTIVE,
    STATUS_SUSPENDED,
    NO,
    ROLE_SUPERADMIN,
    ROLE_ADMIN,
    ROLE_STAFF,
    ROLE_CLIENT,
} = require("../../config/constants");
const uniqueValidator = require("mongoose-unique-validator");
const messages = require("../../config/messages");

module.exports = (mongoose, collectionName) => {
    const schema = mongoose.Schema(
        {
            name: {
                type: String,
                // required: true,
                // unique: true,
                sparse: true,
                uniqueCaseInsensitive: true,
            },
            email: {
                type: String,
                required: true,
                unique: true,
                sparse: true,
                uniqueCaseInsensitive: true,
            },
            password: {
                type: String,
                default: "",
            },
            resetPasswordToken: {
                type: String,
                default: "",
            },
            status: {
                type: String,
                required: true,
                enum: [STATUS_ACTIVE, STATUS_INACTIVE, STATUS_SUSPENDED],
                default: STATUS_ACTIVE,
            },
            role:{
                type: String,
                default: "",
            },
            fullName:{
                type: String,
                default: "",
            },
            dob:{
                type: String,
                default: "",
            },
            designation:{
                type: String,
                default: "",
            },
            phoneNumber:{
                type: String,
                default: "",
            },
            country:{
                type: String,
                default: "",
            },
            city:{
                type: String,
                default: "",
            },
            experience:{
                type: Array,
                default: [],
            },
            educations:{
                type: Array,
                default: [],
            },
            skills:{
                type: Array,
                default: [],
            },
            category:{
                type: Array,
                default: [],
            },
            Csalary:{
                type: String,
                default: "",
            },
            description:{
                type: String,
                default: "",
            },
            Esalary:{
                type: String,
                default: "",
            },
            language:{
                type: String,
                default: "",
            },
            address:{
                type: String,
                default: "",
            },
            companyName:{
                type: String,
                default: "",
            },
            webUrl:{
                type: String,
                default: "",
            },
            workExperince:{
                type: String,
                default: "",
            },
            isArchived: {
                type: Boolean,
                default: NO,
            },
            image:{
                type: String,
                default: "",
            }
        },
        {
            timestamps: true,
        }
    );

    schema.plugin(uniqueValidator, { message: messages?.fieldIsUnique });

    return mongoose.model("User", schema, collectionName);
};
