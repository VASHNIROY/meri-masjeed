import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Toast from '../utils/Toast';
import './index.css'

const MasjidLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
 
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
 
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const navigate = useNavigate()
 
  const handleSubmit = async (e) => {
    e.preventDefault();
 
    try {
      const response = await fetch('http://localhost:3009/api/v1/adminlogin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
 
      if (response.ok) {
        const data = await response.json();
        const token = data.jwt_token 

        Cookies.set("user",token)
        Toast.fire({
            icon: "success",
            title: data.message,
          });

        navigate("/admin")
      } else {
        const data = await response.json();
        Toast.fire({
            icon: "error",
            title: data.message,
          });
        
        setError('Invalid email or password');
      }
    } catch (err) {
      console.error('Error during sign-in:', err);
      setError('An error occurred during sign-in');
    }
  };
 
  return (
    <div className='masid-singin-main-container'>
    <div className='masid-signin-container'>
      <h2 className='masid-signin-heading'>Control Panel</h2>
      <h1 className='masid-singin-sub-heading'>Sign In</h1>
      <form className='masid-singin-form' onSubmit={handleSubmit}>
        <div className='masid-login-form-field'>
          <label className='app-para-text'>Email*</label>
          <input
          type="email"
          placeholder='Email'
          value={email}
          onChange={handleEmailChange}
          className='masid-login-form-input'
          required />
        </div>
       <div className='masid-login-form-field'>
          <label className='app-para-text'>Password*</label>
          <input
          type="password"
          value={password}
          placeholder='Password'
          onChange={handlePasswordChange}
          className='masid-login-form-input'
          required />
        </div>
        <div>
        <Link to={'/forgotpassword'} style={{textDecoration:'none',color:'#1e88e5',fontSize:'14px'}}>
            <p >Forgot Password</p>
            </Link>
        </div>
        <div className=''>
          <button className='app-container-button' type="submit">LOG IN</button>
        </div>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
    <div className='masid-singin-image-container'>
        <img className='masid-singin-image' src='https://time.my-masjid.com/assets/img/login-bg.png' alt='' />
    </div>
    </div>  
  );
};
 
export default MasjidLogin;