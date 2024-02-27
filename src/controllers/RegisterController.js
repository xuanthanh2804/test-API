// src/controllers/register.js
const {db} = require("../models/index");
const CRUDservice = require("../services/CRUDservice");
const Register = {
  register: (req, res) => {
    try {
      const slug = req.params.slug;
      res.render("user/create-user", {slug});
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error");
    }
  },

  postCRUD: async (req, res) => {
    let mess = await CRUDservice.createNewUser(req.body);
    return res.redirect("user/login-user");
  },
};

module.exports = {Register};
