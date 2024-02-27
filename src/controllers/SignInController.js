// src/controllers/Signin.js
const {token} = require("morgan");
const {db} = require("../models/index");
const CRUDservice = require("../services/CRUDservice");
const handlebarLogin = require("../services/userService");
const {use} = require("../routes/login");

const SignIn = {
  Login: (req, res) => {
    try {
      const slug = req.params.slug;
      res.render("user/login-user", {slug});
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error");
    }
  },
  checkUserByName: async (req, res) => {
    let nickname = req.body.email;
    let User_pw = req.body.password;
    try {
      const user = await handlebarLogin.checkLogin(nickname, User_pw, req, res);
      // if (user.success) {
      //   res.status(200).json({
      //     success: true,
      //     message: "Login Success",
      //     user: user.user,
      //     token: user.token,
      //   });
      //   return res.redirect("/");}
      if (user.success) {
        res.redirect("/", {user: user.user, token: user.token});
      } else {
        res.status(user.status).json({
          success: false,
          message: user.message,
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  },
};

module.exports = {SignIn};
