import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
 
const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
 
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
 
  const handleSubmit = (e) => {
    e.preventDefault();
    sendResetLink();
  };

  const navigate = useNavigate()
 
  const sendResetLink = () => {
    fetch('http://localhost:3009/api/v1/forgetpassword', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          navigate("/otpverification")
          setMessage('Password reset link sent to your email.');
        } else {
          setMessage('Failed to send reset link. Please check your email and try again.');
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };
 
  return (
    <div className='masid-singin-main-container'>
      <div className='masid-signin-container'>
        <h2 className='masid-signin-heading'>Control Panel</h2>
        <h3 className='masid-singin-sub-heading'>RECOVERD PASSWORD</h3>
        <p style={{color:'#bcc3d3'}}>Enter your Email and instructions will be sent to you!</p>
        <form className='masid-signin-form' onSubmit={handleSubmit}>
          <div className='masid-form-field'>
            <label className='app-para-text'>Email*</label>
            <input
              type="email"
              placeholder='Email'
              value={email}
              onChange={handleEmailChange}
              className='masid-form-input'
              required
            />
          </div>
          <div>
            <Link to={'/login'}  style={{textDecoration:'none',color:'#1e88e5',fontSize:'14px'}}>
            <p> Already have an account! Log In</p>
            </Link>
          </div>
          <div className=''>
            <button className='app-container-button' type="submit">Send OTP</button>
          </div>
        </form>
      </div>
      <div className='masid-singin-image-container'>
        <img className='masid-singin-image' src='https://time.my-masjid.com/assets/img/login-bg.png' alt='' />
      </div>
    </div>
  );
};
 
export default ForgotPassword;