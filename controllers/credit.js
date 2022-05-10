const { findOne } = require("../models/address_model");
const Credit = require("../models/credit_model");

const sendError = (res, code, msg) => {
  return res.status(code).send({
    status: "fail",
    error: msg
  });
};
const addCredit = async (req, res) => {
  const cid = req.body.customer_id;
  const name = req.body.name;
  const number = req.body.card_number;
  const date = req.body.date;
  const code = req.body.cvv;

  const newCredit = Credit({
    customer_id: cid,
    name: name,
    card_number: number,
    date: date,
    cvv: code
  });

  try {
    const credit = await newCredit.save();
    res.status(200).json(credit);
  } catch (err) {
    return sendError(res, 400, err.message);
  }
};

const updateCredit = async (req, res) => {
  const creditUser = await Credit.findOne({
    customer_id: req.body.customer_id
  });

  if (creditUser) {
    const cid = req.body.customer_id;
    const name = req.body.name;
    const number = req.body.card_number;
    const date = req.body.date;
    const code = req.body.cvv;
    try {
      const updatesCredit = await Credit.findByIdAndUpdate(
        creditUser.id,
        {
          $set: {
            customer_id: cid,
            name: name,
            card_number: number,
            date: date,
            cvv: code
          }
        },
        { new: true }
      );
      res.status(200).json(updatesCredit);
    } catch (err) {
      return sendError(res, 400, err.message);
    }
  } else {
    return sendError(res, 500, "Error in credit card ID");
  }
};

const findUserCredit = async (req, res) => {
  const cid = req.params.id;
  let userCredit;
  if (cid) {
    try {
      Credit.findOne({ customer_id: cid }, function (err, docs) {
        if (err) {
        } else {
          userCredit = docs;
          if (userCredit !== null) {
            res.status(200).json(userCredit);
          } else {
            res.status(500).send("no credit card found");
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

module.exports = {
  addCredit,
  updateCredit,
  findUserCredit
};
