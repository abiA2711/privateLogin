import { useState } from 'react';
import { signup, verify } from './apiServices';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import bgraindrop from './assests/bg-rain-drop.webp';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import './App.css';
import { Link, useNavigate } from 'react-router-dom';

function SignupPage() {
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '']);
  const [snackbarSeverity, setSnackbarSeverity] = useState('error');
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const navigate=useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => {
      const updatedData = { ...prevData, [name]: value };

      if (name === 'confirmPassword') {
        if (updatedData.password !== updatedData.confirmPassword) {
          setErrorMessage('Password does not match');
          setSnackbarSeverity('error');
          setSnackbarOpen(true);
        } else {
          setErrorMessage('');
          setSnackbarOpen(false);
        }
      } else {
        setErrorMessage('');
        setSnackbarOpen(false);
      }

      return updatedData;
    });
  };

  const handleOtpChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex for basic email validation

    if (!formData.userName) {
      setErrorMessage('Please fill the User Name!');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }

    if (!formData.email) {
      setErrorMessage('Please fill the Email id!');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }

    if (!emailRegex.test(formData.email)) {
      setErrorMessage('Please enter a valid Email id!');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }

    if (!formData.password) {
      setErrorMessage('Please fill the password!');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }

    if (!formData.confirmPassword) {
      setErrorMessage('Please fill the confirm password!');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }

    // if (formData.password === formData.confirmPassword) {
    //   setShowOtp(true);
    // } else {
    //   setErrorMessage('Passwords do not match!');
    //   setSnackbarOpen(true);
    // }



    signup(formData.userName, formData.email, formData.password).then((res) => {
      console.log(res, 'response');

      setErrorMessage(res);
      setSnackbarSeverity('success');
      setSnackbarOpen(true)
      setShowOtp(true);

    }).catch((err) => {
      setErrorMessage(err.response.data);
      setSnackbarSeverity('error');
      setSnackbarOpen(true)
    })


  };

  const handleVerify = (e) => {
    e.preventDefault();
    const otpValue = otp.join('');
    if (otpValue.length < 4) {
      setErrorMessage('Please enter a valid 4-digit OTP');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }
    const payload = {
      username: formData.userName,
      email: formData.email,
      password: formData.password,
      otp: otpValue, 
    };
    
    verify(formData.userName,formData.email,formData.password,otpValue)
      .then((res) => {
        console.log('res', res);
        setErrorMessage(res.message);
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
        setShowOtp(false);
        setFormData({
          userName:'',
          email:'',
          password:'',
          confirmPassword:''
        })
        setOtp(['','','',''])
       navigate("/login")

      })
      .catch((error) => {
        // console.error('Verification failed:', err);
        setErrorMessage(error.response.data);
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
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
        <h2>Sign Up</h2>
        <input
          type="text"
          name="userName"
          placeholder="User Name"
          value={formData.userName}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <div className="password-container">
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
          <span className="eye-icon" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        <div className="password-container">
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          <span
            className="eye-icon"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        {showOtp ? (
          <div className="otp-container">
            {otp.map((value, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                className="otp-input"
                value={value}
                onChange={(e) => handleOtpChange(e.target.value, index)}
              />
            ))}
          </div>
        ) : null}

        <br />
        {!showOtp ? (
          <button
            type="submit"
            style={{ cursor: 'pointer', marginTop: 0 }}
            onClick={handleSubmit}
          >
            Submit
          </button>
        ) : (
          <button type="submit" style={{ cursor: 'pointer' }} onClick={handleVerify}>
            Verify
          </button>
        )}
        <p style={{marginTop:'3px'}}>
         Have an account? <Link to="/Login">Login</Link>
      </p>
      </div>
    </div>
  );
}

export default SignupPage;
  