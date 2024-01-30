const router = require("express").Router();
const makeCallback = require("../../../utils/callback");
const accountController = require("../../controllers/account");
const userController = require("../../controllers/user");
const { multerSingleFile } = require("../../services/external/file");
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

//GET : view profile
router.get("/", makeCallback(accountController.viewAccount));

router.post("/", multerSingleFile("image"), makeCallback(userController.updateUserProfile));

module.exports = router;
