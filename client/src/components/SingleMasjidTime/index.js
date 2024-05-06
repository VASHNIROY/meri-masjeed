import * as React from "react";
import "./index.css";
import Box from "@mui/material/Box";
import EditIcon from "@mui/icons-material/Edit";
import { MdToggleOn } from "react-icons/md";
import { MdToggleOff } from "react-icons/md";
import { MdAddToPhotos } from "react-icons/md";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";

import Spinner from "../Loader";
import mobileImage from "../utils/mobileImage2.png";

import {
  GridToolbar,
  selectedGridRowsSelector,
  gridFilteredSortedRowIdsSelector,
} from "@mui/x-data-grid";

import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useParams } from "react-router-dom";
import { FaCheck, FaTimes } from "react-icons/fa";
import Clock from "../Home/Clock";
import Toast from "../utils/Toast";
import { MdOutlineMessage } from "react-icons/md";

const baseUrl = process.env.REACT_APP_BASE_URL;

const getSelectedRowsToExport = ({ apiRef }) => {
  const selectedRowIds = selectedGridRowsSelector(apiRef);
  if (selectedRowIds.size > 0) {
    return Array.from(selectedRowIds.keys());
  }

  return gridFilteredSortedRowIdsSelector(apiRef);
};

function SingleMasjidTime() {
  const { id } = useParams();

  const toggle = true;

  const [masjidTimingList, setMasjidTimingList] = useState([]);
  const [loading, setLoading] = useState(false);

  const [time, setTime] = useState(new Date());
  const [showBanner, setShowBanner] = useState(false);
  const [names, setNames] = useState([]);
  const [remainingMinutes, setRemainingMinutes] = useState(0);

  const [sehar, setSehar] = useState("");
  const [iftar, setIftar] = useState("");
  const [masjiddetails, setMasjidDetails] = useState({});
  const [todayDate, setTodayDate] = useState("");

  const url = process.env.REACT_APP_BASE_URL;

  const fetchData = async () => {
    const token = Cookies.get("user");
    setLoading(true);

    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const api = `${url}getTodaySchedule/${id}`;
    try {
      const response = await fetch(api, options);

      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }
      setLoading(false);

      const data = await response.json();
      Toast.fire({
        icon: "success",
        title: data.message,
      });
      console.log(data, "kapil");
      setMasjidTimingList(data.todayTimings);
      setMasjidDetails(data.results);
      console.log(data.todayTimings, "kkkkk");
    } catch (error) {
      setLoading(false);
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    {
      field: "name",
      headerName: "Salah",
      width: 250,
      headerClassName: "super-app-theme--header",
      align: "center",
      headerAlign: "center",
      flex: 1,
      sortable: false,
    },
    {
      field: "starttime",
      headerName: "Adhan",
      headerAlign: "center",
      headerClassName: "super-app-theme--header",
      width: 250,
      align: "center",
      flex: 1,
      sortable: false,
      filterable: false,
    },
    {
      field: "endtime",
      headerName: "Iqamah",
      headerClassName: "super-app-theme--header",
      width: 250,
      align: "center",
      headerAlign: "center",
      flex: 1,
      sortable: false,
    },

    // {
    //   field: "actions",
    //   type: "actions",
    //   headerName: "Actions",
    //   minWidth: 100,
    //   cellClassName: "actions",
    //   align: "center",
    //   headerAlign: "center",
    //   headerClassName: "super-app-theme--header",
    //   flex: 1,
    //   getActions: ({ id }) => {
    //     const row = masjidList.find((r) => r.id === id);
    //     console.log(row, "rowrow");
    //     const isActive = row && row.status === 1;

    //     return [
    //       <GridActionsCellItem
    //         icon={<FaCheck style={{ color: "#00cc00", fontSize: "22px" }} />}
    //         label="Edit"
    //         className="edit-list-icon"
    //         onClick={() => handleEnableClick(id)}
    //         color="yellow"
    //       />,
    //       <GridActionsCellItem
    //           icon={
    //             <FaTimes style={{ color: "#ff0000", fontSize: "24px" }} />
    //           }
    //           label="Disable"
    //           onClick={() => handleDeleteClick(id)}
    //           color="red"
    //         />

    //     ];
    //   },
    // },
  ];

  const getRowId = (row) => row.id;

  const getRowClassName = (params) => {
    return params.row.id % 2 === 1 ? "even-row" : "odd-row";
  };

  console.log(masjidTimingList, "masjidTimingList");

  useEffect(() => {
    if (masjidTimingList && masjidTimingList.length > 0) {
      const updatedNames = masjidTimingList.map(({ name, starttime }) => {
        const [hours, minutes] = starttime.split(":");
        return {
          text: name,
          dynamicHours: parseInt(hours, 10),
          dynamicMinutes: parseInt(minutes, 10),
        };
      });
      setNames(updatedNames);
    }
  }, [masjidTimingList]);

  useEffect(() => {
    const currentMinutes = time.getHours() * 60 + time.getMinutes();
    const nextPrayerIndex = names.findIndex(
      ({ dynamicHours, dynamicMinutes }) =>
        currentMinutes < dynamicHours * 60 + dynamicMinutes
    );

    if (nextPrayerIndex !== -1) {
      const nextPrayerTime = names[nextPrayerIndex];
      const remaining =
        nextPrayerTime.dynamicHours * 60 +
        nextPrayerTime.dynamicMinutes -
        currentMinutes;

      setRemainingMinutes(remaining);
      console.log(remaining, "remaining");

      if (remaining > 0 && remaining < 4) {
        console.log("kapil");
        setShowBanner(true);
        const bannerTimeout = setTimeout(() => {
          setShowBanner(false);
        }, 1000);

        return () => clearTimeout(bannerTimeout);
      }
    }

    setShowBanner(false); // If remainingMinutes is not 1, hide the banner
  }, [time, names]);

  const hour = time.getHours();
  const minute = time.getMinutes();
  const second = time.getSeconds();

  const handleShowBannerChange = (value) => {
    setShowBanner(value);
  };

  useEffect(() => {
    const date = new Date();
    const TodayDateandYear = `${date.getDate()}-${
      date.getMonth() + 1
    }-${date.getFullYear()}`;
    setTodayDate(TodayDateandYear);
  });

  const fetchRamzanData = async () => {
    const options = {
      method: "GET",
    };
    const api = `${url}getramzantimings`;
    try {
      const response = await fetch(api, options);
      console.log(response, "kapil");

      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }

      const data = await response.json();
      Toast.fire({
        icon: "success",
        title: data.message,
      });

      console.log(data, "kapil");
      const masjeedData = data.data[0];

      console.log(masjeedData, "data data");

      const seharTime = masjeedData.sehar.split(":").slice(0, 2).join(":");
      const iftarTime = masjeedData.iftar.split(":").slice(0, 2).join(":");

      setSehar(seharTime);
      setIftar(iftarTime);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchRamzanData();
  }, []);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="select-masjid-warning-container">
          {/* <div>
            <h1
              style={{
                fontSize: "48px",
                paddingTop: "20px",
                fontWeight: "600",
                textAlign: "center",
                color:"#194373"
              }}
            >
              {todayDate}
            </h1>
          </div> */}
          <div className="select-masjid-time-flex-container">
            <Clock
              masjidTimingList={masjidTimingList}
              masjeedDetails={masjiddetails}
              onShowBannerChange={handleShowBannerChange}
            />
            <div className="single-masjid-list-main-container">
              {masjidTimingList.length > 0 && (
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    "& .super-app-theme--header": {
                      backgroundColor: "#194373",
                      color: "#fff",
                      fontSize: "30px",
                    },
                    "& .MuiDataGrid-cell:focus, & .MuiDataGrid-cell:focus-within":
                      {
                        outline: "none !important", // Remove the focus outline
                        border: "none !important", // Remove the border when the cell is focused
                        boxShadow: "none !important", // Remove any box shadow
                      },
                    "& .even-row, & .odd-row": {
                      backgroundColor: "#fff",
                      fontSize: "24px", // Remove the background color on hover
                    },
                    "& .even-row:hover, & .odd-row:hover": {
                      backgroundColor: "#f2f2f2",
                      cursor: "pointer", // Remove the background color on hover
                    },
                  }}
                >
                  <DataGrid
                    rows={masjidTimingList}
                    columns={columns}
                    // initialState={{
                    //   pagination: {
                    //     paginationModel: {},
                    //   },
                    // }}
                    getRowId={getRowId}
                    getRowClassName={getRowClassName}
                    pageSizeOptions={[5, 10, 15, 20, 100]}
                    disableSelectionOnClick // Add this line to disable cell selection
                    selectionModel={{}}
                    disableRowSelectionOnClick
                    slots={{
                      printOptions: {
                        getRowsToExport: getSelectedRowsToExport,
                        hideFooter: true,
                        hideToolbar: true,
                        includeCheckboxes: true,
                      },
                    }}
                  />
                </Box>
              )}
            </div>
            <div className="ramzan-timings-container">
              {sehar && (
                <h1 className="ramzan-sehar-time">Sehar : {sehar} AM</h1>
              )}
              {iftar && (
                <h1 className="ramzan-iftar-time">Iftar : {iftar} PM</h1>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default SingleMasjidTime;
