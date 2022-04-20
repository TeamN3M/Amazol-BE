const express = require("express");
const router = express.Router();
const item = require("../controllers/items");
const authenticate = require("../common/auth_middleware");

router.get("/", authenticate, item.getItems);

router.get("/:id", authenticate, item.getItemById);

router.post("/", authenticate, item.addNewItem);

module.exports = router;
