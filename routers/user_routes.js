const express = require("express");
const { authenticate } = require("../common/auth_middleware");
const router = express.Router();
const User = require("../controllers/user");

router.get("/", User.getAllUsers);
router.get("/findUser/:id", authenticate, User.findUser);
router.delete("/deleteUser", User.deleteUser);

module.exports = router;
