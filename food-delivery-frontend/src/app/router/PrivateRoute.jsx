import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../../features/auth/auth.utils";

const PrivateRoute = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
