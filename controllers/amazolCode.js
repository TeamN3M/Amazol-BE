const Code = require("../models/amazolCode_model");

const sendError = (res, code, msg) => {
  return res.status(code).send({
    status: "fail",
    error: msg
  });
};

const getCode = async (req, res) => {
  try {
    code = await Code.find();
    res.status(200).send(code);
  } catch (err) {
    return sendError(res, 400, err.message);
  }
};

const AuthManager = async (req, res) => {
  const code = req.body.code;
  if (code == null) return sendError(res, 400, "no code");
  try {
    if (code != process.env.AmazolManagerCode) {
      return sendError(res, 400, "wrong code");
    }
  } catch (err) {
    return sendError(res, 400, err.message);
  }
};
module.exports = { getCode, AuthManager };
