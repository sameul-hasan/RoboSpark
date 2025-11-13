import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const DashboardLogin: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("diurc@diu.edu.bd");
  const [password, setPassword] = useState("diurc");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    const success = login(email, password);
    navigate("/dashboard");
    if (success) {
      Swal.fire("Success!", "Dashboard Login Successful", "success");
    } else {
      Swal.fire("Invalid Credentials", "Try again", "error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center  text-white bg-gradient-to-br from-black via-gray-900 to-blue-950 p-6 border-gray-700/50">
      <form
        onSubmit={handleLogin}
        className="bg-gray-900 p-10 rounded-2xl border border-cyan-600 w-96"
      >
        <h1 className="text-3xl font-bold text-cyan-400 mb-6 text-center">
          Admin Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 p-3 rounded bg-gray-800 border border-gray-700"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 p-3 rounded bg-gray-800 border border-gray-700"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-cyan-600 py-3 rounded-lg text-black font-bold hover:bg-cyan-500"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default DashboardLogin;
