// import {Link} from 'react-router-dom'
// import './index.css'
// import { useEffect, useState } from 'react'

// function SelectMasjid(){

//     const [selectedCountry,setSelectedCountry] = useState()
//     const [selectedState,setSelectedState] = useState()
//     const [selectedCity,setSelectedCity] = useState()

//     const [countries , setCountries] = useState([])
//     const [states,setStates] = useState([])

//     const fetchCountries = async() => {
//         const api = "http://localhost:3009/api/v1/getCountries"
//         const options = {
//             method: "GET",
//         }

//         try {
//             const response = await fetch(api,options)
//             const data = await response.json()
//            setCountries(data.data)
//         } catch (error) {

//         }
//     }

//     useEffect(() =>{
//         fetchCountries()
//     }, [])

//     const fetchStates = async() => {
//         const api = "http://localhost:3009/api/v1/getStates"
//         const options = {
//             method: "GET",
//         }

//         try {
//             const response = await fetch(api,options)
//             const data = await response.json()
//            setStates(data.data)
//         } catch (error) {

//         }
//     }

//     useEffect(() =>{
//         fetchStates()
//     }, [])

//     const selectCountry=(e)=>{
//         console.log(e.target.value)
//         setSelectedCountry(e.target.value)
//     }

//     return(
//         <div className="select-masjid-main-container">
//             <div className="select-masjid-sub-container">
//                 <div className="select-masjid-heading-container">
//                     <h1 className="app-main-heading">Welcome</h1>
//                     <p className="app-para-text">Select your Masjid, if it is registered.</p>
//                     <Link to="/register">Register your Masjid</Link>
//                 </div>

//                 <input type="search" className="select-masjid-seach-input" placeholder="Search by masjid"/>
//                 <ul className="select-masjid-list-container">
//                     <li className="app-para-text">select Country</li>
//                     {
//                         countries.map((each)=>(
//                             <li className="app-para-text select-masjid-category-hover" key={each.country} value={each.country} onClick={selectCountry}>{each.country}</li>
//                         ))
//                     }
//                 </ul>
//                 <ul className="select-masjid-list-container">
//                     <li className="app-para-text">select State</li>
//                     {
//                         states.map((each)=>(
//                             <li className="app-para-text select-masjid-category-hover" key={each.state} value={each.state} onClick={selectCountry}>{each.state}</li>
//                         ))
//                     }
//                 </ul>

//             </div>
//         </div>
//     )
// }
// export default SelectMasjid

import { Link, useNavigate } from "react-router-dom";
import "./index.css";
import { useEffect, useState } from "react";
import SingleMasjidTime from "../SingleMasjidTime";
import NotFound from "../NotFound";

function SelectMasjid() {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedMasjid, setSelectedMasjid] = useState("");
  const [masjidTodayTimings, setMasjidTodayTimings] = useState();

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [masjids, setMasjids] = useState([]);

  const [filteredCountries, setFilteredCountries] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const url = process.env.REACT_APP_BASE_URL;

  const fetchCountries = async () => {
    const api = `${url}getCountries`;
    const options = {
      method: "GET",
    };

    try {
      const response = await fetch(api, options);
      const data = await response.json();
      setCountries(data.data);
      setFilteredCountries(data.data)
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  const selectCountry = async (country) => {
    console.log(country);
    setSelectedCountry(country);

    // Fetch states based on the selected country
    const api = `${url}getStates?country=${country}`;
    const options = {
      method: "GET",
    };

    try {
      const response = await fetch(api, options);
      console.log(response, "kapil");
      const data = await response.json();
      console.log(data);
      setStates(data.data);
    } catch (error) {
      console.error("Error fetching states:", error);
    }
  };

  const selectState = async (state) => {
    setSelectedState(state);

    // Fetch states based on the selected country
    const api = `${url}getCities?country=${selectedCountry}&state=${state}`;
    const options = {
      method: "GET",
    };

    try {
      const response = await fetch(api, options);
      console.log(response, "kapil");
      const data = await response.json();
      console.log(data);
      setCities(data.data);
    } catch (error) {
      console.error("Error fetching states:", error);
    }
  };

  const selectCity = async (city) => {
    setSelectedCity(city);

    // Fetch states based on the selected country
    const api = `${url}getwebmasjeeds?country=${selectedCountry}&state=${selectedState}&city=${city}`;
    const options = {
      method: "GET",
    };

    try {
      const response = await fetch(api, options);
      console.log(response, "kapil");
      const data = await response.json();
      console.log(data);
      setMasjids(data.data);
    } catch (error) {
      console.error("Error fetching states:", error);
    }
  };

  const navigate = useNavigate();

  const selectMasjid = async (id) => {
    setSelectedMasjid(id);
    navigate(`/singlemasjid/${id}`);

    // Fetch states based on the selected country
    const api = `${url}getTodaySchedule/${id}`;
    const options = {
      method: "GET",
    };

    try {
      const response = await fetch(api, options);
      console.log(response, "kapil");
      const data = await response.json();
      console.log(data);
      setMasjidTodayTimings(data.data);
    } catch (error) {
      console.error("Error fetching states:", error);
    }
  };

   const handleSearch = (e) => {
     const query = e.target.value.toLowerCase();
     setSearchQuery(query);
     const filtered = countries.filter((country) =>
       country.country.toLowerCase().includes(query)
     );
     setFilteredCountries(filtered);
   };


  return (
    <div className="select-masjid-main-container">
      {countries ? 
      <div className="select-masjid-sub-container">
        <div className="select-masjid-heading-container">
          <h1 className="app-main-heading">Welcome</h1>
          <p className="app-para-text">
            Select your Masjid, if it is registered.
          </p>
          <Link to="/register">Register your Masjid</Link>
        </div>

        <input
          type="search"
          className="select-masjid-seach-input"
          placeholder="Search by masjid"
          value={searchQuery}
          onChange={handleSearch}
        />
        {selectedCountry === "" && (
          <ul className="select-masjid-list-container">
            <li className="app-para-text">Select Country</li>

            {filteredCountries.map((each) => (
              <li
                className="app-para-text select-masjid-category-hover"
                key={each.country}
                onClick={() => selectCountry(each.country)} // Pass the country value directly
              >
                {each.country}
              </li>
            ))}
          </ul>
        )}
        {selectedCountry && selectedState === "" && (
          <ul className="select-masjid-list-container">
            <li className="app-para-text">Select State</li>
            {states.map((each) => (
              <li
                className="app-para-text select-masjid-category-hover"
                key={each.state}
                value={each.state}
                onClick={() => selectState(each.state)}
              >
                {each.state}
              </li>
            ))}
          </ul>
        )}
        {selectedState && selectedCity === "" && (
          <ul className="select-masjid-list-container">
            <li className="app-para-text">Select City</li>
            {cities.map((each) => (
              <li
                className="app-para-text select-masjid-category-hover"
                key={each.city}
                value={each.city}
                onClick={() => selectCity(each.city)}
              >
                {each.city}
              </li>
            ))}
          </ul>
        )}
        {selectedCity && selectedMasjid === "" && (
          <ul className="select-masjid-list-container">
            <li className="app-para-text">Select Masjid</li>
            {masjids.map((each) => (
              <li
                className="app-para-text select-masjid-category-hover"
                key={each.masjeedname}
                value={each.masjeedname}
                onClick={() => selectMasjid(each.id)}
              >
                {each.masjeedname}
              </li>
            ))}
          </ul>
        )}
        {/* {selectedMasjid && <SingleMasjidTime id={selectedMasjid}/>} */}
      </div>:<NotFound/>}
    </div>
  );
}

export default SelectMasjid;
