const express = require("express");
const router = express.Router();
const cart = require("../controllers/carts");
const authenticate = require("../common/auth_middleware");

router.get("/", cart.getCarts);

router.get("/userCart/:id", cart.findUserCart);

router.post("/", cart.addCart);

router.delete("/", cart.deleteCart);

router.put("/updateCart/:id", cart.updateCart);

module.exports = router;
