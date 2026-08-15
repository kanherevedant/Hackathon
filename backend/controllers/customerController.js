const db = require("../config/db");

const getCustomers = async (req, res) => {
    try {
        const [rows] = await db.query(
            "SELECT * FROM customers LIMIT 100"
        );

        res.json(rows);

    } catch (error) {
        console.error("Database Error:", error.message);

        res.status(500).json({
            message: "Failed to fetch customers"
        });
    }
};

const getCustomerById = async (req, res) => {
    try {
        const { id } = req.params;

        const [rows] = await db.query(
            "SELECT * FROM customers WHERE Customer_ID = ?",
            [id]
        );

        if (rows.length === 0) {
            return res.status(404).json({
                message: "Customer not found"
            });
        }

        res.json(rows[0]);

    } catch (error) {
        console.error("Database Error:", error.message);

        res.status(500).json({
            message: "Failed to fetch customer"
        });
    }
};

module.exports = {
    getCustomers,
    getCustomerById
};