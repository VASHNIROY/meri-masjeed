import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import { ImCancelCircle } from 'react-icons/im';
import Cookies from 'js-cookie';
import Toast from '../../../utils/Toast';

const EditButton = ({ onClose,user }) => {
  const [formData, setFormData] = useState({
    email: '',
    phoneNumber: '',
    comment: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCloseModel = () => {
    onClose();
  };

  const token = Cookies.get("user");

  const fetchData = async (
   
    ) => {
      const token = Cookies.get("user");
      
      console.log(token)
      
      const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        
      };
      const api = `http://localhost:3009/api/v1/getmessages`;
      try {
        const response = await fetch(api, options);
  
        if (!response.ok) {
          throw new Error(`Request failed with status: ${response.status}`);
        }
  
        const data = await response.json();
        Toast.fire({
          icon: "success",
          title: data.message,
        });
        console.log(data,"kapil");
        setFormData(data.data);
        console.log(data.data,"kkkkk")
      } catch (error) {
        
        console.error("Error fetching data:", error);
      }
    };
  
    useEffect(() => {
      fetchData();
    }, []);

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:3009/api/v1/editadminstaffmember', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        console.log('Data submitted successfully');
        // Handle success, e.g., show a success message to the user
      } else {
        console.error('Failed to submit data');
        // Handle failure, e.g., show an error message to the user
      }
    } catch (error) {
      console.error('Error occurred while submitting data:', error);
      // Handle error, e.g., show an error message to the user
    }
  };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <ImCancelCircle className="handle-close-icon" onClick={handleCloseModel} />
      </div>
      <div style={{ margin: '70px' }}>
        <h1 className="neweditor-heading">Editor</h1>
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <label htmlFor="inputEmail" className="form-label neweditor-label">
                Email:
              </label>
              <input
                type="email"
                className="form-control"
                id="inputEmail"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
              />
            </div>

            <div className="col-md-6">
              <label htmlFor="inputPhoneNumber" className="form-label neweditor-label">
                Phone Number:
              </label>
              <input
                type="tel"
                className="form-control"
                id="inputPhoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="Enter your phone number"
              />
            </div>

            <div className="col-md-12 mt-3">
              <label htmlFor="commentBox" className="form-label">
                Comment:
              </label>
              <textarea
                className="form-control"
                id="commentBox"
                name="comment"
                value={formData.comment}
                onChange={handleChange}
                rows="6"
                placeholder="Enter your comment"
              ></textarea>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', margin: '30px 0px' }}>
              <button className="btn btn-outline-info">Resend account confirmation email</button>
              <button className="btn btn-info" style={{ color: 'white' }} onClick={handleSubmit}>
                Add Editor
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditButton;
