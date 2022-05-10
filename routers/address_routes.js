const express = require("express");
const router = express.Router();
const address = require("../controllers/address");
const { authenticate } = require("../common/auth_middleware");

router.post("/", authenticate, address.addAddress);
router.get("/getAddress/:id", authenticate, address.findUserAddress);
router.put("/updateAddress", authenticate, address.updateAddress);

module.exports = router;
