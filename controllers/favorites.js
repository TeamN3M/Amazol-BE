const Favorites = require("../models/favorites_model");

const sendError = (res, code, msg) => {
  return res.status(code).send({
    status: "fail",
    error: msg
  });
};
const addFavorites = async (req, res) => {
  const cid = req.body.customer_id;
  const itemsArray = req.body.items;

  const newFavorites = Favorites({
    customer_id: cid,
    items: itemsArray
  });

  try {
    const favorites = await newFavorites.save();
    res.status(200).json(favorites);
  } catch (err) {
    return sendError(res, 400, err.message);
  }
};

const updateFavorites = async (req, res) => {
  const fav_id = req.params.id;

  if (fav_id) {
    const cid = req.body.customer_id;
    const itemsArray = req.body.items;

    try {
      const updateFavorites = await Favorites.findByIdAndUpdate(
        fav_id,
        { $set: { customer_id: cid, items: itemsArray } },
        { new: true }
      );
      res.status(200).json(updateFavorites);
    } catch (err) {
      return sendError(res, 400, err.message);
    }
  } else {
    return sendError(res, 500, "Error in favorites ID");
  }
};
const deleteFavorites = async (req, res) => {
  const fav_id = req.params.id;
  if (fav_id) {
    try {
      await Favorites.findByIdAndDelete(fav_id);
      res.status(200).json("delete Favorites");
    } catch (err) {
      return sendError(res, 400, "Error to delete Favorites");
    }
  } else {
    return sendError(res, 500, "Error in Favorites ID");
  }
};

const findUserFavorites = async (req, res) => {
  const cid = req.params.id;
  let userFav;
  if (cid) {
    try {
      Favorites.findOne({ customer_id: cid }, function (err, docs) {
        if (err) {
        } else {
          userFav = docs;
          if (userFav !== null) {
            res.status(200).json(userFav);
          } else {
            res.status(500).send("no favorites found");
          }
        }
      });
    } catch (err) {
      return sendError(res, 400, err.message);
    }
  } else {
    return sendError(res, 500, "Error in favorites ID");
  }
};
const getFavorites = async (req, res) => {
  try {
    favorites = await Favorites.find().sort({ createdAt: -1 });
    res.status(200).send(favorites);
  } catch (err) {
    return sendError(res, 400, err.message);
  }
};

module.exports = {
  addFavorites,
  updateFavorites,
  deleteFavorites,
  findUserFavorites,
  getFavorites
};
