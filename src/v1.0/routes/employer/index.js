const router = require("express").Router();
const productManagement = require("./jobs");
const user = require("./user");


router.use("/job", productManagement);
router.use("/user", user);

module.exports = router;