const express = require("express");

const router = express.Router();

const {
    predictCustomer
} = require("../controllers/predictionController");

router.post("/", predictCustomer);

module.exports = router;