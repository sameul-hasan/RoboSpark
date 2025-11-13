import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { Menu, X, Home, Users, Tag, LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const AdminLayout: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { logout } = useAuth();

  const menuItems = [
    { name: "Dashboard", icon: Home, path: "/dashboard" },
    { name: "Teams", icon: Users, path: "/dashboard/teams" },
    { name: "Coupons", icon: Tag, path: "/dashboard/coupons" },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white flex">
      {/* ===================== FIXED SIDEBAR (DESKTOP) ===================== */}
      <aside className="hidden md:flex flex-col w-64 bg-gray-800 border-r border-gray-700 p-6 fixed left-0 top-16 h-[calc(100vh-4rem)]">
        {/* Title */}
        <h2 className="text-2xl font-bold text-cyan-400 mb-10">Admin Panel</h2>

        {/* Navigation */}
        <nav className="flex flex-col space-y-2">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center px-4 py-3 rounded-lg 
                ${isActive ? "bg-cyan-600 text-black" : "hover:bg-gray-700/60"}`
              }
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.name}
            </NavLink>
          ))}
        </nav>

        {/* Logout Button */}
        <button
          onClick={logout}
          className="mt-auto flex items-center px-4 py-3 bg-red-600 rounded-lg hover:bg-red-500"
        >
          <LogOut className="w-5 h-5 mr-2" />
          Logout
        </button>
      </aside>

      {/* ===================== TOP NAVBAR ===================== */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-gray-800 border-b border-gray-700 flex items-center justify-between px-4 md:px-8 z-50">
        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 bg-gray-700 rounded-lg"
          onClick={() => setOpen(true)}
        >
          <Menu className="w-6 h-6 text-white" />
        </button>

        {/* Logo / Title */}
        <h1 className="text-xl md:text-2xl font-bold text-cyan-400">
          Admin Dashboard
        </h1>

        {/* Right side navbar items */}
        <div className="flex items-center gap-4">
          {/* Profile avatar placeholder */}
          <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center">
            <span className="text-sm">AD</span>
          </div>

          {/* Logout (desktop only) */}
          <button
            onClick={logout}
            className="hidden md:flex items-center px-4 py-2 bg-red-600 rounded-lg hover:bg-red-500"
          >
            <LogOut className="w-5 h-5 mr-2" />
            Logout
          </button>
        </div>
      </header>

      {/* ===================== MOBILE DRAWER SIDEBAR ===================== */}
      {open && (
        <div className="fixed inset-0 z-50 bg-black/60 md:hidden">
          <div className="absolute left-0 top-0 h-full w-64 bg-gray-800 p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-cyan-400">Menu</h2>
              <button className="text-white" onClick={() => setOpen(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>

            <nav className="flex flex-col space-y-2 mb-6">
              {menuItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center px-4 py-3 rounded-lg 
                    ${
                      isActive
                        ? "bg-cyan-600 text-black"
                        : "hover:bg-gray-700/60"
                    }`
                  }
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.name}
                </NavLink>
              ))}
            </nav>

            <button
              onClick={logout}
              className="flex items-center px-4 py-3 bg-red-600 rounded-lg hover:bg-red-500 w-full"
            >
              <LogOut className="w-5 h-5 mr-2" />
              Logout
            </button>
          </div>
        </div>
      )}

      {/* ===================== MAIN CONTENT AREA ===================== */}
      <main className="flex-1  md:ml-64 mt-16 w-full">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
