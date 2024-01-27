const router = require("express").Router();
const makeCallback = require("../../../utils/callback");
const userController = require("../../controllers/jobs");

// GET  : Get all products
router.get("/", makeCallback(userController.listProducts));

//GET : view specified product
router.get("/:id", makeCallback(userController.viewProduct));

module.exports = router;
