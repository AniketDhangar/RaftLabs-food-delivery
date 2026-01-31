import { Navigate } from "react-router-dom";
import { getUser, isAuthenticated } from "../../features/auth/auth.utils";

const AdminRoute = ({ children }) => {
  const user = getUser();

  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  if (user?.role !== "ADMIN") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminRoute;
