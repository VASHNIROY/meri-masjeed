// import React, { useState } from 'react';
// import './index.css'
// import Navbar from '../Navbar';

// const MasidRegister= () => {
//   const [formData, setFormData] = useState({
//     firstName: '',
//     email: '',
//     phoneNumber: '',
//     country: '',
//     state: '',
//     city: '',
//     postalCode: '',
//     address: '',
//     file: null,
//   });

//   const handleChange = (e) => {
//     const { name, value, type, files } = e.target;
//     const file = type === 'file' ? files[0] : null;

//     setFormData({
//       ...formData,
//       [name]: type === 'file' ? file : value,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log('Form submitted:', formData);
//   };
//   const countries = ['USA', 'Canada', 'UK', 'Australia'];
//   const states = ['New York', 'California', 'Texas', 'Florida'];
//   const cities = ['New York City', 'Los Angeles', 'Dallas', 'Miami'];

//   return (
//     <>
//     <Navbar/>
//     <div className='masid-regiser-form'>
//         <h1 className='masid-register-heading'>Register your Masjid!</h1>
//     </div>
//    <div className='masid-form-main-container'>
//      <form className='masid-form-container' onSubmit={handleSubmit}>
//         <h1 className='app-para-heading'>Masjid Information</h1>
//         <p className='app-para-text'>Are you a Masjid? Provide your Masjid details below and register with us for FREE.</p>
//       <div className='masid-form-field'>
//         <label className='app-para-text'>
//           Masjid Name *
//         </label>
//         <input
//             type="text"
//             name="firstName"
//             value={formData.firstName}
//             onChange={handleChange}
//             className='masid-form-input'
//             is required
//           />
//       </div>

//       <div className='masid-form-field'>
//         <label className='app-para-text'>
//         Email *

//         </label>
//         <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             className='masid-form-input'
//             is required
//           />
//       </div>

//       <div className='masid-form-field'>
//         <label className='app-para-text'>
//         Phone Number *

//         </label>
//         <input
//             type="tel"
//             name="phoneNumber"
//             value={formData.phoneNumber}
//             onChange={handleChange}
//             className='masid-form-input'
//             is required
//           />
//       </div>

//       <div className='masid-form-field'>
//         <label className='app-para-text'>
//         Country *

//         </label>
//         <select
//             name="country"
//             value={formData.country}
//             onChange={handleChange}
//             className='masid-form-input'
//             is required
//           >
//             <option value=""></option>
//             {countries.map((country) => (
//               <option key={country} value={country}>
//                 {country}
//               </option>
//             ))}
//           </select>
//       </div>

//       <div className='masid-form-field'>
//         <label className='app-para-text'>
//         State *

//         </label>
//         <select   className='masid-form-input'
//           name="state"
//           value={formData.state}
//           onChange={handleChange}
//           is required
//           >
//             <option value=""></option>
//             {states.map((state) => (
//               <option key={state} value={state}>
//                 {state}
//               </option>
//             ))}
//           </select>
//       </div>

//       <div className='masid-form-field'>
//         <label className='app-para-text'>
//         City *

//         </label>
//         <select
//           className='masid-form-input'
//            name="city"
//            value={formData.city}
//            onChange={handleChange}
//            required
//            >
//             <option value=""></option>
//             {cities.map((city) => (
//               <option key={city} value={city}>
//                 {city}
//               </option>
//             ))}
//           </select>
//       </div>

//       <div className='masid-form-field'>
//         <label className='app-para-text'>
//         Postal code *

//         </label>
//         <input
//             type="text"
//             name="postalCode"
//             value={formData.postalCode}
//             onChange={handleChange}
//             className='masid-form-input'
//             required
//           />
//       </div>

//       <div className='masid-form-field'>
//         <label className='app-para-text'>
//         Street Address *

//         </label>
//         <textarea
//             name="address"
//             value={formData.address}
//             onChange={handleChange}
//             className='masid-form-input'
//             is required
//           />
//       </div>
//       <div className="masid-form-field">
//           <label className="app-para-text">
//           Please upload your Masjid SALAH timing sheet (attach now or we will ask you later. Max size should be 1mb. File formats are XLSX, CSV)

//           </label>
//           <div className="file-input-container">
//               <input
//                 type="file"
//                 name="file"
//                 onChange={handleChange}
//                 className="file-input"
//                 required
//               />
//             </div>
//         </div>

//       <button className='app-container-button'
//        type="submit">SEND</button>
//     </form>
//    </div>
//    </>
//   );
// };

// export default MasidRegister;

import React, { useEffect, useState } from "react";
import { Toast } from "bootstrap";

const MasjidRegisterForm = () => {
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

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    const file = type === "file" ? files[0] : null;

    setFormData({
      ...formData,
      [name]: type === "file" ? file : value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("called...");
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

    console.log(form, "formData");
    const url = process.env.REACT_APP_BASE_URL;

    try {
      const response = await fetch(`${url}addmasjeed`, {
        method: "POST",

        body: form,
      });
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

      if (response.ok) {
        console.log("Form submitted successfully!");
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
  // const countries = ['USA', 'Canada', 'UK', 'Australia'];
  // const states = ['New York', 'California', 'Texas', 'Florida'];
  // const cities = ['New York City', 'Los Angeles', 'Dallas', 'Miami'];

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

  // const handleCountryChange = (e) => {
  //   const selectedCountryId = e.target.value;
  //   console.log(selectedCountryId)
  //   const name = e.target.name;
  //   console.log(name)
  //   const value = e.target.value;
  //   if (selectedCountryId) {
  //     setFormData({ ...formData, [name]: value });
  //     fetchStates(selectedCountryId);
  //   } else {
  //     setStates([]);
  //     setCities([]);
  //   }
  // };

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

  // const handleStateChange = (e) => {
  //   const selectedStateId = e.target.value;
  //   console.log(selectedStateId,"selectedStateId")
  //   const name = e.target.name;
  //   const value = e.target.value;
  //   if (selectedStateId) {
  //     setFormData({ ...formData, [name]: value });
  //     fetchCities(selectedStateId);
  //   } else {
  //     setCities([]);
  //   }
  // };

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

  useEffect(() => {
    fetchCountries();
  }, []);

  return (
    <>
      <div className="masid-regiser-form">
        <h1 className="masid-register-heading">Register your Masjid!</h1>
      </div>
      <div className="masid-form-main-container">
        <form className="masid-form-container" onSubmit={handleSubmit}>
          <h1 className="app-para-heading">Masjid Information</h1>
          <p className="app-para-text">
            Are you a Masjid? Provide your Masjid details below and register
            with us for FREE.
          </p>
          <div className="masid-form-field">
            <label className="app-para-text">Masjid Name *</label>
            <input
              type="text"
              name="masjeedname"
              value={formData.masjeedname}
              onChange={handleChange}
              className="masid-form-input"
              is
              required
            />
          </div>
          <div className="masid-form-field">
            <label className="app-para-text">Admin Name *</label>
            <input
              type="text"
              name="adminname"
              value={formData.adminname}
              onChange={handleChange}
              className="masid-form-input"
              required
            />
          </div>

          <div className="masid-form-field">
            <label className="app-para-text">Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="masid-form-input"
              is
              required
            />
          </div>

          <div className="masid-form-field">
            <label className="app-para-text">Phone Number *</label>
            <input
              type="tel"
              name="phonenumber"
              value={formData.phonenumber}
              onChange={handleChange}
              className="masid-form-input"
              is
              required
            />
          </div>

          <div className="masid-form-field">
            <label className="app-para-text">Country *</label>

            <select
              onChange={handleCountryChange}
              className="masid-form-input"
              name="country"
            >
              <option value="">Select Country</option>
              {countries.map((country) => (
                <option key={country.id} value={country.iso2}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>

          <div className="masid-form-field">
            <label className="app-para-text">State *</label>
            <select
              onChange={handleStateChange}
              className="masid-form-input"
              name="state"
            >
              <option value="">Select State</option>
              {states.map((state) => (
                <option key={state.id} value={state.iso2}>
                  {state.name}
                </option>
              ))}
            </select>
          </div>

          <div className="masid-form-field">
            <label className="app-para-text">City *</label>
            <select
              onChange={handleCityChange}
              className="masid-form-input"
              name="city"
            >
              <option value="">Select City</option>
              {cities.map((city) => (
                <option key={city.id} value={city.iso2}>
                  {city.name}
                </option>
              ))}
            </select>
          </div>

          <div className="masid-form-field">
            <label className="app-para-text">Postal code *</label>
            <input
              type="text"
              name="postalcode"
              value={formData.postalcode}
              onChange={handleChange}
              className="masid-form-input"
              required
            />
          </div>

          <div className="masid-form-field">
            <label className="app-para-text">Street Address *</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="masid-form-input"
              is
              required
            />
          </div>
          <div className="masid-form-field">
            <label className="app-para-text">
              Please upload your Masjid SALAH timing sheet (attach now or we
              will ask you later. Max size should be 1mb. File formats are XLSX,
              CSV)
            </label>
            <div className="file-input-container">
              <input
                type="file"
                name="file"
                onChange={handleChange}
                className="file-input"
                required
              />
            </div>
          </div>

          <button className="app-container-button" type="submit">
            SEND
          </button>
        </form>
      </div>
    </>
  );
};

export default MasjidRegisterForm;
