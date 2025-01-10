const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();

// Middleware
app.use(express.json());  // To parse incoming JSON request bodies
app.use(cors());          // To allow cross-origin requests

// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',   // Replace with your database host
    user: 'root',        // Your database username
    password: '',        // Your database password
    database: 'expenseDB', // Your database name
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to the MySQL database');
});

// Register route
app.post('/api/Register', (req, res) => {
    const { fname, lname, username, email, phone, password } = req.body;

    // Validate input fields
    if (!fname || !lname || !username || !email || !phone || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const query = `INSERT INTO users (fname, lname, username, email, phone, password, budget) VALUES (?, ?, ?, ?, ?, ?, 0)`;
    db.query(query, [fname, lname, username, email, phone, password], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Database error', error: err });
        }
        res.status(201).json({ message: 'User registered successfully', userId: result.insertId });
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
