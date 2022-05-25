const express = require("express");
const router = express.Router();
const favorites = require("../controllers/favorites");

router.get("/", favorites.getFavorites);

router.get("/userFavorites/:id", favorites.findUserFavorites);

router.post("/", favorites.addFavorites);

router.delete("/:id", favorites.deleteFavorites);

router.put("/updateFavorites/:id", favorites.updateFavorites);

router.put("/addItemFavorites", favorites.addItemToFavorites);

module.exports = router;
