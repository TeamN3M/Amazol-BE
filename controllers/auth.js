const User = require("../models/user_model");
const bcrypt = require("bcrypt");
const { use } = require("../routers");
const jwt = require("jsonwebtoken");
const { removePasswordFromUserRes } = require("../helpers");

const sendError = (res, code, msg) => {
  return res.status(code).send({
    status: "fail",
    error: msg
  });
};

const register = async (req, res) => {
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const email = req.body.email;
  const password = req.body.password;
  const isadmin = req.body.isadmin;

  try {
    const exists = await User.findOne({ email: email });
    if (exists != null) {
      return res.status(400).send({
        status: "fail",
        error: "user exists"
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashPwd = await bcrypt.hash(password, salt);

    const user = User({
      first_name: firstname,
      last_name: lastname,
      email: email,
      password: hashPwd,
      isAdmin: isadmin
    });
    newUser = await user.save();
    res.status(200).send(newUser);
  } catch (err) {
    res.status(400).send({
      status: "fail",
      error: err.message
    });
  }
};

const login = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  if (email == null || password == null)
    return sendError(res, 400, "wrong email or password");

  try {
    const user = await User.findOne({ email: email });
    if (user == null) return sendError(res, 400, "wrong email or password");

    const match = await bcrypt.compare(password, user.password);
    if (!match) return sendError(res, 400, "wrong email or password");

    const accessToken = await jwt.sign(
      { id: user._id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: process.env.JWT_TOKEN_EXPIRATION }
    );
    res.status(200).send({ accessToken: accessToken, user: user });
  } catch (err) {
    return sendError(res, 400, err.message);
  }
};

const loginWithGoogle = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const fname = req.body.first_name;
  const lname = req.body.last_name;

  const exists = await User.findOne({ email: email });
  if (exists == null) {
    const user = User({
      first_name: fname,
      last_name: lname,
      email: email,
      password: password,
      isAdmin: false
    });
    newUser = await user.save();
  }

  try {
    const user = await User.findOne({ email: email });
    if (user == null) return sendError(res, 400, "user dosent exist");

    const accessToken = await jwt.sign(
      { id: user._id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: process.env.JWT_TOKEN_EXPIRATION }
    );
    res.status(200).send({ accessToken: accessToken, user: user });
  } catch (err) {
    return sendError(res, 400, err.message);
  }
};

const logout = async (req, res) => {
  res.status(400).send({
    status: "fail",
    error: "not implemented"
  });
};

const getUsers = async (req, res) => {
  try {
    users = await User.find();
    res.status(200).send(users);
  } catch (err) {
    return sendError(res, 400, err.message);
  }
};
const getUser = async (req, res) => {
  const userId = req.user.id;
  if (userId) {
    try {
      const user = await User.findOne({ _id: userId });
      const editedUser = removePasswordFromUserRes(user);
      res.status(200).json({ user: editedUser });
    } catch (err) {
      res.status(500).json({ err, msg: "Error fetching user" });
    }
  } else {
    res.status(400).json("User id not found");
  }
};

const getUserById = async (req, res) => {
  try {
    users = await User.findById(req.params.id);
    res.status(200).send(users);
  } catch (err) {
    return sendError(res, 400, err.message);
  }
};

module.exports = {
  login,
  register,
  logout,
  getUsers,
  getUser,
  getUserById,
  loginWithGoogle
};
