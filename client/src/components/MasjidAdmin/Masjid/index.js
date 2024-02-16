// import React, { useState } from 'react';
// import './index.css';
// import logo from '../../utils/masjidImage.png';
// import 'bootstrap/dist/css/bootstrap.min.css';

//         const MosqueForm = () => {
//           const [formData, setFormData] = useState({
//             name: '',
//             address: '',
//             zipCode: '',
//             city: '',
//             country: '',
//             latitude: '',
//             longitude: '',
//             primaryLanguage: '',
//             secondaryLanguage: '',
//             masjidNamePrimary: '',
//             masjidNameSecondary: '',
//             subTitle: '',
//             adminNotes: '',
//           });

//           const handleChange = (e) => {
//             setFormData({
//               ...formData,
//               [e.target.name]: e.target.value,
//             });
//           };

//           return (
//             <div className="mosque-form-container">
//                 <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
//             <div>
//                 <h1 className='first-part-heading'>Edit Masjid</h1>
//             </div>
//             <div className='first-masjid-part-two'>
//                 <p className='first-part-timing'>Timing screen</p>
//                 <p className='first-part-info'>info screen</p>
//                 <p className='first-part-timing-info'>Timing info screen</p>
//                 <p className='first-part-salah'>Multiple salah screen</p>
//                 <p className='first-part-share'>Share screen</p>
//             </div>
//         </div>
//         <div className='first-masjid-part-one' style={{margin:"70px 0px 70px 0px"}}>
//         <div >
//               <div className="form-row-single">
//                 <label >
//                   Name:
//                   <input className='form-control dashboard-input-textarea form-row-single' style={{backgroundColor:"#e9ecef"}} type="text" name="name" value={formData.name} onChange={handleChange} />
//                 </label>

//               </div>
//               <div className="form-row">
//               <label>
//                   Address:
//                   <input type="text" className='form-control-double dashboard-input-textarea' name="address" value={formData.address} onChange={handleChange} />
//                 </label>
//                 <label>
//                   Zip Code:
//                   <input type="text" className='form-control-double dashboard-input-textarea' name="zipCode" value={formData.zipCode} onChange={handleChange} />
//                 </label>
//                 {/* <label>
//                   City:
//                   <input type="text" name="city" value={formData.city} onChange={handleChange} />
//                 </label> */}
//               </div>
//               </div>
//               <div>
//                 <img className='first-part-image' alt="image1" src={logo}/>
//               </div>
//               </div>
//               <div className="form-row">
//               <label>
//                   City:
//                   <input  className='form-control-double dashboard-input-textarea' type="text" name="city" style={{backgroundColor:"#e9ecef"}} value={formData.city} onChange={handleChange} />
//                 </label>
//                 <label>
//                   Country:
//                   <input className='form-control-double dashboard-input-textarea' type="text" name="country" style={{backgroundColor:"#e9ecef"}} value={formData.country} onChange={handleChange} />
//                 </label>

//               </div>
//               <div className="form-row">
//               <label>
//                   Latitude:
//                   <input className='form-control-double dashboard-input-textarea' type="text" name="latitude" value={formData.latitude} onChange={handleChange} />
//                 </label>
//                 <label>
//                   Longitude:
//                   <input className='form-control-double dashboard-input-textarea' type="text" name="longitude" value={formData.longitude} onChange={handleChange} />
//                 </label>

//               </div>
//               <div className="form-row">
//               <label>
//                   Primary Language:
//                   <input
//                   className='form-control-double dashboard-input-textarea'
//                     type="text"
//                     name="primaryLanguage"
//                     value={formData.primaryLanguage}
//                     onChange={handleChange}
//                   />
//                 </label>
//                 <label>
//                   Secondary Language:
//                   <input
//                   className='form-control-double dashboard-input-textarea'
//                     type="text"
//                     name="secondaryLanguage"
//                     value={formData.secondaryLanguage}
//                     onChange={handleChange}
//                   />
//                 </label>

//               </div>
//               <div className="form-row">
//               <label>
//                   Masjid Name (Primary Language):
//                   <input
//                   className='form-control-double dashboard-input-textarea'
//                     type="text"
//                     name="masjidNamePrimary"
//                     value={formData.masjidNamePrimary}
//                     onChange={handleChange}
//                   />
//                 </label>
//                 <label>
//                   Masjid Name (Secondary Language):
//                   <input
//                   className='form-control-double dashboard-input-textarea'
//                     type="text"
//                     name="masjidNameSecondary"
//                     value={formData.masjidNameSecondary}
//                     onChange={handleChange}
//                   />
//                 </label>

//               </div>
//               <div style = {{width: "100"}}>
//               <label>
//                   Subtitle:
//                   <input className='form-control-title dashboard-input-textarea' type="text" name="subTitle" value={formData.subTitle} onChange={handleChange} />
//                 </label>
//               </div>

//               <div className="form-row">
//                 <label>
//                   Admin Notes:
//                   <textarea
//                   rows={8}
//                   cols={69}
//                   className='form-control dashboard-input-textarea'
//                     name="adminNotes"
//                     value={formData.adminNotes}
//                     onChange={handleChange}
//                   />
//                 </label>
//               </div>
//               <div className='save-button'>
//               <button className='save-button-color'>Save</button>
//               </div>
//             </div>

//           );
//         };

// export default MosqueForm;

import React, { useEffect, useState } from "react";
import "./index.css";
import logo from "../../utils/masjidImage.png";
import "bootstrap/dist/css/bootstrap.min.css";
import Toast from "../../utils/Toast";
import Cookies from "js-cookie";
import { AiOutlineFilePdf } from "react-icons/ai";

const MosqueForm = () => {
  const [formData, setFormData] = useState({
    masjeedname: "",
    adminname: "",
    email: "",
    phonenumber: "",
    country: "",
    state: "",
    city: "",
    postalcode: "",
    address: "",
    file: null,
  });

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [cId, setCountryId] = useState("");
  const [selectedCountryIso2, setSelectedCountryIso2] = useState("");
  const [selectedStateIso2, setSelectedStateIso2] = useState("");
  const [selectedCountryName, setSelectedCountryName] = useState("");

  const [editMode, setEditMode] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    const file = type === "file" ? files[0] : null;

    setFormData({
      ...formData,
      [name]: type === "file" ? file : value,
    });
  };

  const url = process.env.REACT_APP_BASE_URL;

  const fetchCountries = async () => {
    const headers = new Headers();
    headers.append(
      "X-CSCAPI-KEY",
      "bjNPeE1FZEZYRnhsUmo5ZzBRTWRPWHBaRGEzRWl4MWVKbmxWalYxTQ=="
    ); // Replace YOUR_API_KEY with your actual API key

    const requestOptions = {
      method: "GET",
      headers: headers,
      redirect: "follow",
    };

    try {
      const response = await fetch(
        "https://api.countrystatecity.in/v1/countries",
        requestOptions
      );
      const data = await response.json();
      console.log(data);
      setCountries(data);
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };

  const fetchStates = async (countryId) => {
    const headers = new Headers();
    headers.append(
      "X-CSCAPI-KEY",
      "bjNPeE1FZEZYRnhsUmo5ZzBRTWRPWHBaRGEzRWl4MWVKbmxWalYxTQ=="
    ); // Replace YOUR_API_KEY with your actual API key

    const requestOptions = {
      method: "GET",
      headers: headers,
      redirect: "follow",
    };
    setCountryId(countryId);

    try {
      const response = await fetch(
        `https://api.countrystatecity.in/v1/countries/${countryId}/states/`,
        requestOptions
      );
      const data = await response.json();

      setStates(data);
    } catch (error) {
      console.error("Error fetching states:", error);
    }
  };

  const fetchCities = async (stateId) => {
    const headers = new Headers();
    headers.append(
      "X-CSCAPI-KEY",
      "bjNPeE1FZEZYRnhsUmo5ZzBRTWRPWHBaRGEzRWl4MWVKbmxWalYxTQ=="
    ); // Replace YOUR_API_KEY with your actual API key

    const requestOptions = {
      method: "GET",
      headers: headers,
      redirect: "follow",
    };

    try {
      const response = await fetch(
        `https://api.countrystatecity.in/v1/countries/${cId}/states/${stateId}/cities`,
        requestOptions
      );
      const data = await response.json();

      setCities(data);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  const handleCountryChange = (e) => {
    const selectedCountryId = e.target.value;
    const selectedCountry = countries.find(
      (country) => country.iso2 === selectedCountryId
    );

    setFormData({ ...formData, country: selectedCountryId });
    setSelectedCountryIso2(selectedCountry ? selectedCountry.name : "");

    if (selectedCountryId) {
      fetchStates(selectedCountryId);
    } else {
      setStates([]);
      setCities([]);
    }
  };

  const handleStateChange = (e) => {
    const selectedStateId = e.target.value;
    const selectedState = states.find(
      (state) => state.iso2 === selectedStateId
    );

    setFormData({ ...formData, state: selectedStateId });
    setSelectedStateIso2(selectedState ? selectedState.name : "");

    if (selectedStateId) {
      fetchCities(selectedStateId);
    } else {
      setCities([]);
    }
  };

  const handleCityChange = (e) => {
    const selectedCityId = e.target.value;
    const name = e.target.name;
    const value = e.target.value;
    if (selectedCityId) {
      setFormData({ ...formData, [name]: value });
    } else {
      setCities([]);
    }
  };

  const token = Cookies.get("user");
  const fetchData = async () => {
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const api = `${url}getmasjeeddetails`;
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

      const masjeedData = data.data[0];

      console.log(masjeedData, "data");

      setFormData({
        masjeedname: masjeedData.masjeedname,
        adminname: masjeedData.adminname,
        email: masjeedData.email,
        phonenumber: masjeedData.phonenumber,
        country: masjeedData.country,
        state: masjeedData.state,
        city: masjeedData.city,
        postalcode: masjeedData.postalcode,
        address: masjeedData.address,
        file: masjeedData.prayerdetails,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchCountries();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("masjeedname", formData.masjeedname);
    form.append("adminname", formData.adminname);
    form.append("email", formData.email);
    form.append("phonenumber", formData.phonenumber);
    form.append("country", selectedCountryIso2);
    form.append("state", selectedStateIso2);
    form.append("city", formData.city);
    form.append("postalcode", formData.postalcode);
    form.append("address", formData.address);
    form.append("file", formData.file);

    console.log(form, "kakaj");

    try {
      const response = await fetch(`${url}updatemasjeeddetails`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },

        body: form,
      });

      if (response.ok) {
        setFormData({
          masjeedname: "",
          adminname: "",
          email: "",
          phonenumber: "",
          country: "",
          state: "",
          city: "",
          postalcode: "",
          address: "",
          file: null,
        });
        setEditMode(false);
        fetchData();
        const data = await response.json();
        Toast.fire({
          icon: "success",
          title: data.message,
        });
      } else {
        console.error(
          "Failed to submit form:",
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
      console.error("Error submitting form:", error.message);
    }
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const openFileInNewTab = (fileURL) => {
    if (fileURL) {
      window.open(`http://localhost:3009/${fileURL}`, "_blank");
    }
  };

  return (
    <div className="container mosque-form-container">
      <div className="row">
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <div>
            <h1 className="first-part-heading">Edit Masjid</h1>
          </div>
          <div className="first-masjid-part-two">
            <p className="first-part-timing">Timing screen</p>
            <p className="first-part-info">info screen</p>
            <p className="first-part-timing-info">Timing info screen</p>
            <p className="first-part-salah">Multiple salah screen</p>
            <p className="first-part-share">Share screen</p>
          </div>
        </div>
      </div>
      <div className="row">
        <div>
          <div className="col-md-6 col-12">
            <div className="form-group">
              <label>Masjid Name:</label>
              <input
                className="form-control"
                style={{ backgroundColor: "#e9ecef" }}
                type="text"
                placeholder="Enter Your Masjid Name"
                name="masjeedname"
                value={formData.masjeedname}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="col-md-6 col-12">
            <div className="form-group">
              <label>Admin Name:</label>
              <input
                className="form-control"
                style={{ backgroundColor: "#e9ecef" }}
                type="text"
                placeholder="Enter Your Admin Name"
                name="adminname"
                value={formData.adminname}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 col-12">
          <div className="form-group">
            <label>Email:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Your Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="col-md-6 col-12">
          <label>Phone Number</label>
          <input
            type="text"
            placeholder="Enter Your phone Number"
            className="form-control"
            name="phoneNumber"
            value={formData.phonenumber}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 col-12">
          <label>Country:</label>
          {editMode ? (
            <select
              onChange={handleCountryChange}
              className="form-control"
              name="country"
              value={formData.country}
            >
              <option value="">Select Country</option>
              {countries.map((country) => (
                <option key={country.id} value={country.iso2}>
                  {country.name}
                </option>
              ))}
            </select>
          ) : (
            <input
              type="text"
              className="form-control"
              value={formData.country}
            />
          )}
        </div>
        <div className="col-12 col-md-6">
          <label>State:</label>
          {editMode ? (
            <select
              onChange={handleStateChange}
              className="form-control"
              name="state"
              value={formData.state}
            >
              <option value="">Select State</option>
              {states.map((state) => (
                <option key={state.id} value={state.iso2}>
                  {state.name}
                </option>
              ))}
            </select>
          ) : (
            <input
              type="text"
              className="form-control"
              value={formData.state}
            />
          )}
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-md-6">
          <label>City:</label>
          {editMode ? (
            <select
              onChange={handleCityChange}
              className="form-control"
              name="city"
              value={formData.city}
            >
              <option value="">Select City</option>
              {cities.map((city) => (
                <option key={city.id} value={city.iso2}>
                  {city.name}
                </option>
              ))}
            </select>
          ) : (
            <input type="text" className="form-control" value={formData.city} />
          )}
        </div>
        <div className="col-12 col-md-6">
          <label>Postal Code:</label>
          <input
            className="form-control"
            type="text"
            name="postalcode"
            placeholder="Enter Your Postal Code"
            value={formData.postalcode}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-12 col-md-6">
          <label>Street Address:</label>
          <input
            className="form-control"
            type="text"
            name="address"
            placeholder="Enter Your Street Address"
            value={formData.address}
            onChange={handleChange}
          />
        </div>
        <div className="col-12 col-md-6">
          <label>Timing Sheet</label>
          <input
            className="form-control"
            type="file"
            name="file"
            required
            onChange={handleChange}
          />
        </div>
      </div>
      {/* <div style={{ display: "flex", margin: "20px" }}>
                <p onClick={() => openFileInNewTab(formData.file)}
                  className="viewpdf-button">
                    {formData.file}
                
                  
                  </p>
              </div>
 */}
      <div className="row">
        <div
          className="col-12"
          style={{
            display: "flex",
            flexDirection: "row-reverse",
            color: "white",
          }}
        >
          {editMode ? (
            <button
              className="btn btn-info mt-2"
              style={{ color: "#ffffff" }}
              onClick={handleSave}
            >
              Save
            </button>
          ) : (
            <button
              className="btn btn-warning mt-2"
              style={{ color: "#ffffff" }}
              onClick={handleEdit}
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MosqueForm;
