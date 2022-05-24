const express = require("express");
const router = express.Router();
const order = require("../controllers/orders");
const authenticate = require("../common/auth_middleware");

router.get("/", order.getOrders);

router.get("/userOrders/:id", order.findUserOrders);

router.get("/monthOrders/:month", order.findMonthOrders);

router.post("/", order.addOrder);

router.delete("/:id", order.deleteOrder);

router.put("/updateOrder/:id", order.updateOrder);

module.exports = router;
