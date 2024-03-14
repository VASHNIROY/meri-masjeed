import './index.css'


import masjidLogo from "../../utils/masjidLogo-1.png";
import { BiSolidToggleRight } from "react-icons/bi";
import { BiSolidToggleLeft } from "react-icons/bi";
import { useState } from 'react';

function SuperAdminNavbar() {

    const [toggle,setToggle] = useState(true)

    const url = process.env.REACT_APP_BASE_URL;
 
    const handleRightToggleClick = () => {
      // Define your API endpoint
      const apiUrl = `${url}getmasjeeddetails`; // Replace this with your actual API endpoint

      // Make a POST request to the API
      fetch(apiUrl, {
        method: "POST",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }else{
            setToggle(!toggle)
          }
          
        })
        .catch((error) => {
          console.error("Error:", error);
          // Handle error if needed
        });
    };
    const handleLeftToggleClick = () => {
      // Define your API endpoint
      
      const apiUrl = `${url}getmasjeeddetails`; // Replace this with your actual API endpoint

      // Make a POST request to the API
      fetch(apiUrl, {
        method: "POST",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          } else {
            setToggle(!toggle);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          // Handle error if needed
        });
    };


  return (
    <div className="admin-navbar-main-container">
      <div className="admin-navbar-sub-container">
        <div className="navbar-company-logo-container">
          <img src={masjidLogo} alt="logo" className="navbar-company-logo" />
        </div>
        <div className="super-admin-toggle-container">
          <p className="super-admin-ramzan-timing-text">Ramzan Timings:</p>
          {toggle ? (
            <BiSolidToggleRight
              className="right-toggle"
              onClick={handleRightToggleClick}
            />
          ) : (
            <BiSolidToggleLeft
              className="left-toggle"
              onClick={handleLeftToggleClick}
            />
          )}
        </div>
      </div>
    </div>
  );
}
export default SuperAdminNavbar;
