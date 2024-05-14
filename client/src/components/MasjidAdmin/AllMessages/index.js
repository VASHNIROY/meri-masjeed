import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./index.css";
import MessageForm from "../MessageForm";
import { Box, Modal } from "@mui/material";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { MdDeleteOutline } from "react-icons/md";

import {
  GridToolbar,
  selectedGridRowsSelector,
  gridFilteredSortedRowIdsSelector,
} from "@mui/x-data-grid";

import { FaCheck, FaTimes } from "react-icons/fa";
import Cookies from "js-cookie";
import Toast from "../../utils/Toast";

const url = process.env.REACT_APP_BASE_URL;

const AllMessages = () => {
  const [messages, setMessages] = useState([]);
  const [isModalOpen, setModalOpen] = React.useState(false);

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleMessage = () => {
    setModalOpen(true);
  };

  const fetchData = async () => {
    const token = Cookies.get("adminuser");

    console.log(token);

    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const api = `${url}getmessages`;
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
      console.log(data, "kapil");
      setMessages(data.data);
      console.log(data.data, "kkkkk");
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDeleteClick = async (messageId) => {

    console.log(typeof(messageId), messageId,"kappppppp");

    console.log(`${url}deleteadminmessage?messageid=${messageId}`);

    const token = Cookies.get("adminuser");
    const api = `${url}deleteadminmessage?messageid=${messageId}`;
    const options = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await fetch(api, options);
      if (!response.ok) {
        throw new Error(`Failed to delete message with ID ${messageId}`);
      }
      const data = await response.json();
      Toast.fire({
        icon: "success",
        title: data.message,
      });
      // Refetch messages after deletion
      fetchData();
    } catch (error) {
      console.error("Error deleting message:", error);
      Toast.fire({
        icon: "error",
        title: "Failed to delete message",
      });
    }
  };

  const handleImageClick = (imageUrl) => {
    console.log(imageUrl,"kapil")
    window.open(imageUrl, "_blank"); // Open the image in a new tab/window
    // Alternatively, use a modal or a lightbox library to display the image
  };

  const columns = [
    {
      field: "id",
      headerName: "ID",
      minWidth: 30,
      headerClassName: "super-app-theme--header",
      align: "left",
      headerAlign: "left",
      flex: 1,
    },
    {
      field: "type",
      headerName: "Type",
      headerAlign: "left",
      headerClassName: "super-app-theme--header",
      minWidth: 50,
      align: "left",
    
    },
    {
      field: "title",
      headerName: "Title",
      headerClassName: "super-app-theme--header",
      minWidth: 250,
      align: "left",
      headerAlign: "left",
      
    },
    // {
    //   field: "description",
    //   headerName: "Description",
    //   type: "number",
    //   headerClassName: "super-app-theme--header",
    //   minWidth: 110,
    //   align: "center",
    //   headerAlign: "center",
    //   flex: 1,
    // },
    {
      field: "description",
      headerName: "Description",
      headerClassName: "super-app-theme--header",
      minWidth: 250,
      align: "left",
      headerAlign: "left",
     
      renderCell: (params) => {
        const description = params.value;

        if (!description) {
          return null;
        }

        const cellStyle = {
          cursor: "pointer",
          whiteSpace: "pre-wrap",
          wordBreak: "break-word",  // Break words when needed
         // Limit height to prevent excessive cell expansion
         // Allow text to wrap
          // Ensure long words are broken correctly
        };

        const imageUrl = `${process.env.REACT_APP_IMAGE_URL}${description}`;
        console.log("Image URL:", imageUrl); 

        // Check if the description is an image URL
        if (
          description.endsWith(".jpg") ||
          description.endsWith(".jpeg") ||
          description.endsWith(".png")
        ) {
          return (
            // <img
            //   src={imageUrl}
            //   alt="Description"
            //   style={{ cursor: "pointer" }}
            //   onClick={() => handleImageClick(imageUrl)}
            // />
            <p
              style={{ cursor: "pointer", color: "#194373" }}
              onClick={() => handleImageClick(imageUrl)}
              className="m-0"
            >
              {imageUrl}
            </p>
          );
        }

        // Check if the description is an audio URL
        if (description.endsWith(".mp3")) {
      
          return (
            <p
              style={{ cursor: "pointer", color: "#194373" }}
              onClick={() =>
                window.open(
                  `${process.env.REACT_APP_IMAGE_URL}${description}`,
                  "_blank"
                )
              }
              className="m-0"
            >
              {description}
            </p>
          );
        }

        // Default: Render as plain text
        return <span style={cellStyle}>{description}</span>;
      },
    },
    {
      field: "expirydate",
      headerName: "Expiry Date",
      type: "number",
      headerClassName: "super-app-theme--header",
      minWidth: 150,
      align: "center",
      headerAlign: "center",
      flex: 1,
      valueGetter: (params) => {
        if (!params.value) return "";
        const startTime = new Date(params.value);
        const options = {
          timeZone: "Asia/Kolkata",
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        };
        return startTime.toLocaleString("en-IN", options);
      },
    },
    {
      field: "startdate",
      headerName: "Start Date",
      type: "number",
      headerClassName: "super-app-theme--header",
      minWidth: 150,
      align: "center",
      headerAlign: "center",
      flex: 1,
      valueGetter: (params) => {
        if (!params.value) return "";
        const startTime = new Date(params.value);
        const options = {
          timeZone: "Asia/Kolkata",
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        };
        return startTime.toLocaleString("en-IN", options);
      },
    },
    {
      field: "enddate",
      headerName: "End Date",
      type: "number",
      headerClassName: "super-app-theme--header",
      minWidth: 150,
      align: "center",
      headerAlign: "center",
      flex: 1,
      valueGetter: (params) => {
        if (!params.value) return "";
        const startTime = new Date(params.value);
        const options = {
          timeZone: "Asia/Kolkata",
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        };
        return startTime.toLocaleString("en-IN", options);
      },
    },

    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      minWidth: 100,
      cellClassName: "actions",
      align: "center",
      headerAlign: "center",
      headerClassName: "super-app-theme--header",
      flex: 1,
      getActions: ({ id }) => {
        const row = messages.find((r) => r.id === id);
        console.log(row, "rowrow");
        const isActive = row && row.status === 1;

        return [
          // <GridActionsCellItem
          //   icon={<FaCheck style={{ color: "#00cc00", fontSize: "22px" }} />}
          //   label="Edit"
          //   className="edit-list-icon"
          //   onClick={() => handleEnableClick(id)}
          //   color="yellow"
          // />,
          <GridActionsCellItem
            icon={
              <MdDeleteOutline style={{ color: "#ff0000", fontSize: "24px" }} />
            }
            label="Disable"
            onClick={() => handleDeleteClick(id)}
            color="red"
          />,
        ];
      },
    },
  ];

  const getRowId = (row) => row.id;

  const getRowClassName = (params) => {
    return params.row.id % 2 === 1 ? "even-row" : "odd-row";
  };

  const getRowHeight = (params) => {
    const lineHeight = 24; // Adjust based on your font size and line height
    const defaultHeight = 50; // Default row height
    const description = params.row.description || "";
    const numLines = Math.ceil(description.length / 50); // Adjust 50 based on desired characters per line
    const calculatedHeight = numLines * lineHeight + 30; // Calculate height with padding

    return Math.max(defaultHeight, calculatedHeight); // Ensure minimum height
  };


  return (
    <>
      <div className="masjid-message-container">
        <div className="masjid-message-sub-container">
          <h1 className="masjid-message-heading">ALL MESSAGES</h1>

          <button className="masjid-message-button" onClick={handleMessage}>
            Add message
          </button>
        </div>
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
              outline: "none !important", // Remove the focus outline
              border: "none !important", // Remove the border when the cell is focused
              boxShadow: "none !important", // Remove any box shadow
            },
            "& .even-row:hover, & .odd-row:hover": {
              backgroundColor: "#f2f2f2",
            },
          }}
        >
          <DataGrid
            rows={messages}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {},
              },
            }}
            getRowId={getRowId}
            rowHeight={getRowHeight}
            getRowClassName={getRowClassName}
            pageSizeOptions={[5, 10, 15, 20, 100]}
            disableSelectionOnClick // Add this line to disable cell selection
            selectionModel={{}}
            disableRowSelectionOnClick
            slots={{
              printOptions: {
                hideFooter: true,
                hideToolbar: true,
                includeCheckboxes: true,
              },
            }}
            getRowHeight={() => "auto"}
          />
        </Box>
      </div>
      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        style={{ width: "100%" }}
      >
        <Box
          sx={{
            position: "absolute",
            width: "90%",
            top: "50%",
            left: "50%",
            height: "500px",
            overflow: "scroll",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            borderRadius: "8px",
            p: 3,
          }}
        >
          <MessageForm onClose={handleCloseModal} fetchMessage={fetchData} />
        </Box>
      </Modal>
    </>
  );
};

export default AllMessages;
