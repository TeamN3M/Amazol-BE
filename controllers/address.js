const { findOne } = require("../models/address_model");
const Address = require("../models/address_model");

const sendError = (res, code, msg) => {
  return res.status(code).send({
    status: "fail",
    error: msg
  });
};
const addAddress = async (req, res) => {
  const cid = req.body.customer_id;
  const country = req.body.country;
  const city = req.body.city;
  const address = req.body.address;

  const newAddress = Address({
    customer_id: cid,
    country: country,
    city: city,
    address: address
  });

  try {
    const address = await newAddress.save();
    res.status(200).json(address);
  } catch (err) {
    return sendError(res, 400, err.message);
  }
};

const updateAddress = async (req, res) => {
  const addressUser = await Address.findOne({
    customer_id: req.body.customer_id
  });

  if (addressUser) {
    const cid = req.body.customer_id;
    const country = req.body.country;
    const city = req.body.city;
    const address = req.body.address;
    try {
      const updatesAddress = await Address.findByIdAndUpdate(
        addressUser.id,
        {
          $set: {
            customer_id: cid,
            country: country,
            city: city,
            address: address
          }
        },
        { new: true }
      );
      res.status(200).json(updatesAddress);
    } catch (err) {
      return sendError(res, 400, err.message);
    }
  } else {
    return sendError(res, 500, "Error in address ID");
  }
};

const findUserAddress = async (req, res) => {
  const cid = req.params.id;
  let userAddr;
  if (cid) {
    try {
      Address.findOne({ customer_id: cid }, function (err, docs) {
        if (err) {
        } else {
          userAddr = docs;
          if (userAddr !== null) {
            res.status(200).json(userAddr);
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

module.exports = {
  addAddress,
  findUserAddress,
  updateAddress
};
