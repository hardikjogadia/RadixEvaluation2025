const express = require("express");
const controller = require(`${__dirname}/../controllers/authController`);
const validate = require(`${__dirname}/../middleware/validation`);

const router = express.Router();

router.route("/register").post(validate.validateVendor, controller.saveVendor);
router.route("/login").post(controller.authenticateVendor);
module.exports = router;
