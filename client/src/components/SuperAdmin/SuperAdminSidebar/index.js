import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";

import { IoLogOut } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { TbBuildingMosque } from "react-icons/tb";
import { LiaMosqueSolid } from "react-icons/lia";
import { TfiAlarmClock } from "react-icons/tfi";

import AdminNavbar from "../../MasjidAdmin/AdminNavbar";
import MasidRegisterForm from "../MasjidRegisterForm";
import MasjidRequestList from "../MasjidRequestList";
import AllMasjids from "../AllMasjid";
import Cookies from "js-cookie";

function SuperAdminSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [prevStatus, setPrevStatus] = useState(null);
  const navigate = useNavigate();

  const [status, setStatus] = useState(() => {
    const storedStatus = sessionStorage.getItem("status");
    if (storedStatus === "12") {
      return sessionStorage.getItem("prevStatus");
    } else if (storedStatus === "") {
      return 1;
    } else if (storedStatus === null) {
      return 1;
    } else {
      return parseInt(storedStatus);
    }
  });

  const handleLogout = () => {
    Cookies.remove("user");
    navigate("/superadminlogin");
  };

  const handleMouseEnter = () => {
    setIsCollapsed(false);
  };

  const handleMouseLeave = () => {
    setIsCollapsed(true);
  };

  const handleSidebarItemClick = async (id) => {
    setPrevStatus(status);
    await setStatus(id);
  };

  useEffect(() => {
    handleSidebarItemClick(status);
    sessionStorage.setItem("status", status);
    sessionStorage.setItem("prevStatus", prevStatus);
  }, [status]);

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar
        zIndex="999"
        className="sidebar-container"
        collapsed={isCollapsed}
        collapsedWidth="70px"
        backgroundColor="#194373"
      >
        <Menu
          menuItemStyles={{
            button: {
              "&.active": {
                backgroundColor: "#fff",
                color: "#fff",
              },
              backgroundColor: "#194373",
              color: "#fff",
              "&:hover": {
                backgroundColor: "#fff",
                color: "#212d45",
              },
            },
          }}
        >
          <div className="hamburger-icon">
            <GiHamburgerMenu
              style={{ color: "#fff" }}
              onMouseEnter={handleMouseEnter}
              onClick={() => setIsCollapsed(!isCollapsed)}
            />
          </div>
          <MenuItem
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            icon={<TbBuildingMosque fontSize="25px" />}
            onClick={() => handleSidebarItemClick(1)}
            style={
              status === 1 ? { backgroundColor: "#fff", color: "#212d45" } : {}
            }
          >
            Masjid List
          </MenuItem>
          <MenuItem
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            icon={<LiaMosqueSolid fontSize="25px" />}
            onClick={() => handleSidebarItemClick(2)}
            style={
              status === 2 ? { backgroundColor: "#fff", color: "#212d45" } : {}
            }
          >
            Masjid Requests
          </MenuItem>
          <MenuItem
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            icon={<TfiAlarmClock fontSize="25px" />}
            onClick={() => handleSidebarItemClick(3)}
            style={
              status === 3 ? { backgroundColor: "#fff", color: "#212d45" } : {}
            }
          >
            Add Masjid
          </MenuItem>

          <MenuItem
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            icon={<IoLogOut style={{ fontSize: "25px" }} />}
            onClick={handleLogout}
          >
            Logout
          </MenuItem>
        </Menu>
      </Sidebar>
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          minHeight: "100vh",
        }}
      >
        <AdminNavbar />

        {parseInt(status) === 1 ? (
          <AllMasjids />
        ) : parseInt(status) === 2 ? (
          <MasjidRequestList />
        ) : parseInt(status) === 3 ? (
          <MasidRegisterForm />
        ) : null}
      </div>
    </div>
  );
}

export default SuperAdminSidebar;
