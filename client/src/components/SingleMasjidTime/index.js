import * as React from "react";
import './index.css'
import Box from "@mui/material/Box";
import EditIcon from "@mui/icons-material/Edit";
import { MdToggleOn } from "react-icons/md";
import { MdToggleOff } from "react-icons/md";
import { MdAddToPhotos } from "react-icons/md";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";

import {
  GridToolbar,
  selectedGridRowsSelector,
  gridFilteredSortedRowIdsSelector,
} from "@mui/x-data-grid";


import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useParams } from 'react-router-dom';
import { FaCheck, FaTimes } from "react-icons/fa";
import Clock from "../Home/Clock";

const baseUrl = process.env.REACT_APP_BASE_URL;

const getSelectedRowsToExport = ({ apiRef }) => {
  const selectedRowIds = selectedGridRowsSelector(apiRef);
  if (selectedRowIds.size > 0) {
    return Array.from(selectedRowIds.keys());
  }

  return gridFilteredSortedRowIdsSelector(apiRef);
};



function SingleMasjidTime() {

  const {id} = useParams()
  
  const [masjidTimingList, setMasjidTimingList] = useState([]);

  const fetchData = async (
   
  ) => {
    const token = Cookies.get("user");
    
    
    
    const options = {
      method: "GET", 
      headers: {
        Authorization: `Bearer ${token}`,
      }, 
    };
    const api = `http://localhost:3009/api/v1//getTodaySchedule/${id}`;
    try {
      const response = await fetch(api, options);

      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data,"kapil");
      setMasjidTimingList(data.todayTimings);
      console.log(data.todayTimings,"kkkkk")
    } catch (error) {
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

  console.log(masjidTimingList,"masjidTimingList")

  return (
    <div className="select-masjid-time-flex-container">

      <Clock masjidTimingList={masjidTimingList}/>
      {masjidTimingList.length>0 && 
      <Box
        sx={{
          marginTop:"20px",
          
          display: "flex",
          justifyContent: "space-between",
          "& .super-app-theme--header": {
            backgroundColor: "#194373",
            color: "#fff",
          },
          "& .MuiDataGrid-cell:focus, & .MuiDataGrid-cell:focus-within": {
            outline: "none !important", // Remove the focus outline
            border: "none !important", // Remove the border when the cell is focused
            boxShadow: "none !important", // Remove any box shadow
          },
          "& .even-row:hover, & .odd-row:hover": {
            backgroundColor: "#f2f2f2", // Remove the background color on hover
          },
        }}
      >
        <DataGrid
          rows={masjidTimingList}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {},
            },
          }}
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
}
    </div>
  );
}
export default SingleMasjidTime;
