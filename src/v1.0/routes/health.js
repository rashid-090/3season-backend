const router = require("express").Router();
const messages = require("../../config/messages");
const makeCallback = require("../../utils/callback");

router.get(
    "/",
    makeCallback(async () => ({ message: messages.healthCheck }))
);

module.exports = router;
