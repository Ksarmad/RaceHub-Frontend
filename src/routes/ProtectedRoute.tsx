import { Navigate } from "react-router-dom";

import { authStorage } from "../lib/auth";

interface Props {
  children: React.ReactNode;
}

function ProtectedRoute({
  children,
}: Props) {
  const token =
    authStorage.getToken();

  if (!token) {
    return (
      <Navigate
        to="/admin/login"
        replace
      />
    );
  }

  return children;
}

export default ProtectedRoute;