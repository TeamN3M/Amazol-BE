const Order = require("../models/order_model");

const sendError = (res, code, msg) => {
  return res.status(code).send({
    status: "fail",
    error: msg
  });
};

const addOrder = async (req, res) => {
  const cid = req.body.customer_id;
  const itemsArray = req.body.items;
  const price = req.body.price;
  const adrr = req.body.address;

  const newOrder = Order({
    customer_id: cid,
    items: itemsArray,
    price: price,
    address: adrr
  });

  try {
    const savedOrder = await newOrder.save();
    res.status(200).json(savedOrder);
  } catch (err) {
    return sendError(res, 400, err.message);
  }
};

const updateOrder = async (req, res) => {
  const order_id = req.params.id;
  if (order_id) {
    const newStatus = req.body.status;

    try {
      const updateOrder = await Order.findByIdAndUpdate(
        order_id,
        { $set: { status: newStatus } },
        { new: true }
      );
      res.status(200).json(updateOrder);
    } catch (err) {
      return sendError(res, 400, err.message);
    }
  } else {
    return sendError(res, 500, "Error in order ID");
  }
};

const deleteOrder = async (req, res) => {
  const order_id = req.params.id;
  if (order_id) {
    try {
      await Order.findByIdAndDelete(order_id);
      res.status(200).json("delete order");
    } catch (err) {
      return sendError(res, 400, "Error to delete order");
    }
  } else {
    return sendError(res, 500, "Error in order ID");
  }
};
const getOrders = async (req, res) => {
  try {
    orders = await Order.find().sort({ createdAt: -1 });
    res.status(200).send(orders);
  } catch (err) {
    return sendError(res, 400, err.message);
  }
};
const findUserOrders = async (req, res) => {
  const cid = req.params.id;
  let userOrders;
  if (cid) {
    try {
      Order.find({ customer_id: cid }, function (err, docs) {
        if (err) {
        } else {
          userOrders = docs;
          if (userOrders !== null) {
            res.status(200).json(userOrders);
          } else {
            res.status(500).send("no orders found");
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
const findMonthOrders = async (req, res) => {
  const month = Number(req.params.month);

  console.log("month", month);

  if (!isNaN(month) && month > 0 && month <= 12) {
    const currentMonth = new Date(new Date().setMonth(month - 1));
    console.log("current", currentMonth);
    try {
      const income = await Order.aggregate([
        { $match: { createdAt: { $gte: currentMonth } } },
        {
          $project: {
            month: { $month: "$createdAt" },
            sales: "$price"
          }
        },
        {
          $group: {
            _id: "$month",
            totalIncome: { $sum: "$sales" }
          }
        }
      ]);

      res.status(200).json(income);
    } catch (err) {
      res.status(500).json({ err, msg: "Error while fetching data" });
    }
  } else {
    res.status(400).json("Month is not valid.");
  }
};

module.exports = {
  addOrder,
  updateOrder,
  deleteOrder,
  getOrders,
  findUserOrders,
  findMonthOrders
};
