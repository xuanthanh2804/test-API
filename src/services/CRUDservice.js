const {db} = require("../models/index");
const bcrypt = require("bcrypt");
const saltRounds = 10;
let createNewUser = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPasswordFromBc = await hashPassword(data.password);
      await db.Customer.create({
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        password: hashPasswordFromBc,
      });
      resolve("succes");
    } catch (error) {
      reject(error);
    }
  });
};
let hashPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!password) {
        reject("Password is required");
        return;
      }

      // Generate salt
      const salt = await bcrypt.genSalt(saltRounds);

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, salt);
      resolve(hashedPassword);
    } catch (error) {
      reject(error);
    }
  });
};

let getAllUser = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      let customers = await db.Customer.findAll({
        raw: true,
      });
      resolve(customers);
    } catch (error) {
      reject(error);
    }
  });
};
let getUserInfoById = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.Customer.findOne({
        where: {id: userId},
        raw: true,
      });
      if (user) {
        resolve(user);
      } else {
        resolve({});
      }
    } catch (error) {
      reject(error);
    }
  });
};
let UpdateInfomation = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.Customer.findByPk(data.id);
      if (user) {
        user.first_name = data.first_name;
        user.last_name = data.last_name;
        await user.save();
        resolve();
      } else {
        resolve();
      }
    } catch (error) {
      reject(error);
    }
  });
};
let deleteUserById = async (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.Customer.findOne({
        where: {id: userId},
      });
      if (user) {
        await user.destroy();
      }
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  createNewUser,
  getAllUser,
  getUserInfoById,
  UpdateInfomation,
  deleteUserById,
};
