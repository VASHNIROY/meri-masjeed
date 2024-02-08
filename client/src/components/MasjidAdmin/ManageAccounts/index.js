import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import { Box, Modal } from "@mui/material";
import NewEditor from './Editor';
import EditButton from './EditButton';
import Toast from '../../utils/Toast';
import Cookies from 'js-cookie';
 
const Manageaccounts = () => {

    const [users,setUsers] = useState([])
 
    // const users = [
    //     { id: 1, email: 'user1@example.com', phone: '123-456-7890', createdAt: '2022-01-01', lastLoggedIn: '2022-01-15' },
    //     { id: 2, email: 'user2@example.com', phone: '987-654-3210', createdAt: '2022-01-05', lastLoggedIn: '2022-01-20' },
    //     // Add more user data as needed
    // ];

    const [isModalOpen, setModalOpen] = useState(false);
    const [editModel, setEditModel] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const handleCloseModal = () => {
        setModalOpen(false);
        setEditModel(false);
    };

    const handleEditors = () => {
        setModalOpen(true);
    };

    const handleEditButton = (user) => {
        setSelectedUser(user);
        setEditModel(true);
    };

    const token = Cookies.get("user");

  const fetchData = async (
   
    ) => {
  
      
      console.log(token)
      
      const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        
      };
      const api = `http://localhost:3009/api/v1/getadminstaffdetails`;
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
        console.log(data,"kapil");
        setUsers(data.data);
        console.log(data.data,"kkkkk")
      } catch (error) {
        
        console.error("Error fetching data:", error);
      }
    };
  
    useEffect(() => {
      fetchData();
    }, []);
 
    return (
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
                                <th className='manage-th manage-heading'>Name</th>
                                <th className='manage-th manage-heading'>Email Address</th>
                                <th className='manage-th manage-heading'>Phone</th>
                               
                                <th className='manage-th manage-heading'>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='table-manage-body'>
                            {users.map(user => (
                                <tr key={user.id}>
                                    <td className='manage-para'>{user.id}</td>
                                    <td className='manage-para'>{user.name}</td>
                                    <td className='manage-para'>{user.email}</td>
                                    <td className='manage-para'>{user.phonenumber}</td>
                                   
                                    <td>
                                        {/* Add your action buttons here */}
                                        <button className="edit-button-manage" onClick={() => handleEditButton(user)}>Edit</button>
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
                    {selectedUser && (
                        <EditButton
                            user={selectedUser}
                            onClose={handleCloseModal}
                        />
                    )}
                </Box>
            </Modal>

        </>
    );
};
 
export default Manageaccounts;
