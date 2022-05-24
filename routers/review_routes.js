const express = require("express");
const router = express.Router();
const review = require("../controllers/reviews");

router.get("/", review.getReviews);

router.get("/itemReview/:item", review.findItemReviews);

router.post("/", review.addReview);

router.delete("/:id", review.deleteReview);

module.exports = router;
