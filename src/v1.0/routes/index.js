const router = require("express").Router();
const { ensureRequestSanity } = require("../middlewares/request");
const health = require("./health");
const auth = require("./auth");
const {
    isUserAuthenticated,
    isSuperAdmin,
  } = require("../middlewares/authorizer");
const admin=require("./admin")
const employee=require("./employee")
const employer=require("./employer")
const public=require("./public")
const account=require("./account")

// middleware
router.use(ensureRequestSanity());

// routes
router.use("/health", health);
router.use("/auth", auth);
router.use("/admin", [isUserAuthenticated, isSuperAdmin], admin);
router.use("/employee", [isUserAuthenticated], employee);
router.use("/public", public);
router.use("/employer", [isUserAuthenticated], employer);
router.use("/account", isUserAuthenticated, account);



module.exports = router;
