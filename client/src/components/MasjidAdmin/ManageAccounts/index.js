import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import {Link} from 'react-router-dom';

import { Box, Modal } from "@mui/material";
import NewEditor from './Editor';
import EditButton from './EditButton';
 
const Manageaccounts = () => {
 
    const users = [
        { id: 1, email: 'user1@example.com', phone: '123-456-7890', createdAt: '2022-01-01', lastLoggedIn: '2022-01-15' },
        { id: 2, email: 'user2@example.com', phone: '987-654-3210', createdAt: '2022-01-05', lastLoggedIn: '2022-01-20' },
        // Add more user data as needed
      ];

      const [isModalOpen, setModalOpen] = React.useState(false);
      const [editModel,setEditModel] = useState(false)

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditModel(false)
  };

  const handleEditors=()=>{
    setModalOpen(true)
  }

  const handleEditButton=()=>{
    setEditModel(true)
  }
 
return(
<>
<div style={{margin: '70px'}}>
    <div style={{display: "flex", justifyContent: "space-between"}}>
        <h1 className='manage-heading1'>ALL EDITORS</h1>
        <button className='btn btn-info' style={{color: "white"}} onClick={handleEditors}>Add Editors</button>
    </div>
    <div className="container mt-5 manage-whole-container">
     
      <table className="table">
        <thead>
          <tr>
            <th className='manage-th manage-heading'>ID</th>
            <th className='manage-th manage-heading'>Email Address</th>
            <th className='manage-th manage-heading'>Phone</th>
            <th className='manage-th manage-heading'>Created At</th>
            <th className='manage-th manage-heading'>Last Logged In</th>
            <th className='manage-th manage-heading'>Actions</th>
          </tr>
        </thead>
        <tbody className='table-manage-body'>
          {users.map(user => (
            <tr key={user.id}>
              <td className='manage-para'>{user.id}</td>
              <td className='manage-para'>{user.email}</td>
              <td className='manage-para'>{user.phone}</td>
              <td className='manage-para'>{user.createdAt}</td>
              <td className='manage-para'>{user.lastLoggedIn}</td>
              <td>
                {/* Add your action buttons here */}
                <button className="edit-button-manage" onClick={handleEditButton}>Edit</button>
               
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
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
      <NewEditor
        onClose={handleCloseModal}
      />
    </Box>
  </Modal>

  <Modal
    open={editModel}
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
      <EditButton
        onClose={handleCloseModal}
      />
    </Box>
  </Modal>

</>
    )
}
 
export default Manageaccounts;