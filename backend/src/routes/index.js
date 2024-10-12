const express = require("express");

const router = express.Router();

const userCtrl = require("./users.ctrl");

//유저 관련
router.post("/login", userCtrl.process.login);
router.post("/register", userCtrl.process.register);

module.exports = router;
