const express = require("express");
const { authenticate } = require("../common/auth_middleware");
const router = express.Router();
const User = require("../controllers/user");

router.get("/", User.getAllUsers);
router.get("/findUser/:id", authenticate, User.findUser);
router.delete("/deleteUser", User.deleteUser);
router.get("/findUserByEmail/:email", User.findUserByEmail);
router.put("/resetPassword", User.resetPassword);
router.put("/updateInfo", authenticate, User.updateUserInfo);

module.exports = router;
