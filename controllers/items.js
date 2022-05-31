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
    item = await Item.findById(req.params.id);
    res.status(200).send(item);
  } catch (err) {
    return sendError(res, 400, err.message);
  }
};

const addNewItem = async (req, res) => {
  const itemname = req.body.item_name;
  const itemdescription = req.body.item_description;
  const itemprice = req.body.item_price;
  const itemrating = req.body.item_rating;
  const itemquantity = req.body.item_quantity;
  const isAvailable = req.body.isAvailable;
  const itempictures = req.body.item_pictures;

  // manager = req.user.id;

  const item = Item({
    item_name: itemname,
    item_description: itemdescription,
    item_price: itemprice,
    item_rating: itemrating,
    item_quantity: itemquantity,
    isAvailable: isAvailable,
    item_pictures: itempictures
  });
  try {
    newItem = await item.save();
    res.status(200).send(newItem);
  } catch (err) {
    return sendError(res, 400, err.message);
  }
};

const updateItem = async (req, res) => {
  const item_id = req.params.id;

  if (item_id) {
    const updatedItem = req.body.item;
    try {
      const updateItem = await Item.findByIdAndUpdate(item_id, {
        $set: {
          item_name: updatedItem.item_name,
          item_description: updatedItem.item_description,
          item_price: updatedItem.item_price,
          item_rating: updatedItem.item_rating,
          item_quantity: updatedItem.item_quantity,
          isAvailable: updatedItem.isAvailable,
          item_pictures: updatedItem.item_pictures
        }
      });
      res.status(200).json(updateItem);
    } catch (err) {
      return sendError(res, 400, err.message);
    }
  } else {
    return sendError(res, 500, "Error in cart ID");
  }
};

const updateItemsQuantity = async (req, res) => {
  const items = req.body.items;
  let newItems = [];
  if (items) {
    for (let i = 0; i < items.length; i++) {
      let itemID = items[i].item_id;
      if (itemID === "0") {
        continue;
      }
      let itemBeforeUpdate = await Item.findOne({ _id: itemID });
      let newQ = itemBeforeUpdate.item_quantity - items[i].quantity;
      if (itemBeforeUpdate) {
        try {
          const updateItem = await Item.findByIdAndUpdate(itemID, {
            $set: {
              item_quantity: newQ
            }
          });
          newItems.push(updateItem);
        } catch (err) {
          return sendError(res, 400, err.message);
        }
      }
    }
    res.status(200).json(newItems);
  } else {
    return sendError(res, 500, "Error in items");
  }
};
module.exports = {
  getItems,
  addNewItem,
  getItemById,
  updateItem,
  updateItemsQuantity
};
