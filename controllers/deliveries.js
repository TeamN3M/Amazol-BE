const Delivery = require("../models/delivery_model");

const sendError = (res, code, msg) => {
  return res.status(code).send({
    status: "fail",
    error: msg
  });
};

const addDelivery = async (req, res) => {
  const date = req.body.date;
  const time = req.body.time;
  const adrr = req.body.address;
  const isAvailable = req.body.isAvailable;

  const newDelivery = Delivery({
    date: date,
    time: time,
    isAvailable: isAvailable,
    address: adrr
  });

  try {
    const savedDelivery = await newDelivery.save();
    res.status(200).json(savedDelivery);
  } catch (err) {
    return sendError(res, 400, err.message);
  }
};
const updateDelivery = async (req, res) => {
  const delivery_id = req.params.id;
  if (delivery_id) {
    const orderId = req.body.order_id;
    try {
      const updateDelivery = await Delivery.findByIdAndUpdate(
        delivery_id,
        { $set: { order_id: orderId } },
        { new: true }
      );
      res.status(200).json(updateDelivery);
    } catch (err) {
      return sendError(res, 400, err.message);
    }
  } else {
    return sendError(res, 500, "Error in order ID");
  }
};

const deleteDelivery = async (req, res) => {
  const delivery_id = req.params.id;
  if (delivery_id) {
    try {
      await Delivery.findByIdAndDelete(delivery_id);
      res.status(200).json("delete delivery");
    } catch (err) {
      return sendError(res, 400, "Error to delete delivery");
    }
  } else {
    return sendError(res, 500, "Error in delivery ID");
  }
};
const getDeliveries = async (req, res) => {
  try {
    deliveries = await Delivery.find().sort({ createdAt: -1 });
    res.status(200).send(deliveries);
  } catch (err) {
    return sendError(res, 400, err.message);
  }
};
const findOrderDelivery = async (req, res) => {
  const oid = req.params.order;
  let orderDelivery;
  if (oid) {
    try {
      Delivery.find({ order_id: oid }, function (err, docs) {
        if (err) {
        } else {
          orderDelivery = docs;
          if (orderDelivery.length !== 0) {
            res.status(200).json(orderDelivery);
          } else {
            res.status(500).send("no delivires found");
          }
        }
      });
    } catch (err) {
      return sendError(res, 400, err.message);
    }
  } else {
    return sendError(res, 500, "Error in order ID");
  }
};
const findDeliveryByID = async (req, res) => {
  const delivery_id = req.params.id;
  if (delivery_id) {
    try {
      const foundDelivery = await Delivery.findById(delivery_id);
      res.status(200).json(foundDelivery);
    } catch (err) {
      return sendError(res, 400, err.message);
    }
  } else {
    return sendError(res, 500, "Error in order ID");
  }
};

module.exports = {
  addDelivery,
  updateDelivery,
  deleteDelivery,
  getDeliveries,
  findOrderDelivery,
  findDeliveryByID
};
