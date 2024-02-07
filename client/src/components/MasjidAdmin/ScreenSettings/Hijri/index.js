import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
 
 
const Hijri = () => {
return(
<>
<div class="container">
  <div class="row">
    <div class="col-md-6"></div>
<div className='hijri-container'>
    <h1 className='hijri-heading'>Hijri Date</h1>
    <p className='hijri-para'>Set Hijir calender offset</p>
    <select id="hijri-date" name="date" className="form-control">
  <option value="offset" className='hijri-option'>Dont add offset</option>
  <option value="add-1" className='hijri-option'>Add one day to hijri date</option>
  <option value="add-2" className='hijri-option'>Add 2 days to hijri date</option>
  <option value="minus-1" className='hijri-option'>Minus one day from hijri date</option>
  <option value="minus-2" className='hijri-option'>Minus 2 days from hijri date</option>
</select>
<div style={{display: "flex", flexDirection: "row-reverse" , margin: "30px 30px" }}>
    <button className='btn btn-info' style={{color: "white"}}>Save</button>
</div>
</div>
</div>
</div>
 
</>
    )}
 
export default Hijri