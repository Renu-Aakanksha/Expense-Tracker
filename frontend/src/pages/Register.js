// src/pages/Register.js
import React, { useState } from 'react';

function Register(){
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [budget, setBudget] = useState(0);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!fname || !lname || !username || !email || !phone||  !password || !confirmPassword) {
        setError('All fields are required.');
        return;
        }

        if (password !== confirmPassword) {
        setError('Passwords do not match.');
        return;
        }

        // Clear previous error
        setError('');

        try {
        const response = await fetch('http://localhost:3000/api/register', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ fname, lname, username, email, phone, password}),
        });

        const data = await response.json();

        if (response.ok) {
            setSuccess(data.message);
            setFname('');
            setLname('');
            setUsername('');
            setEmail('');
            setPhone('');
            setPassword('');
            setConfirmPassword('');
            setBudget(10000);
        } else {
            setError(data.message || 'Registration failed.');
        }
        } catch (err) {
            console.error('Error:', err);
            setError('Server error.');
        }
    };

    return (
        <div style={styles.container}>
        <h1>Register</h1>
        {error && <p style={styles.error}>{error}</p>}
        {success && <p style={styles.success}>{success}</p>}
        <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.inputContainer}>
            <label htmlFor="fname">First Name</label>

            <input
                type="text"
                id="fname"
                value={fname}
                onChange={(e) => setFname(e.target.value)}
                style={styles.input}
                placeholder="Enter your First name"
            />
            <label htmlFor="lname">Last Name</label>
            <input
                type="text"
                id="lname"
                value={lname}
                onChange={(e) => setLname(e.target.value)}
                style={styles.input}
                placeholder="Enter your Last name"
            />
            <label htmlFor="username">Username</label>

            <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={styles.input}
                placeholder="Enter your username"
            />
            <label htmlFor="phone">Phone Number</label>
            <input
                type="text"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                style={styles.input}
                placeholder="Enter your phone Number" 
                />
            </div>
            <div style={styles.inputContainer}>
            <label htmlFor="email">Email</label>
            <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={styles.input}
                placeholder="Enter your email"
            />
            </div>
            <div style={styles.inputContainer}>
            <label htmlFor="password">Password</label>
            <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={styles.input}
                placeholder="Enter your password"
            />
            </div>
            <div style={styles.inputContainer}>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                style={styles.input}
                placeholder="Confirm your password"
            />
            </div>
            <button type="submit" style={styles.button}>Register</button>
        </form>
        </div>
    );
}

const styles = {
    container: {
        maxWidth: '400px',
        margin: '0 auto',
        padding: '20px',
        background: '#f4f4f4',
        borderRadius: '8px',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
    },
    inputContainer: {
        marginBottom: '15px',
    },
    input: {
        padding: '10px',
        width: '100%',
        marginTop: '5px',
        borderRadius: '4px',
        border: '1px solid #ccc',
    },
    button: {
        padding: '10px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '16px',
    },
    error: {
        color: 'red',
        fontSize: '14px',
        marginBottom: '10px',
    },
    success: {
        color: 'green',
        fontSize: '14px',
        marginBottom: '10px',
    },
    };

export default Register;
