const express = require("express");
const siteRouter = require("./site");
const Register = require("./register");
const Login_User = require("./login");

function route(app) {
  app.use("/", siteRouter);
  app.use("/", Register);
  app.use("/", Login_User);
}

module.exports = route;
