import React, { createContext, useContext, useState, useEffect } from "react";

interface AuthContextType {
  isAuth: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  loadingAuth: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [loadingAuth, setLoadingAuth] = useState(true);

  useEffect(() => {
    const authState = localStorage.getItem("diurc_auth");
    if (authState === "true") setIsAuth(true);
    setLoadingAuth(false);
  }, []);

  const login = (email: string, password: string) => {
    if (email === "diurc@diu.edu.bd" && password === "diurc") {
      setIsAuth(true);
      localStorage.setItem("diurc_auth", "true");
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuth(false);
    localStorage.removeItem("diurc_auth");
  };

  return (
    <AuthContext.Provider value={{ isAuth, loadingAuth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext)!;
