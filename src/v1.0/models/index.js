const mongoose = require("mongoose");
const collectionNames = require("../../config/collectionNames");

module.exports = {
    Migration: require("./migration")(mongoose, collectionNames?.MIGRATION),
    RoleMaster: require("./roleMaster")(mongoose, collectionNames?.ROLE_MASTER),
    User: require("./user")(mongoose, collectionNames?.USER),
    UserRole: require("./userRole")(mongoose, collectionNames?.USER_ROLE),
    UserDevice: require("./userDevice")(mongoose, collectionNames?.USER_DEVICE),
    
    Product: require("./jobs")(mongoose, collectionNames?.PRODUCT),
    JobApplicants: require("./jobApplicants")(mongoose, collectionNames?.JOB_APPLICANTS),
   
};
