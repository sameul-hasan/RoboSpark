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
    Component: DashboardProtected,
    children: [
      { index: true, Component: DashboardHome },
      { path: "teams", Component: TeamsPage },
    ],
  },
]);

export default router;
