import * as React from "react";
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
import { FaCheck, FaTimes } from "react-icons/fa";
import Toast from "../../utils/Toast";
import Spinner from "../../Loader";

const baseUrl = process.env.REACT_APP_BASE_URL;

const getSelectedRowsToExport = ({ apiRef }) => {
  const selectedRowIds = selectedGridRowsSelector(apiRef);
  if (selectedRowIds.size > 0) {
    return Array.from(selectedRowIds.keys());
  }

  return gridFilteredSortedRowIdsSelector(apiRef);
};

const CustomCheckboxHeader = (props) => {
  return (
    <div style={{ backgroundColor: "blue", padding: "8px" }}>
      {props.indeterminate ? (
        <div style={{ backgroundColor: "inherit" }} />
      ) : null}
      <input type="checkbox" {...props} />
    </div>
  );
};

function AllMasjids() {
  // Move this line to the top
  const [masjidList, setMasjidList] = useState([]);
  const [loading, setLoading] = useState(false);

  
  const [selectedRow, setSelectedRow] = React.useState(null);
  const [selectedStatus, setSelectedStatus] = useState([
    { id: 1, name: "Active" },
  ]);

  const handleEditClick = (subscriptionId) => {
    const row = masjidList.find(
      (r) => r.id === subscriptionId
    ); // Find the correct row by subscriptionId
    setSelectedRow(row);
   
  };

  
  console.log("kapil")
  
 

  

  
  const fetchData = async (
   
  ) => {
    const token = Cookies.get("user");
    setLoading(true)
    
    
    const options = {
      method: "GET", 
      headers: {
        Authorization: `Bearer ${token}`,
      }, 
    };
    const api = `http://localhost:3009/api/v1/getmasjeeds`;
    try {
      const response = await fetch(api, options);

      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }
      setLoading(false)

      const data = await response.json();
        Toast.fire({
          icon: "success",
          title: data.message,
        });
      console.log(data,"kapil");
      setMasjidList(data.data);
      console.log(data.data,"kkkkk")
    } catch (error) {
      setLoading(false)
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData(selectedStatus);
  }, [selectedStatus]);

  const columns = [
    {
      field: "id",
      headerName: "ID",
      minWidth: 90,
      headerClassName: "super-app-theme--header",
      align: "center",
      headerAlign: "center",
      flex: 1,
    },
    {
      field: "masjeedname",
      headerName: "Masjid Name",
      headerAlign: "center",
      headerClassName: "super-app-theme--header",
      minWidth: 150,
      align: "center",
      flex: 1,
    },
    {
      field: "country",
      headerName: "Country",
      headerClassName: "super-app-theme--header",
      minWidth: 150,
      align: "center",
      headerAlign: "center",
      flex: 1,
    },
    {
      field: "city",
      headerName: "City",
      type: "number",
      headerClassName: "super-app-theme--header",
      minWidth: 110,
      align: "center",
      headerAlign: "center",
      flex: 1,
    },
    {
        field: "adminname",
        headerName: "Responsible Person",
        type: "number",
        headerClassName: "super-app-theme--header",
        minWidth: 110,
        align: "center",
        headerAlign: "center",
        flex: 1,
      },
    {
        field: "email",
        headerName: "Email",
        type: "number",
        headerClassName: "super-app-theme--header",
        minWidth: 150,
        align: "center",
        headerAlign: "center",
        flex: 1,
      },
      {
        field: "phonenumber",
        headerName: "Number",
        type: "number",
        headerClassName: "super-app-theme--header",
        minWidth: 110,
        align: "center",
        headerAlign: "center",
        flex: 1,
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

  return (
    <>
     {loading?<Spinner/>:
      <Box
        sx={{
          height: "100vh",
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          "& .super-app-theme--header": {
            backgroundColor: "#194373",
            color: "#fff",
          },
          "& .MuiDataGrid-cell:focus, & .MuiDataGrid-cell:focus-within": {
            outline: "none !important",
            border: "none !important", 
            boxShadow: "none !important", 
          },
          "& .even-row:hover, & .odd-row:hover": {
            backgroundColor: "#f2f2f2",
          },
        }}
      >
        <DataGrid
          rows={masjidList}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {},
            },
          }}
          getRowId={getRowId}
          getRowClassName={getRowClassName}
          headerCheckboxSelectionComponent={CustomCheckboxHeader}
          pageSizeOptions={[5, 10, 15, 20, 100]}
          disableSelectionOnClick 
          selectionModel={{}}
          disableRowSelectionOnClick
          slots={{
            toolbar: GridToolbar,
            printOptions: {
              getRowsToExport: getSelectedRowsToExport,
              hideFooter: true,
              hideToolbar: true,
              includeCheckboxes: true,
            },
          }}
        />
        {/* <Modal
          open={isModalOpen}
          onClose={handleCloseModal}
          style={{ width: "100%" }}
        >
          <Box
            sx={{
              position: "absolute",
              width: "40%",
              top: "50%",
              height: "500px",
              overflow: "scroll",
              left: "50%",
              transform: "translate(-50%, -50%)",aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaqaaaaaa
              bgcolor: "background.paper",
              borderRadius: "8px",
              p: 3,
            }}
          >
            <SubscriptionListEditForm
              subscriptionId={selectedRow?.subscriptionId}
              onClose={handleCloseModal}
              fetchData={fetchData}
              selectedStatus={selectedStatus}
            />
          </Box>
        </Modal> */}
      </Box>
}
    </>
  );
}
export default AllMasjids;
