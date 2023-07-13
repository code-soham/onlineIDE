import User from "../models/User.model.js";
import jwt from "jsonwebtoken";

// token generator
const maxAge = 24 * 60 * 60; // 1 day
const createToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET, {
    expiresIn: maxAge,
  });
};
// login when signin up
const signup = async (req, res) => {
  const { email, password, username, role } = req.body;
  try {
    const user = await User.create({ email, password, username, role });
    const token = createToken(user._id);
    res.cookie("authToken", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({
      user: { email: user.email },
      resCode: 200,
      resMessage: "User registered successfully",
      resType: "success",
    });
  } catch (err) {
    res.status(200).json({
      resCode: 401,
      errors: err,
      resMessage: "Input correct credentials",
    });
    //   res.status(400).json({ errors });
  }
};
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie("authToken", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({
      user: { email: user.email },
      resCode: 200,
    });
  } catch (err) {
    console.log("error", err);
    res.status(200).json({
      error: err,
      resCode: 400,
      resMessage: "Invalid Credentials",
      resType: "danger",
    });
  }
};
const logout = (req, res) => {
  res.cookie("authToken", "", { maxAge: 1 });
  res.status(200).json({
    resCode: 400,
    resMessage: "Success",
  });
  //res.redirect('/');
};

export default { signup, login, logout };
