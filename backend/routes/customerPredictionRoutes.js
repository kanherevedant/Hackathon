const express = require("express");

const router = express.Router();

const {
    predictCustomerById
} = require("../controllers/predictionController");

router.post("/:id/predict", predictCustomerById);

module.exports = router;