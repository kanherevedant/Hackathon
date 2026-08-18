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
        // Get all customers from MySQL
        const [customers] = await db.execute(
            "SELECT * FROM customers"
        );

        if (customers.length === 0) {
            return res.json({
                high_risk: 0,
                medium_risk: 0,
                low_risk: 0
            });
        }

        // Prepare data for FastAPI
        const customerData = customers.map(customer => {
            const data = { ...customer };

            // Churn is the actual result, so ML should not receive it
            delete data.Churn;

            return data;
        });

        // Send ALL customers in one request
        const response = await axios.post(
            "http://127.0.0.1:8000/predict-batch",
            customerData
        );

        const predictions = response.data.predictions;

        // Count risk levels
        let highRisk = 0;
        let mediumRisk = 0;
        let lowRisk = 0;

        predictions.forEach(customer => {

            if (customer.risk_level === "High") {
                highRisk++;
            }
            else if (customer.risk_level === "Medium") {
                mediumRisk++;
            }
            else if (customer.risk_level === "Low") {
                lowRisk++;
            }

        });

        res.json({
            total_customers: predictions.length,
            high_risk: highRisk,
            medium_risk: mediumRisk,
            low_risk: lowRisk
        });

    } catch (error) {

        console.error(
            "Risk distribution error:",
            error.response?.data || error.message
        );

        res.status(500).json({
            message: "Failed to calculate risk distribution",
            error: error.response?.data || error.message
        });
    }
};
const getSegmentDistribution = async (req, res) => {
    try {
        const [result] = await db.execute(`
            SELECT
                Customer_Segment AS segment,
                COUNT(*) AS total,
                SUM(Churn = 1) AS churned
            FROM customers
            GROUP BY Customer_Segment
            ORDER BY total DESC
        `);

        const segments = result.map(row => ({
            segment: row.segment,
            total: Number(row.total),
            churned: Number(row.churned),
            churn_rate:
                row.total > 0
                    ? Number(
                          ((row.churned / row.total) * 100).toFixed(2)
                      )
                    : 0
        }));

        res.json({
            segments
        });

    } catch (error) {
        console.error(
            "Segment distribution error:",
            error.message
        );

        res.status(500).json({
            message: "Failed to fetch segment distribution",
            error: error.message
        });
    }
};
module.exports = {
    getDashboardStats,
    getRiskDistribution,
    getSegmentDistribution
};