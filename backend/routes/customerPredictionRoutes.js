const express = require("express");
const authenticateToken = require("../middleware/authMiddleware");
const router = express.Router();

const {
    predictCustomerById
} = require("../controllers/predictionController");

router.post("/:id/predict", authenticateToken, predictCustomerById);

module.exports = router;