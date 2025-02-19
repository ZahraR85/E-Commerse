import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const { user, role } = useContext(AuthContext);

  return user && role === "admin" ? children : <Navigate to="/" />;
};

export default AdminRoute;
