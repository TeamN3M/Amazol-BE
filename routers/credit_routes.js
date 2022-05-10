const express = require("express");
const router = express.Router();
const credit = require("../controllers/credit");
const { authenticate } = require("../common/auth_middleware");

router.post("/", authenticate, credit.addCredit);
router.get("/getCredit/:id", authenticate, credit.findUserCredit);
router.put("/updateCredit", authenticate, credit.updateCredit);

module.exports = router;
