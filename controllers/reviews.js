const Review = require("../models/review_model");

const sendError = (res, code, msg) => {
  return res.status(code).send({
    status: "fail",
    error: msg
  });
};
const addReview = async (req, res) => {
  const iid = req.body.item_id;
  const customer_name = req.body.customer_name;
  const date = req.body.date;
  const review = req.body.review;
  const rat = req.body.rating;

  const newReview = Review({
    item_id: iid,
    customer_name: customer_name,
    date: date,
    review: review,
    rating: rat
  });

  try {
    const review = await newReview.save();
    res.status(200).json(review);
  } catch (err) {
    return sendError(res, 400, err.message);
  }
};

const deleteReview = async (req, res) => {
  const review_id = req.params.id;
  if (review_id) {
    try {
      await Review.findByIdAndDelete(review_id);
      res.status(200).json("delete Review");
    } catch (err) {
      return sendError(res, 400, "Error to delete Review");
    }
  } else {
    return sendError(res, 500, "Error in Reviewt ID");
  }
};

const findItemReviews = async (req, res) => {
  const iid = req.params.item;
  let itemReviews;
  // console.log("customer ", cid);
  if (iid) {
    try {
      Review.findOne({ item_id: iid }, function (err, docs) {
        if (err) {
        } else {
          itemReviews = docs;
          if (itemReviews !== null) {
            res.status(200).json(itemReviews);
          } else {
            res.status(500).send("no reviews found");
          }
        }
      });
    } catch (err) {
      return sendError(res, 400, err.message);
    }
  } else {
    return sendError(res, 500, "Error in item ID");
  }
};
const getReviews = async (req, res) => {
  try {
    reviews = await Review.find().sort({ createdAt: -1 });
    res.status(200).send(reviews);
  } catch (err) {
    return sendError(res, 400, err.message);
  }
};

module.exports = { addReview, deleteReview, findItemReviews, getReviews };
