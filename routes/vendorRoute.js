const express = require("express");
const controller = require(`${__dirname}/../controllers/vendorController`);
const auth = require(`${__dirname}/../middleware/auth`);
const validate = require(`${__dirname}/../middleware/validation`);

const router = express.Router();

router.use(auth.checkAuthentication);

router.route("/").get(controller.getAllVendor).post(controller.saveVendor);
router.route("/:id").get(controller.getVendor).put(validate.validateVendor, controller.updateVendor).delete(controller.deleteVendor);
router.route("/:id/verify").patch(controller.verifyVendor);
module.exports = router;