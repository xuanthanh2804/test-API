const jwt = require("jsonwebtoken");

const FactorAuthentication = {
  // verify a token
  verifytoken: (req, res, next) => {
    const token = req.headers.token;
    if (token) {
      const accessToken = token.split(" ")[1];
      jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, user) => {
        if (err) {
          res.status(403).json("token id not vaild");
        }
        req.user = user;
        next();
      });
    } else {
      res.status(401).json("you're not authenticated");
    }
  },
  verifyTokenAndAdminAuth: (req, res, next) => {
    FactorAuthentication.verifytoken(req, res, () => {
      if (req.user.userId == req.params.id || req.user.admin === 1) {
        next();
      } else
        res
          .status(403)
          .json("Unauthorized access - Admin privileges required.");
    });
  },
};

module.exports = {FactorAuthentication};
