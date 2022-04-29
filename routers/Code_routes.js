const express = require("express");
const router = express.Router();
const Code = require("../controllers/amazolCode");

router.get("/", Code.getCode);
router.post("/", Code.AuthManager);

module.exports = router;
