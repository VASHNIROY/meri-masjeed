import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import { ImCancelCircle } from 'react-icons/im';
 
 
const EditButton = ({onClose}) => {


  const handleCloseModel=()=>{
    onClose()
  }

    return(
<>
<div style={{display:"flex",justifyContent:"flex-end"}}>
      <ImCancelCircle className= "handle-close-icon" onClick={handleCloseModel}/>
      </div>
<div style={{margin: '70px'}}>
<h1 className='neweditor-heading'>Editor</h1>
<div className="container">
      <div className="row">
        <div className="col-md-6">
          <label htmlFor="inputEmail" className="form-label neweditor-label">Email:</label>
          <input type="email" className="form-control" id="inputEmail" placeholder="Enter your email" />
        </div>
 
        <div className="col-md-6">
          <label htmlFor="inputPhoneNumber" className="form-label neweditor-label">Phone Number:</label>
          <input type="tel" className="form-control" id="inputPhoneNumber" placeholder="Enter your phone number" />
        </div>
 
        {/* <div className="col-md-4">
          <label htmlFor="selectRole" className="form-label neweditor-label">Role:</label>
          <select className="form-control" id="selectRole">
            <option value="admin" className='neweditor-label'>Admin Editor</option>
            <option value="message" className='neweditor-label'>Message Editor</option>
           
           
          </select>
        </div>   */}
        <div className="col-md-12 mt-3">
          <label htmlFor="commentBox" className="form-label">Comment:</label>
          <textarea className="form-control" id="commentBox" rows="6" placeholder="Enter your comment"></textarea>
        </div>
        <div style={{display: "flex", justifyContent:"space-between" , margin: "30px 0px" }}>
            <button className='btn btn-outline-info' >Resend account confirmation email</button>
            <button className='btn btn-info' style={{color: "white"}}>Add Editor</button>
        </div>
      </div>
</div>
</div>
</>
    )
}
 
export default EditButton;