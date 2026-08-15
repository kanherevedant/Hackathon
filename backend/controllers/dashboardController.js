const db = require("../config/db");
const axios = require("axios");

const getDashboardStats = async (req, res) => {
    try {
        // Total customers
        const [totalResult] = await db.execute(
            "SELECT COUNT(*) AS total_customers FROM customers"
        );

        // Churned customers
        const [churnResult] = await db.execute(
            "SELECT COUNT(*) AS churned_customers FROM customers WHERE Churn = 1"
        );

        // Retained customers
        const [retainedResult] = await db.execute(
            "SELECT COUNT(*) AS retained_customers FROM customers WHERE Churn = 0"
        );

        // Churn rate
        const totalCustomers = totalResult[0].total_customers;
        const churnedCustomers = churnResult[0].churned_customers;
        const retainedCustomers = retainedResult[0].retained_customers;

        const churnRate =
            totalCustomers > 0
                ? (churnedCustomers / totalCustomers) * 100
                : 0;

        res.json({
            total_customers: totalCustomers,
            churned_customers: churnedCustomers,
            retained_customers: retainedCustomers,
            churn_rate: Number(churnRate.toFixed(2))
        });

    } catch (error) {
        console.error("Dashboard error:", error);

        res.status(500).json({
            message: "Failed to fetch dashboard statistics",
            error: error.message
        });
    }
};

const getRiskDistribution = async (req, res) => {
    try {
        const [customers] = await db.execute(
            "SELECT * FROM customers"
        );

        let high = 0;
        let medium = 0;
        let low = 0;

        for (const customer of customers) {

            const customerData = { ...customer };

            delete customerData.Churn;

            const response = await axios.post(
                "http://127.0.0.1:8000/predict",
                customerData
            );

            const riskLevel = response.data.risk_level;

            if (riskLevel === "High") {
                high++;
            } else if (riskLevel === "Medium") {
                medium++;
            } else if (riskLevel === "Low") {
                low++;
            }
        }

        res.json({
            high_risk: high,
            medium_risk: medium,
            low_risk: low
        });

    } catch (error) {
        console.error("Risk distribution error:", error.message);

        res.status(500).json({
            message: "Failed to calculate risk distribution",
            error: error.message
        });
    }
};

module.exports = {
    getDashboardStats,
    getRiskDistribution
};