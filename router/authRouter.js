const express = require("express");
const router = express.Router();
const authController = require("../controller/authController");

router.post("/register", authController.signup);
router.post("/login", authController.signin);

module.exports = router;
