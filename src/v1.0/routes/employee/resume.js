const router = require("express").Router();
const makeCallback = require("../../../utils/callback");
const userController = require("../../controllers/user");

router.put("/", makeCallback(userController.updateUser));

module.exports = router;
