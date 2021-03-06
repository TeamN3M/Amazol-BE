const Cart = require("../models/cart_model");

const affiliateItem = {
  item_id: "0",
  item_name: "Affiliate Marketing",
  item_rating: 10,
  item_price: -10,
  item_pictures: [
    "https://www.nichepursuits.com/wp-content/uploads/2021/07/Affiliate-Marketing-Diagram.png"
  ],
  quantity: 1
};

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
  let userCart;
  if (cid) {
    try {
      Cart.findOne({ customer_id: cid }, function (err, docs) {
        if (err) {
        } else {
          userCart = docs;
          if (userCart !== null) {
            res.status(200).json(userCart);
          } else {
            res.status(500).send("no cart found");
          }
        }
      });
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

const addAffiliateToCart = async (req, res) => {
  const cid = req.body.customer_id;

  const userCart = await Cart.findOne({ customer_id: cid });
  const indexOfObject = userCart.items.findIndex((itemKey) => {
    return itemKey.item_id === affiliateItem.item_id;
  });
  if (indexOfObject > -1) {
    return sendError(res, 500, "item already in favorites");
  } else {
    userCart.items.push(affiliateItem);
  }
  try {
    const updateCart = await Cart.findByIdAndUpdate(
      userCart._id,
      { $set: { customer_id: cid, items: userCart.items } },
      { new: true }
    );
    res.status(200).json(updateCart);
  } catch (err) {
    return sendError(res, 400, err.message);
  }
};
module.exports = {
  addCart,
  updateCart,
  deleteCart,
  findUserCart,
  getCarts,
  addAffiliateToCart
};
