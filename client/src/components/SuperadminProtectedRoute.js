import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Cookies from "js-cookie";

const SuperAdminProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  useEffect(() => {
    
    const token = Cookies.get("superuser")

    if (!token) {
      navigate("/superadminlogin");
    }
  }, [ navigate]);
  return children;
};

export default SuperAdminProtectedRoute;
