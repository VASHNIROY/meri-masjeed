import React, { useState } from 'react';
import ReCAPTCHA from "react-google-recaptcha";
import './index.css'
 
const AskQuestion = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });
 
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  const onChange = (value) => {
    console.log("Captcha value:", value);
  }
 
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data submitted:', formData);
  };
 
  return (
   <>
    <div className='support-form-main-container'>
      <form className='support-form-container' onSubmit={handleSubmit}>
        <div className='support-form-field'>
          <label className='support-form-lable'>Your Name*</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className='support-form-input'
          />
        </div>
        <div className='support-form-field'>
          <label className='support-form-lable'>Description*</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows='6'
            required
            className='support-form-input'
          ></textarea>
        </div>
        <ReCAPTCHA
        sitekey="6LczxVUpAAAAAKNRKpx6q6u5d6-XzLmJRvxcZTWM"
        onChange={onChange}
  />
        <div className='support-form-button-container'>
          <button className='app-container-button' type="submit" style={{marginTop:'10px'}}>Submit Your Query</button>
        </div>
      </form>
    </div>
   </>
  );
};
 
export default AskQuestion;