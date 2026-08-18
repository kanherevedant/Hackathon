const db = require("../config/db");
const axios = require("axios");

const getCustomers = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;

        const search = req.query.search?.trim() || "";
        const churn = req.query.churn;
        const segment = req.query.segment?.trim() || "";
        const loyalty = req.query.loyalty?.trim() || "";

        const safeLimit = Math.min(Math.max(limit, 1), 100);
        const safePage = Math.max(page, 1);

        const offset = (safePage - 1) * safeLimit;

        let conditions = [];
        let queryParams = [];

        // Search by Customer ID
        if (search) {
            conditions.push("Customer_ID LIKE ?");
            queryParams.push(`%${search}%`);
        }

        // Filter by churn
        if (churn === "0" || churn === "1") {
            conditions.push("Churn = ?");
            queryParams.push(churn);
        }

        // Filter by customer segment
        if (segment) {
            conditions.push("Customer_Segment = ?");
            queryParams.push(segment);
        }

        // Filter by loyalty membership
        if (loyalty === "Yes" || loyalty === "No") {
            conditions.push("Loyalty_Member = ?");
            queryParams.push(loyalty);
        }

        const whereClause =
            conditions.length > 0
                ? `WHERE ${conditions.join(" AND ")}`
                : "";

        // Count filtered customers
        const [countResult] = await db.execute(
            `SELECT COUNT(*) AS total
             FROM customers
             ${whereClause}`,
            queryParams
        );

        const totalCustomers = countResult[0].total;

        // Get customers
        const [customers] = await db.execute(
            `SELECT
                Customer_ID,
                Age,
                Gender,
                City_Tier,
                Employment_Type,
                Customer_Segment,
                Product_Type,
                Loyalty_Member,
                Satisfaction_Score,
                Last_Login_Days_Ago,
                Complaints,
                Customer_Support_Calls,
                Churn
             FROM customers
             ${whereClause}
             ORDER BY Customer_ID
             LIMIT ${safeLimit} OFFSET ${offset}`,
            queryParams
        );

        res.json({
            page: safePage,
            limit: safeLimit,

            filters: {
                search: search || null,
                churn: churn ?? null,
                segment: segment || null,
                loyalty: loyalty || null
            },

            total_customers: totalCustomers,
            total_pages: Math.ceil(totalCustomers / safeLimit),

            customers: customers
        });

    } catch (error) {

        console.error(
            "Customer listing error:",
            error.message
        );

        res.status(500).json({
            message: "Failed to fetch customers",
            error: error.message
        });
    }
};

const getCustomerById = async (req, res) => {
    try {
        const { id } = req.params;

        const [customers] = await db.execute(
            "SELECT * FROM customers WHERE Customer_ID = ?",
            [id]
        );

        if (customers.length === 0) {
            return res.status(404).json({
                message: "Customer not found"
            });
        }

        res.json(customers[0]);

    } catch (error) {
        console.error("Customer detail error:", error.message);

        res.status(500).json({
            message: "Failed to fetch customer",
            error: error.message
        });
    }
};

const getCustomerRisk = async (req, res) => {
    try {
        const { id } = req.params;

        // Get customer from MySQL
        const [customers] = await db.execute(
            "SELECT * FROM customers WHERE Customer_ID = ?",
            [id]
        );

        if (customers.length === 0) {
            return res.status(404).json({
                message: "Customer not found"
            });
        }

        const customer = customers[0];

        // Send customer to FastAPI
        const response = await axios.post(
            "http://127.0.0.1:8000/predict",
            customer
        );

        res.json({
            customer: customer,
            prediction: response.data
        });

    } catch (error) {

        console.error(
            "Customer risk error:",
            error.response?.data || error.message
        );

        res.status(500).json({
            message: "Failed to analyze customer risk",
            error: error.response?.data || error.message
        });
    }
};

module.exports = {
    getCustomers,
    getCustomerById,
    getCustomerRisk
};