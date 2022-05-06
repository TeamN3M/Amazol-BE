const express = require("express");
const router = express.Router();
const item = require("../controllers/items");
const authenticate = require("../common/auth_middleware");

router.get("/", item.getItems);

router.get("findItem/:id", item.getItemById);

router.post("/", item.addNewItem);

module.exports = router;
