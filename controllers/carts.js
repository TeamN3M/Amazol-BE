const Cart = require("../models/cart_model");

const sendError = (res, code, msg) => {
  return res.status(code).send({
    status: "fail",
    error: msg
  });
};
const addCart = async (req, res) => {
  const cid = req.body.customer_id;
  const itemsArray = req.body.items;

  const newCart = Cart({
    customer_id: cid,
    items: itemsArray
  });

  try {
    const cart = await newCart.save();
    res.status(200).json(cart);
  } catch (err) {
    return sendError(res, 400, err.message);
  }
};

const updateCart = async (req, res) => {
  const cart_id = req.params.id;
  console.log("cart ID ", cart_id);
  if (cart_id) {
    const cid = req.body.customer_id;
    const itemsArray = req.body.items;

    try {
      const updateCart = await Cart.findByIdAndUpdate(
        cart_id,
        { $set: { customer_id: cid, items: itemsArray } },
        { new: true }
      );
      res.status(200).json(updateCart);
    } catch (err) {
      return sendError(res, 400, err.message);
    }
  } else {
    return sendError(res, 500, "Error in cart ID");
  }
};
const deleteCart = async (req, res) => {
  const cart_id = req.params.id;
  if (cart_id) {
    try {
      await Cart.findByIdAndDelete(cart_id);
      res.status(200).json("delete cart");
    } catch (err) {
      return sendError(res, 400, "Error to delete cart");
    }
  } else {
    return sendError(res, 500, "Error in cart ID");
  }
};
const findUserCart = async (req, res) => {
  const cid = req.params.id;
  console.log("customer ", cid);
  if (cid) {
    try {
      let userCart;
      const result = await Cart.findOne(
        { customer_id: cid },
        function (err, docs) {
          if (err) {
            console.log(err);
          } else {
            userCart = docs;
          }
        }
      );
      console.log(userCart);
      res.status(200).json(userCart);
    } catch (err) {
      return sendError(res, 400, err.message);
    }
  } else {
    return sendError(res, 500, "Error in cart ID");
  }
};
const getCarts = async (req, res) => {
  try {
    carts = await Cart.find().sort({ createdAt: -1 });
    res.status(200).send(carts);
  } catch (err) {
    return sendError(res, 400, err.message);
  }
};

module.exports = { addCart, updateCart, deleteCart, findUserCart, getCarts };
