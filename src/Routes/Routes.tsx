import MainLayout from "@/Layouts/MainLayout";
import About from "@/pages/About";
import Competitions from "@/pages/Competitions";
import Contact from "@/pages/Contact";
import Login from "@/pages/Login";
import TeamsPage from "@/pages/dashboard/ShowAllTeam";
import Index from "@/pages/Index";
import NotFound from "@/pages/NotFound";
import Registration from "@/pages/Registration";
import { createBrowserRouter } from "react-router-dom";
import DashboardHome from "@/pages/dashboard/Index";
import DashboardProtected from "@/pages/dashboard/DashboardProtected";
import Coupon from "@/pages/dashboard/Coupons";
import AdminLayout from "@/Layouts/AdminLayout";
import ProtectedRoute from "./Protected";
import CouponManager from "@/pages/dashboard/Coupons";

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    errorElement: <NotFound />,
    children: [
      { index: true, Component: Index },
      { path: "about", Component: About },
      { path: "contact", Component: Contact },
      { path: "competitions", Component: Competitions },
      { path: "register", Component: Registration },
      { path: "login", Component: Login },
    ],
  },

  // DASHBOARD PROTECTED
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: "", element: <DashboardHome /> },
      { path: "teams", element: <TeamsPage /> },
      { path: "coupons", element: <CouponManager /> },
    ],
  },
]);

export default router;
