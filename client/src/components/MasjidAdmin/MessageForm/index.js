import React, { useState } from 'react';
import { PiToggleRightFill } from "react-icons/pi";
import { PiToggleLeftFill } from "react-icons/pi";
import './index.css'

import Cookies from 'js-cookie';
 
import { ImCancelCircle } from "react-icons/im";
import Toast from '../../utils/Toast';

const MessageForm = ({onClose,fetchMessage}) => {
  const [formData, setFormData] = useState({
    title: '',
    type: 'text',
    expirydate: '',
    startdate: '',
    enddate: '',
    description: '',
    status:1
  });
 
  const [showContent,setShowContent] = useState(false)
 
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const token = Cookies.get("user")
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("called...");
    const form = new FormData();
    form.append("title", formData.title);
    form.append("type",formData.type);
    form.append("description",formData.description)
    form.append("expirydate",formData.expirydate);
    form.append("startdate",formData.startdate);
    form.append("enddate",formData.enddate)
    form.append("status",formData.status)
   

    console.log(form, "formData");

    try {
      const response = await fetch("http://localhost:3009/api/v1/addmessage", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },         
        body: form,
      });

      if (response.ok) {
        console.log("Message Sent successfully!");
        setFormData({
          title: '',
          type: 'text',
          expirydate: '',
          startdate: '',
          enddate: '',
          description: '',
        });
        fetchMessage()
        onClose()
        const data = await response.json();
        Toast.fire({
          icon: "success",
          title: data.message,
        });
       
      } else {
        console.error(
          "Failed to submit message:",
          response.status,
          response.statusText
        );
        const data = await response.json();
        Toast.fire({
          icon: "error",
          title: data.message,
        });
      }
    } catch (error) {
      console.error("Error sending message:", error.message);
    }
  };

  const onToggleClick = () => {
    setShowContent(!showContent);
  };

 


  const handleCloseModel=()=>{
    onClose()
  }

  return (
    <>
    <div style={{display:"flex",justifyContent:"flex-end"}}>
      <ImCancelCircle className= "handle-close-icon" onClick={handleCloseModel}/>
      </div>
    <div className='masjid-message-whole-container'>
    <form className='masjid-message-form-container' onSubmit={handleSubmit}>
    <h1 className='app-para-heading' style={{textAlign:'left', padding:'20px'}}>Add new message </h1>
        <div className='masjid-message-sub-contaner '>
        <div className='masjid-message-field-container'>
      <label className='masjid-message-lable'>
      Title
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          className='masjid-message-input'
        />
      </label>
      </div>
      <div className='masjid-message-field-container'>
 
      <label className='masjid-message-lable'>
      Select type
        <select
        name="type"
         value={formData.type}
          onChange={handleInputChange}
          className='masjid-message-input'
          >
          <option value="text">Text</option>
          <option value="image">Image</option>
          <option value="audio">Audio</option>
        </select>
      </label>
      </div>
      <div className='masjid-message-field-container'>
      <label className='masjid-message-lable'>
      Expiry Date
        <input
          type="datetime-local"
          name="expirydate"
          value={formData.expireDate}
          onChange={handleInputChange}
          className='masjid-message-input'
        />
      </label>
      </div>
      </div>
      <div className='masjid-message-sub-contaner'>
    {showContent ? <PiToggleRightFill onClick={onToggleClick} className='masjid-toggle-right-icon'/>:<PiToggleLeftFill className='masjid-toggle-left-icon' onClick={onToggleClick}/>}
    {showContent ?
    <>
    <div className='masjid-message-field-container'>
      <label className='masjid-message-lable'>
      Event Start Date
        <input
          type="datetime-local"
          name="startdate"
          value={formData.expireDate}
          onChange={handleInputChange}
          className='masjid-message-input'
        />
      </label>
      </div>
      <div className='masjid-message-field-container'>
      <label className='masjid-message-lable'>
      Event End Date
        <input
          type="datetime-local"
          name="enddate"
          value={formData.expireDate}
          onChange={handleInputChange}
          className='masjid-message-input'
        />
      </label>
      </div>
      </>:""
      }
     
      </div>
      {formData.type==="image" && <div className='masjid-message-field-container'>
            <label className='masjid-message-lable'>
              Upload Image
              <input
                type='file'
                name='description'
                onChange={handleInputChange}
                accept='image/*'
                className='masjid-message-input'
              />
            </label>
          </div>}
          {formData.type==="audio" && <div className='masjid-message-field-container'>
            <label className='masjid-message-lable'>
              Upload Audio
              <input
                type='file'
                name='description'
                onChange={handleInputChange}
                accept='audio/*'
                className='masjid-message-input'
              />
            </label>
          </div>}
          {formData.type==="text" && <div className='masjid-message-field-container'>
      <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows='12'
            placeholder='Enter Message'
            required
            className='masjid-message-input'
          ></textarea>
      </div>}
      <div className='masjid-message-button-container'>
      <button className='masjid-message-button' type="submit">Add</button>
      </div>
    </form>
    </div>
    </>
  );
};
 
export default MessageForm;