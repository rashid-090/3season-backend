const router = require("express").Router();
const productManagement = require("./jobs");
const resumeManage = require("./resume");


router.use("/job", productManagement);
router.use("/resume", resumeManage);

module.exports = router;