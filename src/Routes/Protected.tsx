import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export default function ProtectedRoute({ children }: any) {
  const { isAuth, loadingAuth } = useAuth();

  if (loadingAuth) {
    return (
      <div className="text-center text-cyan-300 p-10">
        Checking authentication...
      </div>
    );
  }

  if (!isAuth) return <Navigate to="/login" replace />;

  return children;
}
