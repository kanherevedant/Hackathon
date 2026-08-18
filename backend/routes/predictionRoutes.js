const express = require("express");
const authenticateToken = require("../middleware/authMiddleware");
const router = express.Router();

const {
    predictCustomer
} = require("../controllers/predictionController");

router.post("/", authenticateToken, predictCustomer);

module.exports = router;