const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const authHeader = req.headers.token;
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.status(401).send();

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
    if (err) {
      return res.status(403).send("Error found in token");
    }
    req.user = data;
    next();
  });
};
const verifyTokenAuth = (req, res, next) => {
  authenticate(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("Un-Auth");
    }
  });
};

module.exports = { authenticate, verifyTokenAuth };
