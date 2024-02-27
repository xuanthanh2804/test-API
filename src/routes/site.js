const express = require("express");
const router = express.Router();
const SiteController = require("../controllers/siteController");
const {FactorAuthentication} = require("../middleware/FactorAuthentication");

router.get("/", SiteController.index);
router.get("/Users", SiteController.getUsers);
router.get("/edit-user/:id", SiteController.getEditUser);
router.get(
  "/delete-user/:id",
  FactorAuthentication.verifyTokenAndAdminAuth,
  SiteController.DeleteUser
);
router.delete(
  "/delete-user/:id",
  FactorAuthentication.verifyTokenAndAdminAuth,

  SiteController.DeleteUser
);
router.post("/put-postCRUD", SiteController.putCRUD);

module.exports = router;
