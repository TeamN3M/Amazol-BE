const express = require("express");
const router = express.Router();
const item = require("../controllers/items");

router.get("/", item.getItems);

router.get("/findItem/:id", item.getItemById);

router.post("/", item.addNewItem);

router.put("/updateItem/:id", item.updateItem);

module.exports = router;
