const Item = require("../models/item_model");

const sendError = (res, code, msg) => {
  return res.status(code).send({
    status: "fail",
    error: msg
  });
};

const getItems = async (req, res) => {
  try {
    items = await Item.find();
    res.status(200).send(items);
  } catch (err) {
    return sendError(res, 400, err.message);
  }
};

const getItemById = async (req, res) => {
  try {
    items = await Item.findById(req.params.id);
    res.status(200).send(items);
  } catch (err) {
    return sendError(res, 400, err.message);
  }
};

const addNewItem = async (req, res) => {
  console.log("addNewItem " + req.body.message);

  const itemname = req.body.itemname;
  const itemdescription = req.body.itemdescription;
  const itemprice = req.body.itemprice;
  const itemrating = req.body.itemrating;
  const itemquantity = req.body.itemquantity;
  const itempictures = req.body.itempictures;
  manager = req.user.id;

  const item = Item({
    item_name: itemname,
    item_description: itemdescription,
    item_price: itemprice,
    item_rating: itemrating,
    item_quantity: itemquantity,
    item_pictures: itempictures
  });
  try {
    newPost = await item.save();
    res.status(200).send(newPost);
  } catch (err) {
    return sendError(res, 400, err.message);
  }
};

module.exports = { getItems, addNewItem, getItemById };
