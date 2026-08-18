const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/db");

const login = async (req, res) => {
    try {
        console.log("BODY:", req.body);

        const { email, password } = req.body;

        const [users] = await db.execute(
            "SELECT * FROM users WHERE email = ?",
            [email]
        );

        console.log("USER COUNT:", users.length);

        if (users.length === 0) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const user = users[0];

        const passwordMatch = await bcrypt.compare(
            password,
            user.password
        );

        console.log("PASSWORD MATCH:", passwordMatch);

        if (!passwordMatch) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const token = jwt.sign(
            {
                id: user.id,
                email: user.email,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );

        res.json({
            message: "Login successful",
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        console.error("LOGIN ERROR:", error);

        res.status(500).json({
            message: "Server error"
        });
    }
};

const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Validate input
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Name, email and password are required"
            });
        }

        // Check if user already exists
        const [existingUsers] = await db.query(
            "SELECT id FROM users WHERE email = ?",
            [email]
        );

        if (existingUsers.length > 0) {
            return res.status(409).json({
                message: "User with this email already exists"
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const [result] = await db.query(
            `INSERT INTO users (name, email, password, role)
             VALUES (?, ?, ?, ?)`,
            [name, email, hashedPassword, "user"]
        );

        // Generate JWT
        const token = jwt.sign(
            {
                id: result.insertId,
                email: email,
                role: "user"
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "24h"
            }
        );

        res.status(201).json({
            message: "Signup successful",
            token,
            user: {
                id: result.insertId,
                name,
                email,
                role: "user"
            }
        });

    } catch (error) {
        console.error("Signup error:", error);

        res.status(500).json({
            message: "Server error"
        });
    }
};

module.exports = {
    login,
    signup
};