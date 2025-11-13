import Navigation from "@/components/Navigation";
import React from "react";
import Footer from "@/components/Footer";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div>
      <Navigation />
      <Outlet />
      <Footer />
    </div>
  );
}
