import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import CustomizedSwitches from '../Home';
 
const Screen = () => {
    return(
<>
<div style={{display:'flex',alignItems:'center', justifyContent:'center', margin:'100px'}}>
<div className='screen-whole-container'>
<div style={{margin: "20px 0px 50px 50px"}}>
    <h1 className='screen-heading'>Screen Settings</h1>
    <p className='screen-para'>Set your screen settings</p>
</div>
<div>
    <ul className='screen-list-items'>
        <div style={{display: 'flex', flexDirection: "row"}}>
        <CustomizedSwitches/>
        <li>Observe day light saving time</li>
        </div>
        <div style={{display: 'flex', flexDirection: "row"}}>
        <CustomizedSwitches/>
        <li>Observe day light saving time</li>
        </div>
        <div style={{display: 'flex', flexDirection: "row"}}>
        <CustomizedSwitches/>
        <li>Show Jumah time</li>
        </div>
        <div style={{display: 'flex', flexDirection: "row"}}>
        <CustomizedSwitches/>
        <li>Make Jumah time equal to Friday Zuhr time</li>
        </div>
        <div style={{display: 'flex', flexDirection: "row"}}>
        <CustomizedSwitches/>
        <li>Show tomorrow times as Iqamah time and not Adhan time</li>
        </div>
        <div style={{display: 'flex', flexDirection: "row"}}>
        <CustomizedSwitches/>
        <li>Specify Iqamah for each salah (Iqamah can be set for each salah in salah Timings tab)</li>
        </div>
        <div style={{display: 'flex', flexDirection: "row"}}>
        <CustomizedSwitches/>
        <li>Show Iqamah minutes as time</li>
        </div>
        <div style={{display: 'flex', flexDirection: "row"}}>
        <CustomizedSwitches/>
        <li>Display time in 12 hours format</li>
        </div>
        <div style={{display: 'flex', flexDirection: "row"}}>
        <CustomizedSwitches/>
        <li>Display salah markers</li>
        </div>
        <div style={{display: 'flex', flexDirection: "row"}}>
        <CustomizedSwitches/>
        <li>Show Hijri date</li>
        </div>
        <div style={{display: 'flex', flexDirection: "row"}}>
        <CustomizedSwitches/>
        <li>Play turn off mobile sound before Adhan and Iqamah</li>
        </div>
        <div style={{display: 'flex', flexDirection: "row"}}>
        <CustomizedSwitches/>
        <li>Enable multiple salah timings</li>
        </div>
    </ul>
</div>
<div style={{display: "flex", flexDirection: "row-reverse" , margin: "30px 30px" }}>
    <button className='btn btn-info' style={{color: "white"}}>Save</button>
    </div>
    </div>
    </div>
</>
    )
}
export default Screen;