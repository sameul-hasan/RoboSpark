import React from "react";
import { useAuth } from "@/context/AuthContext";

const DashboardHome: React.FC = () => {
  const { logout } = useAuth();

  return (
    <div className="p-10 text-white">
      <h1 className="text-4xl font-bold text-cyan-400">Admin Dashboard</h1>

      <button onClick={logout} className="mt-6 bg-red-600 px-4 py-2 rounded-lg">
        Logout
      </button>

      <p className="mt-4 text-gray-300">
        Welcome to the protected admin dashboard.
      </p>
    </div>
  );
};

export default DashboardHome;
