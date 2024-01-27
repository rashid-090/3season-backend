const router = require("express").Router();
const userManagement = require("./user");

router.use("/user", userManagement);
router.use("/jobs", userManagement);

module.exports = router;