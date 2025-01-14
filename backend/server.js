const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const path = require('path');
const app = express();

// Middleware
app.use(express.json());  // To parse incoming JSON request bodies
app.use(cors());          // To allow cross-origin requests

// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',   // Replace with your database host
    user: 'root',        // Your database username
    password: '',        // Your database password
    database: 'ExpenseDB', // Your database name
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to the MySQL database');
});

// Register route
app.post('/api/register', (req, res) => {
    const { fname, lname, username, email, phone, password } = req.body;

    // Validate input fields
    if (!fname || !lname || !username || !email || !phone || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    const checkUsernameQuery = 'SELECT * FROM userDetails WHERE username = ?';
    db.query(checkUsernameQuery, [username], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Database error', error: err });
        }

        if (results.length > 0) {
            return res.status(400).json({ message: 'Username already exists. Please choose another username.' });
        } 
    const checkPhoneQuery = 'SELECT * FROM userDetails WHERE phone = ? and email = ?';
    db.query(checkPhoneQuery, [phone, email], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Database error', error: err });
        }

        if (results.length > 0) {
            return res.status(400).json({ message: 'Account already exists. Please Login.' });
        }
    const query = `INSERT INTO userDetails (fname, lname, username, email, phone, password)
VALUES (?,?,?,?,?,?)`;
    db.query(query, [fname, lname, username, email, phone, password], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'insert error' });
        }
        res.status(201).json({ message: 'User registered successfully' });
    });
});
});
});
//login route
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;

    // Validate input fields
    if (!email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const query = 'SELECT * FROM userDetails WHERE email = ? AND password = ?';
    db.query(query, [email, password], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Database error', error: err });
        }

        if (results.length === 0) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        res.status(200).json({ message: 'Login successful' });
    });
});



// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../frontend/build')));

// The "catchall" handler: for any request that doesn't match one above, send back React's index.html file.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

// Start the server
const PORT = process.env.PORT || 3002; // Change the port number here
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});