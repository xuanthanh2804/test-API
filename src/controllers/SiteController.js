const {db} = require("../models/index");
const CRUDservice = require("../services/CRUDservice");

const SiteController = {
  index: async (req, res) => {
    try {
      let data = await db.Product.findAll({
        raw: true,
      });
      return res.render("home");
    } catch (error) {
      console.error("Error:", error);
      res.status(500).send("Internal Server Error");
    }
  },
  getUsers: async (req, res) => {
    try {
      let data = await CRUDservice.getAllUser();
      return res.render("admin/Users", {dataTable: data});
    } catch (error) {
      console.error("Error:", error);
      res.status(500).send("Internal Server Error");
    }
  },
  getEditUser: async (req, res) => {
    let UserId = req.params.id;
    if (UserId) {
      let Userdata = await CRUDservice.getUserInfoById(UserId);
      return res.render("user/edit-user", {
        user: Userdata,
      });
    } else {
      return res.status(500).send("User Not Found!");
    }
  },
  putCRUD: async (req, res) => {
    let data = req.body;
    let NewUsers = await CRUDservice.UpdateInfomation(data);
    return res.redirect("/users");
  },
  DeleteUser: async (req, res) => {
    let userId = req.params.id;
    if (userId) {
      await CRUDservice.deleteUserById(userId);
      // return res.redirect("/users");
      return res.status(200).json("success");
    } else {
      console.error("Error:", error);
      res.status(500).send("Internal Server Error");
    }
  },
};

module.exports = SiteController;
