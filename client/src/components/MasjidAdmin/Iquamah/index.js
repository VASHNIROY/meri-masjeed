import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import Cookies from "js-cookie";
import Toast from "../../utils/Toast";

const Iqamah = () => {
  const [inputs, setInputs] = useState({
    fajriqamah: "",
    dhuhriqamah: "",
    asriqamah: "",
    maghribiqamah: "",
    ishaiqamah: "",
    jumahadhan: "",
    jumahkhutbaduration:""
  });

  const handleInputChange = (name, value) => {
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const token = Cookies.get("user");
  const fetchData = async () => {
    
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const api = `http://localhost:3009/api/v1/getiqamahtimigs`;
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

      const IqamahTimings = data.data;

      console.log("data", IqamahTimings);

      setInputs({
        fajriqamah: IqamahTimings.fajriqamah,
        dhuhriqamah: IqamahTimings.dhuhriqamah,
        asriqamah: IqamahTimings.asriqamah,
        maghribiqamah: IqamahTimings.maghribiqamah,
        ishaiqamah: IqamahTimings.ishaiqamah,
        jumahkhutbaduration: IqamahTimings.jumahkhutbaduration,
        jumahadhan: IqamahTimings.jumahadhan

        
      });
      console.log(inputs,"ram")
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log(inputs,"inputs")

  const handleSave = async () => {
    console.log(typeof(inputs.jumahkhutbaduration),inputs,"jumahkhutbaduration")
    try {
      const response = await fetch("http://localhost:3009/api/v1/editIqamah", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(inputs),
      });

      if (response.ok) {
        fetchData()
        console.log("Data saved successfully");
      } else {
        console.error("Failed to save data");
      }
    } catch (error) {
      console.error("Error while saving data", error);
    }
  };

  return (
    <>
      <div style={{ margin: "20px 0px 50px 60px" }}>
        <h1 className="Iqamah-heading">Iqamah</h1>
        <p className="Iqamah-para">Set Iqamah Minutes</p>
      </div>
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-4">
            <div className="form-group">
              <label htmlFor="fajrInput">Minutes to Fajr Iqamah:</label>
              <input
                type="text"
                id="fajrInput"
                className="form-control"
                value={inputs.fajriqamah}
                onChange={(e) => handleInputChange("fajriqamah", e.target.value)}
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label htmlFor="dhuhrInput">Minutes to Dhuhr Iqamah:</label>
              <input
                type="text"
                id="dhuhrInput"
                className="form-control"
                value={inputs.dhuhriqamah}
                onChange={(e) => handleInputChange("dhuhriqamah", e.target.value)}
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label htmlFor="asrInput">Minutes to Asr Iqamah:</label>
              <input
                type="text"
                id="asrInput"
                className="form-control"
                value={inputs.asriqamah}
                onChange={(e) => handleInputChange("asriqamah", e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-4">
            <div className="form-group">
              <label htmlFor="maghribInput">Minutes to Maghrib Iqamah:</label>
              <input
                type="text"
                id="maghribInput"
                className="form-control"
                value={inputs.maghribiqamah}
                onChange={(e) => handleInputChange("maghribiqamah", e.target.value)}
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label htmlFor="ishaInput">Minutes to Isha Iqamah:</label>
              <input
                type="text"
                id="ishaInput"
                className="form-control"
                value={inputs.ishaiqamah}
                onChange={(e) => handleInputChange("ishaiqamah", e.target.value)}
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label htmlFor="jumahInput">Minutes to Jumah:</label>
              <input
                type="time"
                id="jumahInputTime"
                className="form-control"
                value={inputs.jumahadhan
                  }
                onChange={(e) => handleInputChange("jumahadhan", e.target.value)}
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label htmlFor="jumahInput">Jumah:</label>
              <input
                type="text"
                id="jumahInput"
                className="form-control"
                value={inputs.jumahkhutbaduration}
                onChange={(e) => handleInputChange("jumahkhutbaduration", e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row-reverse",
          margin: "30px 30px",
        }}
      >
        <button
          className="btn btn-info"
          style={{ color: "white" }}
          onClick={handleSave}
        >
          Save
        </button>
      </div>
    </>
  );
};

export default Iqamah;
