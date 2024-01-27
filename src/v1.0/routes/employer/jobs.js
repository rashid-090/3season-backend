const router = require("express").Router();
const makeCallback = require("../../../utils/callback");
const userController = require("../../controllers/jobs");

// POST  : Create job
router.post("/", makeCallback(userController.createProducts));

// GET  : Get all jobs
router.get("/", makeCallback(userController.listProducts));

//GET : view specified job
router.get("/:id", makeCallback(userController.viewProduct));

module.exports = router;
