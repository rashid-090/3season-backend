const router = require("express").Router();
const makeCallback = require("../../../utils/callback");
const accountController = require("../../controllers/account");

//GET : view profile
router.get("/", makeCallback(accountController.viewAccount));

module.exports = router;
