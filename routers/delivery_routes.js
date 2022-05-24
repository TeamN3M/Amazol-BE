const express = require("express");
const router = express.Router();
const delivery = require("../controllers/deliveries");

router.get("/", delivery.getDeliveries);

router.get("/orderDelivery/:order", delivery.findOrderDelivery);

router.get("/:id", delivery.findDeliveryByID);

router.post("/", delivery.addDelivery);

router.delete("/:id", delivery.deleteDelivery);

router.put("/updateDelivery/:id", delivery.updateDelivery);

module.exports = router;
