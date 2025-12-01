import { createBrowserRouter, Navigate } from "react-router-dom";
import { AdminLayout } from "../layouts/AdminLayout";
import UserManagementPage from "../features/users/UserManagementPage";
import ContentManagementPage from "../features/content/ContentManagementPage";
import AnalyticsReportingPage from "../features/analytics/AnalyticsReportingPage";
import ClassroomToolsPage from "../features/classroom/ClassroomToolsPage";
import CoinEconomyPage from "../features/coins/CoinEconomyPage";
import SystemControlsPage from "../features/system/SystemControlsPage";
import CreativeBookPage  from "../features/books/CreativeBookPage";
import AuthLayout from "../features/auth/AdminLoginPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/admin/users" replace />,
  },
  {
    path: "/login",
    element: <AuthLayout />,
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { path: "users", element: <UserManagementPage /> },
      { path: "content", element: <ContentManagementPage /> },
      { path: "analytics", element: <AnalyticsReportingPage /> },
      { path: "classroom", element: <ClassroomToolsPage /> },
      { path: "coins", element: <CoinEconomyPage /> },
      { path: "system", element: <SystemControlsPage /> },
      { path: "books", element: <CreativeBookPage  /> },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/admin" replace />,
  },
]);

export default router;
