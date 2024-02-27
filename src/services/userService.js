const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {db} = require("../models/index");

//AcessToken
const generateAccessToken = (user) => {
  return jwt.sign(
    {userId: user.id, email: user.email},
    process.env.JWT_ACCESS_KEY,
    {
      expiresIn: "2h", // Token expires in 2h (adjust as needed)
    }
  );
};
//RefreshToken
const generateRefreshToken = (user) => {
  return jwt.sign(
    {
      userId: user.id,
      email: user.email,
    },
    process.env.JWT_REFRESHTOKEN_KEY,
    {
      expiresIn: "30d", // Token expires in 30 day (adjust as needed)
    }
  );
};

let checkLogin = async (nickname, User_pw, req, res) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = {};
      let isExist = await checkUserEmail(nickname);
      if (isExist) {
        let user = await db.Customer.findOne({
          attributes: ["email", "password", "id", "admin"],
          where: {email: nickname},
          raw: true,
        });
        if (user) {
          let check = await bcrypt.compare(User_pw, user.password);
          if (check) {
            const userWithoutPassword = {...user};
            delete userWithoutPassword.password;

            // Generate JWT

            const token = generateAccessToken(user);
            const refreshToken = generateRefreshToken(user);

            res.cookie("refreshToken", refreshToken, {
              httpOnly: true,
              secure: false,
              path: "/",
              sameSite: "Strict",
            });
            // return res.status(200).json({
            //   success: true,
            //   user: userWithoutPassword,
            //   token: token,
            // });
            res.redirect("/");
          } else {
            userData.errCode = 3;
            userData.errMessage = "Incorrect password";
            resolve(userData);
          }
        } else {
          userData.errCode = 2;
          userData.errMessage = `User's not found!`;
          resolve(userData);
        }
      } else {
        userData.errCode = 1;
        userData.errMessage = `Your user email isn't in your system`;
        resolve(userData);
      }
    } catch (error) {
      reject(error);
    }
  });
};

let requestRefreshToken = async (req, res) => {
  // Take refresh token from user
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.status(401).json("You're not authenticated");

  jwt.verify(refreshToken, process.env.JWT_REFRESHTOKEN_KEY, (err, user) => {
    if (err) {
      // Handle token verification error
      return res.status(401).json("Token verification failed");
    }

    // Generate new access and refresh tokens
    const newAccessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user);

    // Set the new refresh token in the cookie
    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: false,
      path: "/",
      sameSite: "Strict",
    });

    // Send the new access token in the response
    return res.status(200).json({token: newAccessToken});
  });
};

let userLogOut = async (req, res) => {
  res.clearCookie("refreshToken");
  return res.status(200).json("success");
};

let checkUserEmail = (userEmail) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.Customer.findOne({
        where: {email: userEmail},
        raw: true,
      });
      if (user) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  checkLogin,
  requestRefreshToken,
  userLogOut,
};
