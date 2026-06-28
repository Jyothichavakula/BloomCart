import { Navigate } from "react-router-dom";

function AdminRoute({ children }) {

  const user = JSON.parse(

    localStorage.getItem("user")

  );

  return user?.isAdmin

    ? children

    : <Navigate to="/" />;

}

export default AdminRoute;