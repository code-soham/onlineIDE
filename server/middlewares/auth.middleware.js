import User from "../models/User.model.js";
import jwt from "jsonwebtoken";

const authValidate = async (req, res, next) => {
  const token = req.cookies.authToken;
  if (token) {
    jwt.verify(token, process.env.SECRET, async (err, decodedToken) => {
      if (err) {
        console.log(err);
        res.locals.user = null;
        next();
      } else {
        let user = await User.findById(decodedToken.id);
        res.locals.user = user;
        console.log("middleware : user validated");
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

const isAdmin = (req, res, next) => {
  const token = req.cookies.authToken;
  if (token) {
    jwt.verify(token, db.secret, async (err, decodedToken) => {
      if (err) {
        console.log(err);
        res.locals.user = null;
        next();
      } else {
        let user = await User.findById(decodedToken.id);
        res.locals.user = user;
        console.log("middleware : user validated");
        if (user.role === "admin") {
          console.log("middleware : user is admin");
          next();
        } else {
          console.log("middleware : user is not admin");
          res.status(200).json({
            resCode: 400,
            resMessage: "You are not authorized to access this page",
            resType: "danger",
          });
        }
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

export { authValidate, isAdmin };
