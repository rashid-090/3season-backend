const router = require("express").Router();
const profile = require("./profile");
const password = require("./password");

// routes
// router.use("/change-password", password);
router.use("/profile", profile);

module.exports = router;
