// routes/test.js
const express = require("express");
const router = express.Router();
const {SignIn} = require("../controllers/SignInController");
const {FactorAuthentication} = require("../middleware/FactorAuthentication");
const {requestRefreshToken, userLogOut} = require("../services/userService");

// LOGIN
router.get("/user/login-user", SignIn.Login);
router.post("/login", FactorAuthentication.verifytoken, SignIn.checkUserByName);
//REFRESHTOKEN
router.post("/refresh", requestRefreshToken);

//LOG OUT
router.post("/log-out", FactorAuthentication.verifytoken, userLogOut);
module.exports = router;
