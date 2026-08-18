const express = require("express");
const cors = require("cors");
require("dotenv").config();

const db = require("./config/db");
const customerRoutes = require("./routes/customerRoutes");
const predictionRoutes = require("./routes/predictionRoutes");
const customerPredictionRoutes = require("./routes/customerPredictionRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "Customer Retention Backend is running"
    });
});

app.get("/api/db-test", async (req, res) => {
    try {
        const [rows] = await db.query("SELECT 1 AS result");

        res.json({
            message: "MySQL connected successfully",
            result: rows[0].result
        });

    } catch (error) {
        console.error("Database Error:", error.message);

        res.status(500).json({
            message: "Database connection failed"
        });
    }
});

app.use("/api/customers", customerRoutes);
app.use("/api/predict", predictionRoutes);
app.use("/api/customers", customerPredictionRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});