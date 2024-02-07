import logo from './logo.svg';
import './App.css';

import HomePageMain from './components/Home/HomePageMain';
import MasidRegister from './components/MasjidRegister';
import { Route, Routes } from 'react-router-dom';
import MasjidLogin from './components/MasjidLogin';
import SalahTimingTable from './components/MasjidAdmin/SalahTimingTable';
import AskQuestion from './components/AskQuestion';
import AllMessages from './components/MasjidAdmin/AllMessages';
import MessageForm from './components/MasjidAdmin/MessageForm';
import ForgotPassword from './components/MasjidForgotPassword';
import Iqamah from './components/MasjidAdmin/Iquamah';
import Manageaccounts from './components/MasjidAdmin/ManageAccounts';
import NewEditor from './components/MasjidAdmin/ManageAccounts/Editor';
import Edit from '@mui/icons-material/Edit';
import Editor from './components/MasjidAdmin/ManageAccounts/EditButton';
import MosqueForm from './components/MasjidAdmin/Masjid';
import AdminSideBar from './components/MasjidAdmin/AdminSideBar';
import SuperAdminSidebar from './components/SuperAdmin/SuperAdminSidebar';
import SuperAdminSignIn from './components/SuperAdmin/SuperAdminSignIn';
import SelectMasjid from './components/SelectMasjid';
import SingleMasjidTime from './components/SingleMasjidTime';
import MasjidOtpVerification from './components/MasjidOtp';
import ProtectedRoute from './components/protectedRoute';
import SuperAdminProtectedRoute from './components/SuperadminProtectedRoute';
import Clock from './components/Home/Clock';
import NotFound from './components/NotFound';

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={<HomePageMain />}
      />
      <Route
        path="/register"
        element={<MasidRegister />}
      />
      <Route path="/selectmasjid" element={<SelectMasjid/>}/>
      <Route path="/support" element={<AskQuestion/>}/>

      <Route path="/superadminlogin" element={<SuperAdminSignIn/>}/>

      <Route path="/login" element={<MasjidLogin/>}/>
      <Route path="/forgotpassword" element={<ForgotPassword/>}/>
      <Route path="/otpverification" element={<MasjidOtpVerification/>}/>

   
      <Route path="/admin" element={ <ProtectedRoute><AdminSideBar/></ProtectedRoute>}/>
      
      
      
      <Route path="/allmessages" element={<ProtectedRoute><AllMessages/></ProtectedRoute>}/>
      <Route path="/messageform" element={<ProtectedRoute><MessageForm/></ProtectedRoute>}/>
         
      <Route path="/neweditor" element={<ProtectedRoute><NewEditor/></ProtectedRoute>}/>
      <Route path="/edit" element={<ProtectedRoute><Editor/></ProtectedRoute>}/>
     
      <Route path="/superadmin" element={<SuperAdminProtectedRoute><SuperAdminSidebar/></SuperAdminProtectedRoute>}/>
      
      <Route path="/singlemasjid/:id" element={<SingleMasjidTime/>}/>

      <Route path="/clock" element={<Clock/>}/>
      <Route path="*" element={<NotFound />} />
      
    </Routes>
  )
}

export default App;
