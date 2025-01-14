
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../view/login.css';


function Login(){
    
    const navigate = useNavigate(); 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
 

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            setError('All fields are required.');
            return;
        }
        try {
        
        const response = await fetch('http://localhost:3002/api/login', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email,  password}),
        });

        const data = await response.json();

        if (response.ok) {
            navigate('/AddExpenseForm');
            
          
        } else {
            setError(data.message || 'Login failed.');
        }
        } catch (err) {
            console.error('Login Error:', err);
            setError('Server down login page error.');
        }
    };

    return (
        <div style={styles.container}>
        <h1>Login</h1>
        {error && <p style={styles.error}>{error}</p>}
        {success && <p style={styles.success}>{success}</p>}
        <form onSubmit={handleSubmit} style={styles.form}>
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
          
            <button type="submit" style={styles.button}>Login</button>
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

export default Login;
