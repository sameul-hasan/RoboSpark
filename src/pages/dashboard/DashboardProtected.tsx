import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export default function DashboardProtected() {
  const { isAuth, loadingAuth } = useAuth();

  if (loadingAuth) {
    return (
      <p className="text-center text-cyan-400 mt-40">
        Checking authentication...
      </p>
    );
  }

  return isAuth ? <Outlet /> : <Navigate to="/login" replace />;
}
