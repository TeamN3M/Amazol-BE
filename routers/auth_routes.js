const express = require("express");
const { authenticate } = require("../common/auth_middleware");
const router = express.Router();
const Auth = require("../controllers/auth");

router.post("/login", Auth.login);
router.post("/loginGoogle", Auth.loginWithGoogle);
router.post("/register", Auth.register);
router.post("/logout", Auth.logout);
router.get("/", Auth.getUsers);
router.get("/getUser", authenticate, Auth.getUser);

module.exports = router;
