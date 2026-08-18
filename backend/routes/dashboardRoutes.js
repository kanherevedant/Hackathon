const express = require("express");
const authenticateToken = require("../middleware/authMiddleware");

const router = express.Router();

const {
    getDashboardStats,
    getRiskDistribution,
    getSegmentDistribution
} = require("../controllers/dashboardController");

router.get(
    "/stats",
    authenticateToken,
    getDashboardStats
);

router.get(
    "/risk-distribution",
    authenticateToken,
    getRiskDistribution
);

router.get(
    "/segment-distribution",
    authenticateToken,
    getSegmentDistribution
);

module.exports = router;