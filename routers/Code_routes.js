const express = require("express");
const router = express.Router();
const Code = require("../controllers/amazolCode");

router.get("/", Code.getCode);

module.exports = router;
