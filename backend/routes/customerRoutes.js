const express = require("express");
const authenticateToken = require("../middleware/authMiddleware");
const router = express.Router();

const {
    getCustomers,
    getCustomerById,
    getCustomerRisk
} = require("../controllers/customerController");

router.get("/", authenticateToken,getCustomers);

router.get("/:id/risk", getCustomerRisk);

router.get("/:id", getCustomerById);

module.exports = router;