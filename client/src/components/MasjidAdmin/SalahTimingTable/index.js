import React, { useEffect, useState } from "react";
import { BsPlus } from "react-icons/bs";
import "./index.css";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import {
  DataGrid,
  GridActionsCellItem,
  GridRowModes,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";
import { IoMdAddCircleOutline } from "react-icons/io";

import { PiDotsThreeVerticalFill } from "react-icons/pi";
import { FiEdit } from "react-icons/fi";
import { Menu, MenuItem, TextField } from "@mui/material";
import Cookies from "js-cookie";
import Toast from "../../utils/Toast";
import Spinner from "../../Loader";

function SalahTimingTable() {
  const [rowModesModel, setRowModesModel] = React.useState({});
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [masjidTimings, setMasjidTimings] = useState([]);
  const [rows, setRows] = React.useState([]);
  const [hourId, sethourId] = useState();

  const [selectedMonth, setSelectedMonth] = useState("1");
  const [filteredRows, setFilteredRows] = useState([]);

  const [loading, setLoading] = useState(false);

  const url = process.env.REACT_APP_BASE_URL;
  const token = Cookies.get("adminuser");

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowBlur) {
      // Stop edit mode when focus is lost
      setRowModesModel((prevRowModesModel) => ({
        ...prevRowModesModel,
        [params.id]: { mode: GridRowModes.View },
      }));
    }
  };

  const handleEditClick = (id) => () => {
    console.log(id, "id1");
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => async () => {
    console.log(id, "id");
    try {
      console.log(id, "hai hello");
      // Process the row update
      const response = await fetch(`${url}updateTimingRow/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(rows.find((row) => row.id === id)),
      });

      if (!response.ok) {
        throw new Error("Failed to update row");
      }
      setLoading(false);

      // Update the state after a successful save
      const updatedRow = await response.json();
      console.log(updatedRow, "hello save");
      setRows((prevRows) =>
        prevRows.map((row) => (row.id === id ? updatedRow.data : row))
      );

      // Stop edit mode
      setRowModesModel((prevRowModesModel) => ({
        ...prevRowModesModel,
        [id]: { mode: GridRowModes.View },
      }));
    } catch (error) {
      setLoading(false);
      console.error("Error updating row:", error);
    }
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = async (newRow) => {
    console.log("New row:", newRow);

    try {
      console.log(newRow);
      const response = await fetch(`${url}updateTimingRow`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newRow),
      });

      if (response.ok) {
        const updatedRowWithId = await response.json();
        console.log("Updated row with id:", updatedRowWithId);

        if (!updatedRowWithId.data.id) {
          throw new Error('Updated row is missing the "id" property.');
        }

        setRows((prevRows) =>
          prevRows.map((row) =>
            row.id === updatedRowWithId.data.id ? updatedRowWithId.data : row
          )
        );
        return updatedRowWithId.data;
      } else {
        throw new Error("Failed to update row");
      }
    } catch (error) {
      console.error("Error updating row:", error);
      throw error;
    }
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const addMasjidTime = () => {
    alert("Are you sure");
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMultiMenuClick = (id) => (event) => {
    handleMenuClick(event);
    sethourId(id);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${url}getmasjeedtimings`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        setLoading(false);
        const data = await response.json();
        setRows(data.data);
        console.log(
          "Row IDs:",
          data.data.map((row) => row.id)
        );
        console.log("Row structure:", data.data[0]);
        console.log(data.data, data.data);
      } else {
        setLoading(false);
        setRows("");
      }
    } catch (error) {
      setLoading(false);
      setRows("");
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  console.log(rows, "kapil");

  const handleProcessRowUpdateError = (error) => {
    console.error("Error updating row:", error);
  };

  const TimeInput = React.forwardRef(({ value, onChange, ...props }, ref) => {
    const handleChange = (e) => {
      onChange(e.target.value);
    };

    return (
      <input
        {...props}
        ref={ref}
        type="time"
        step="300" // 5 minutes interval
        value={value || ""} // Ensure that value is never null or undefined
        onChange={handleChange}
        style={{ border: "none", outline: "none" }}
      />
    );
  });

  const handleAction1 = async (id) => {
    try {
      console.log(rows, "kukka");

      const editedRow = rows.find((row) => row.id === hourId);
      console.log(editedRow);
      const { day, fajr, shouruq, dhuhr, asr, maghrib, isha, month } =
        editedRow;

      const dataToSend = {
        day,
        month,
        fajr,
        shouruq,
        dhuhr,
        asr,
        maghrib,
        isha,
      };

      console.log(dataToSend, "pandi");

      // Make the API call to update the row
      const response = await fetch(`${url}addhrtorow`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(dataToSend),
        // You can send any necessary data in the request body
        // body: JSON.stringify({ /* any data you want to send */ }),
      });

      if (!response.ok) {
        throw new Error("Failed to perform Action 1");
      }

      // Update the state after a successful operation
      const updatedData = await response.json();
      // You may need to update the state or perform any other actions based on the response.

      // Close the menu
      handleMenuClose();
      fetchProducts();
    } catch (error) {
      console.error("Error performing Action 1:", error);
    }
  };

  const handleAction2 = async () => {
    try {
      console.log(rows, "kukka");

      const editedRow = rows.find((row) => row.id === hourId);
      console.log(editedRow);
      const { day, fajr, shouruq, dhuhr, asr, maghrib, isha, month } =
        editedRow;

      const dataToSend = {
        day,
        month,
        fajr,
        shouruq,
        dhuhr,
        asr,
        maghrib,
        isha,
      };

      console.log(dataToSend, "pandi");

      // Make the API call to update the row
      const response = await fetch(`${url}substracthrtorow`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(dataToSend),
        // You can send any necessary data in the request body
        // body: JSON.stringify({ /* any data you want to send */ }),
      });

      if (!response.ok) {
        throw new Error("Failed to perform Action 1");
      }
      const data = await response.json();
      Toast.fire({
        icon: "success",
        title: data.message,
      });
      fetchProducts();
      handleMenuClose();
      // Update the state after a successful operation
      const updatedData = await response.json();
      // You may need to update the state or perform any other actions based on the response.

      // Close the menu
    } catch (error) {
      console.error("Error performing Action 1:", error);
    }
  };

  const columns = [
    {
      field: "day",
      headerName: (
        <div style={{ display: "flex", alignItems: "center" }}>
          DAY{" "}
          <IoMdAddCircleOutline
            onClick={addMasjidTime}
            className="masjid-add-icon"
          />
        </div>
      ),
      minWidth: 100,
      flex: 1,
      align: "center",
      headerAlign: "center",
      editable: false,
      sortable: false,
    },
    {
      field: "fajr",
      headerName: (
        <div style={{ display: "flex", alignItems: "center" }}>FAJR</div>
      ),
      type: "string", // Change the type to 'string'
      minWidth: 100,
      flex: 1,
      align: "center",
      headerAlign: "center",
      editable: true,
      sortable: false,
      renderEditCell: (params) => {
        return (
          <TimeInput
            value={params.value}
            onChange={(newValue) =>
              params.api.setEditCellValue({
                id: params.id,
                field: params.field,
                value: newValue,
              })
            }
          />
        );
      },
      valueGetter: (params) => params.row.fajr,
    },
    {
      field: "shouruq",
      headerName: (
        <div style={{ display: "flex", alignItems: "center" }}>SHOURUQ</div>
      ),

      minWidth: 100,
      flex: 1,
      align: "center",
      headerAlign: "center",
      editable: true,
      sortable: false,
      renderEditCell: (params) => {
        return (
          <TimeInput
            value={params.value}
            onChange={(newValue) =>
              params.api.setEditCellValue({
                id: params.id,
                field: params.field,
                value: newValue,
              })
            }
          />
        );
      },
    },
    {
      field: "dhuhr",
      headerName: (
        <div style={{ display: "flex", alignItems: "center" }}>DHUHR</div>
      ),

      minWidth: 100,
      flex: 1,
      align: "center",
      headerAlign: "center",
      editable: true,
      sortable: false,
      renderEditCell: (params) => {
        return (
          <TimeInput
            value={params.value}
            onChange={(newValue) =>
              params.api.setEditCellValue({
                id: params.id,
                field: params.field,
                value: newValue,
              })
            }
          />
        );
      },
    },
    {
      field: "asr",
      headerName: (
        <div style={{ display: "flex", alignItems: "center" }}>ASR</div>
      ),

      minWidth: 100,
      flex: 1,
      align: "center",
      headerAlign: "center",
      editable: true,
      sortable: false,
      renderEditCell: (params) => {
        return (
          <TimeInput
            value={params.value}
            onChange={(newValue) =>
              params.api.setEditCellValue({
                id: params.id,
                field: params.field,
                value: newValue,
              })
            }
          />
        );
      },
    },
    {
      field: "maghrib",
      headerName: (
        <div style={{ display: "flex", alignItems: "center" }}>MAGHRIB</div>
      ),

      minWidth: 100,
      flex: 1,
      align: "center",
      headerAlign: "center",
      editable: true,
      sortable: false,
      renderEditCell: (params) => {
        return (
          <TimeInput
            value={params.value}
            onChange={(newValue) =>
              params.api.setEditCellValue({
                id: params.id,
                field: params.field,
                value: newValue,
              })
            }
          />
        );
      },
    },
    {
      field: "isha",
      headerName: (
        <div style={{ display: "flex", alignItems: "center" }}>ISHA</div>
      ),

      minWidth: 100,
      flex: 1,
      align: "center",
      headerAlign: "center",
      editable: true,
      sortable: false,
      renderEditCell: (params) => {
        return (
          <TimeInput
            value={params.value}
            onChange={(newValue) =>
              params.api.setEditCellValue({
                id: params.id,
                field: params.field,
                value: newValue,
              })
            }
          />
        );
      },
    },
    {
      field: "actions",
      type: "actions",
      headerName: "ACTIONS",
      flex: 1,
      minWidth: 100,
      cellClassName: "actions",
      headerClassName: "header-red-background",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: "primary.main",
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<FiEdit className="vertical-dot-icon" />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          // <GridActionsCellItem
          //   icon={<DeleteIcon />}
          //   label="Delete"
          //   onClick={handleDeleteClick(id)}
          //   color="inherit"
          // />,
          <GridActionsCellItem
            icon={<PiDotsThreeVerticalFill className="vertical-dot-icon" />}
            label="MultiMenu"
            onClick={handleMultiMenuClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  useEffect(() => {
    console.log(rows, "kali");
    // Filter rows based on the selected month
    const filteredData =
      rows && rows.filter((row) => row.month === parseInt(selectedMonth));
    console.log(filteredData, selectedMonth, "filteredData");
    setFilteredRows(filteredData);
  }, [rows, selectedMonth]);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className="select-month-type-container">
            <select
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="selct-month-container"
            >
              <option value="1">January 2024</option>
              <option value="2">February 2024</option>
              <option value="3">March 2024</option>
              <option value="4">April 2024</option>
              <option value="5">May 2024</option>
              <option value="6">June 2024</option>
              <option value="7">July 2024</option>
              <option value="8">August 2024</option>
              <option value="9">September 2024</option>
              <option value="10">October 2024</option>
              <option value="11">November 2024</option>
              <option value="12">December 2024</option>
            </select>
          </div>
          <Box
            sx={{
              height: "100vh",
              width: "100%",
              "& .actions": {
                color: "text.secondary",
              },
              "& .textPrimary": {
                color: "text.primary",
              },
            }}
          >
            <DataGrid
              rows={filteredRows}
              columns={columns}
              //editMode="row"
              rowModesModel={rowModesModel}
              onRowModesModelChange={handleRowModesModelChange}
              onRowEditStop={handleRowEditStop}
              processRowUpdate={processRowUpdate}
              className="header-red-background"
              onProcessRowUpdateError={handleProcessRowUpdateError}
              autoPageSize
              pageSize={rows.length}
              disableColumnMenu
            />
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              transformOrigin={{ vertical: "right", horizontal: "right" }}
            >
              <MenuItem onClick={() => handleAction1()}>Add 1 hour</MenuItem>
              <MenuItem onClick={() => handleAction2()}>Minus 1 hour</MenuItem>
            </Menu>
          </Box>
        </>
      )}
    </>
  );
}

export default SalahTimingTable;
