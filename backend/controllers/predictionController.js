const db = require("../config/db");
const axios = require("axios");

const predictCustomerById = async (req, res) => {
    try {
        const { id } = req.params;

        // Get customer from MySQL
        const [rows] = await db.execute(
            "SELECT * FROM customers WHERE Customer_ID = ?",
            [id]
        );

        if (rows.length === 0) {
            return res.status(404).json({
                message: "Customer not found"
            });
        }

        const customer = rows[0];

        // Remove fields that ML should not receive
        const customerData = { ...customer };

        delete customerData.Customer_ID;
        delete customerData.Churn;

        // Send customer data to FastAPI
        const response = await axios.post(
            "http://127.0.0.1:8000/predict",
            {
                Customer_ID: customer.Customer_ID,
                ...customerData
            }
        );

        res.json(response.data);

    } catch (error) {
        console.error("Prediction error:", error.message);

        res.status(500).json({
            message: "Failed to predict customer churn",
            error: error.response?.data || error.message
        });
    }
};

const predictCustomer = async (req, res) => {
    try {
        console.log("Request body received by Express:");
        console.log(req.body);

        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({
                message: "No customer data received by Express"
            });
        }

        const response = await axios({
            method: "POST",
            url: "http://127.0.0.1:8000/predict",
            headers: {
                "Content-Type": "application/json"
            },
            data: JSON.stringify(req.body)
        });

        console.log("FastAPI response:");
        console.log(response.data);

        res.json(response.data);

    } catch (error) {
        console.error("ML Service Error:", error.message);

        if (error.response) {
            console.error("Status:", error.response.status);
            console.error("Response:", error.response.data);
        }

        res.status(500).json({
            message: "Failed to get prediction from ML service",
            error: error.response?.data || error.message
        });
    }
};

module.exports = {
    predictCustomer,
    predictCustomerById
};