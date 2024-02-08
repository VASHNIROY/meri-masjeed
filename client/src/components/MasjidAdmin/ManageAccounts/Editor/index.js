import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import { ImCancelCircle } from 'react-icons/im';
import Cookies from 'js-cookie';

const NewEditor = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name:'',
    email: '',
    phonenumber: '',
    roleid: parseInt('0'),
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
      

  const handleSubmit = async () => {
    try {
      const response = await fetch(`http://localhost:3009/api/v1/addadminstaff`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        console.log('Data submitted successfully');
        // Handle success, e.g., show a success message to the us

        setFormData({
          name:'',
          email: '',
          phonenumber: '',
          roleid: parseInt('0'),
          comment: ''
        })

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
        <h1 className="neweditor-heading">Add New Editor</h1>
        <div className="container">
          <div className="row">
          <div className="col-md-3">
              <label htmlFor="inputEmail" className="form-label neweditor-label">
                Name:
              </label>
              <input
                type="text"
                className="form-control"
               
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
              />
            </div>
            <div className="col-md-3">
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

            <div className="col-md-3">
              <label htmlFor="inputPhoneNumber" className="form-label neweditor-label">
                Phone Number:
              </label>
              <input
                type="tel"
                className="form-control"
                id="inputPhoneNumber"
                name="phonenumber"
                value={formData.phonenumber}
                onChange={handleChange}
                placeholder="Enter your phone number"
              />
            </div>

            <div className="col-md-3">
              <label htmlFor="selectRole" className="form-label neweditor-label">
                Role:
              </label>
              <select
                className="form-control"
                id="selectRole"
                name="roleid"
                value={formData.roleid}
                onChange={handleChange}
              >
                <option value="0" className="neweditor-label">
                  Admin Editor
                </option>
                <option value="1" className="neweditor-label">
                  Message Editor
                </option>
                {/* Add more options as needed */}
              </select>
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
            <div style={{ display: 'flex', flexDirection: 'row-reverse', margin: '30px 0px' }}>
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

export default NewEditor;
