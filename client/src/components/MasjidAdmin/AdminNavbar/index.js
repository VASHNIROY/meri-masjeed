import Cookies from 'js-cookie';
import './index.css'
import { useEffect, useState } from 'react';
import Toast from '../../utils/Toast';


function AdminNavbar(){

    const [masjidName,setMasjidName] = useState("")
    const [masjidEmail,setMasjidEmail] = useState("")

     const url = process.env.REACT_APP_BASE_URL;
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

          console.log(data,"kapil")
          const masjeedData = data.data[0];

          console.log(masjeedData, "data");

          setMasjidEmail(masjeedData.email);
          setMasjidName(masjeedData.masjeedname);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      useEffect(() => {
        fetchData();
        
      }, []);

    return (
      <div className="admin-navbar-main-container">
        <div className="admin-navbar-sub-container">
          <p className="admin-nav-item-name">{masjidName}</p>
          <p className="admin-nav-item-name">{masjidEmail}</p>
        </div>
      </div>
    );
}
export default AdminNavbar