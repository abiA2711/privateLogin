// LoginPage.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';  // For navigation
import { Login } from './apiServices';
import bgraindrop from './assests/bg-rain-drop.webp';
import { Alert, Snackbar } from '@mui/material';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import './App.css';


function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('error');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setErrorMessage('Please fill in all fields!');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }

    Login(email, password)
      .then((res) => {
        // Handle successful login (e.g., redirect or set user info in context)
        console.log('Login successful', res);
        localStorage.setItem('authToken', res.token);
        setErrorMessage(res.message);
        setSnackbarSeverity('success');
        setSnackbarOpen(true)
        navigate('/dashboard');
      })
      .catch((err) => {
        setErrorMessage(err.response.data);
        setSnackbarSeverity('error');
        setSnackbarOpen(true)

      });
  };
  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') return;
    setSnackbarOpen(false);
  };

  return (
    <div className="App">
       <Snackbar
  open={snackbarOpen}
  autoHideDuration={3000}
  onClose={handleCloseSnackbar}
  anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
>
  <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
    {errorMessage}
  </Alert>
</Snackbar>
          <img src={bgraindrop} className="imgbg" alt="Background" />
          <div className="signup-box">
          <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className='password-container'>
        <input
           type={showPassword ? 'text' : 'password'}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
         <span className="eye-icon" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
       
        <button type="submit">Login</button>
      </form>
      <p style={{marginTop:'3px'}}>
        Don't have an account? <Link to="/signup">Sign up</Link>
      </p>
          </div>
     
    </div>
  );
}

export default LoginPage;
