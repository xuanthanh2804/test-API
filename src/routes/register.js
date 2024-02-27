// routes/register.js
const express = require("express");
const router = express.Router();
const {Register} = require("../controllers/RegisterController");

router.get("/user/create-user", Register.register);
router.post("/register-post", Register.postCRUD);

module.exports = router;
