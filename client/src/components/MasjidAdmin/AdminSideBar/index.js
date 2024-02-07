import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { BsFillPersonFill } from "react-icons/bs";
import {
  MdProductionQuantityLimits,
  MdOutlinePinch,
  MdLabelImportant,
  MdPeopleAlt,
  MdOutlinePeopleAlt,
} from "react-icons/md";

import { AiOutlineTeam } from "react-icons/ai";
import { IoLogOut, IoPaperPlane } from "react-icons/io5";
import { RiAccountCircleFill } from "react-icons/ri";
import { GiHamburgerMenu } from "react-icons/gi";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";
import { FaListAlt } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";

import { TbBuildingMosque } from "react-icons/tb";
import { LiaMosqueSolid } from "react-icons/lia";
import { TfiAlarmClock } from "react-icons/tfi";
import { MdOutlineMessage } from "react-icons/md";
import { MdOutlineManageAccounts } from "react-icons/md";

import Iqamah from "../Iquamah";
import Manageaccounts from "../ManageAccounts";
import MosqueForm from "../Masjid";
import AllMessages from "../AllMessages";
import SalahTimingTable from '../../MasjidAdmin/SalahTimingTable'
import Navbar from "../../Navbar";
import AdminNavbar from "../AdminNavbar";
import Cookies from "js-cookie";

function AdminSideBar() {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [prevStatus, setPrevStatus] = useState(null);
  const [orderId, setOrderId] = useState("");
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
    Cookies.remove('user')
    navigate("/login");
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
            style={status === 1 ? { backgroundColor: "#fff", color: "#212d45" } : {}}
          >
            Masjid
          </MenuItem>
          <MenuItem
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            icon={<LiaMosqueSolid fontSize="25px" />}
            onClick={() => handleSidebarItemClick(2)}
            style={status === 2 ? { backgroundColor: "#fff", color: "#212d45" } : {}}
          >
            Salah
          </MenuItem>
          <MenuItem
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            icon={<TfiAlarmClock fontSize="25px" />}
            onClick={() => handleSidebarItemClick(3)}
            style={status === 3 ? { backgroundColor: "#fff", color: "#212d45" } : {}}
          >
            Iqamah
          </MenuItem>
          <MenuItem
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            icon={<MdOutlineMessage fontSize="25px" />}
            onClick={() => handleSidebarItemClick(4)}
            style={status === 4 ? { backgroundColor: "#fff", color: "#212d45" } : {}}
          >
            Messages
          </MenuItem>
          <MenuItem
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            icon={<MdOutlineManageAccounts fontSize="25px" />}
            onClick={() => handleSidebarItemClick(5)}
            style={status === 5 ? { backgroundColor: "#fff", color: "#212d45" } : {}}
          >
            Manage Accounts
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
          gap: "30px",
          minHeight: "100vh",
        }}
      >
        <AdminNavbar />

        {parseInt(status) === 1 ? (
          <MosqueForm />
        ) : parseInt(status) === 2 ? (
          <SalahTimingTable />
        ) : parseInt(status) === 3 ? (
          <Iqamah />
        ) : parseInt(status) === 4 ? (
          <AllMessages />
        ) : parseInt(status) === 5 ? (
          <Manageaccounts />
        ) : null}
      </div>
    </div>
  );
}

export default AdminSideBar;


