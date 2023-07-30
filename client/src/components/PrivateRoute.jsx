import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../context/UserContext";

export function PrivateRouteLogin() {
  const [state] = useContext(UserContext);

  if (!state.isLogin) {
    return <Navigate to="/" />;
  }
  return <Outlet />;
}

export function PrivateRouteUser() {
  const [state] = useContext(UserContext);

  if (state.user.role === "partner") {
    return <Navigate to="/partner" />;
  }
  return <Outlet />;
}

export function PrivateRoutePartner() {
  const [state] = useContext(UserContext);

  if (state.user.role !== "partner") {
    return <Navigate to="/" />;
  }
  return <Outlet />;
}
