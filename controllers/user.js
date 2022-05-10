const User = require("../models/user_model");
const bcrypt = require("bcrypt");
const { removePasswordFromUserRes } = require("../helpers");

const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);

    res.status(200).json("User deleted");
  } catch (err) {
    res.status(500).json({ err, msg: "Error while deleting." });
  }
};

const findUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const filteredUser = removePasswordFromUserRes(user);

    res.status(200).json(filteredUser);
  } catch (err) {
    res.status(500).json({ err, msg: "can't find user" });
  }
};
const findUserByEmail = async (req, res) => {
  const email = req.params.email;
  const exists = await User.findOne({ email: email });
  if (exists != null) {
    res.status(200).send(exists._id);
  } else {
    res.status(500).json({ msg: "can't find user" });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const latestUsers = await User.find().sort({ id: -1 }).limit(10);

    res.status(200).json(latestUsers);
  } catch (err) {
    res.status(500).json({ err, msg: "can't fetch users" });
  }
};
const resetPassword = async (req, res) => {
  const userID = req.body.id;
  const password = req.body.password;
  const salt = await bcrypt.genSalt(10);
  const newPassword = await bcrypt.hash(password, salt);

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userID,
      {
        $set: { password: newPassword }
      },
      {
        new: true
      }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ err, msg: "Error while updating." });
  }
};

module.exports = {
  deleteUser,
  findUser,
  getAllUsers,
  resetPassword,
  findUserByEmail
};
