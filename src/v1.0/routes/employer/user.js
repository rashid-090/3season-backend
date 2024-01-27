const router = require("express").Router();
const makeCallback = require("../../../utils/callback");
const userController = require("../../controllers/user");

// GET  : Get all User
router.get("/", makeCallback(userController.getUsersList));

// GET  : Get specified User
router.get("/:id", makeCallback(userController.getUser));


module.exports = router;
