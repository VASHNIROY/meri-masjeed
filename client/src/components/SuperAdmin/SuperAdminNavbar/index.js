import './index.css'


//import masjidLogo from "../../utils/masjidLogo-1.png";
import { BiSolidToggleRight } from "react-icons/bi";
import { BiSolidToggleLeft } from "react-icons/bi";
import { useState } from 'react';
import Cookies from 'js-cookie';
import SelectMasjid from '../../SelectMasjid';
import SingleMasjidTime from '../../SingleMasjidTime';
import { masjidLogo } from '../../utils/imageURL';

function SuperAdminNavbar() {

    const [toggle,setToggle] = useState(true)

    const url = process.env.REACT_APP_BASE_URL;
    const token = Cookies.get("superuser");
    console.log(url)
 
    const handleRightToggleClick = () => {
      // Define your API endpoint
      const apiUrl = `${url}turnofframzan`; // Replace this with your actual API endpoint

      console.log(apiUrl,"apiUrl")
      // Make a POST request to the API
      fetch(apiUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          console.log(response, "response");
          if (!response.ok) {
            throw new Error("Network response was not ok");
          } else {
            setToggle(false);
            
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          // Handle error if needed
        });
    };
    const handleLeftToggleClick = () => {
      // Define your API endpoint
      
      const apiUrl = `${url}turnonramzan`; // Replace this with your actual API endpoint

      // Make a POST request to the API
      fetch(apiUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          } else {
            setToggle(true);
            
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
