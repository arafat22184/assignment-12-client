import React from "react";
import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Authentications/Login";
import Register from "../pages/Authentications/Register";
import DashboardLayout from "../layouts/DashboardLayout";
import Subscribers from "../pages/Admin/Subscribers";
import PrivateRoute from "../routes/PrivateRoute";
import AdminRoute from "../routes/AdminRoute";

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        path: "subscribers",
        element: (
          <AdminRoute>
            <Subscribers></Subscribers>
          </AdminRoute>
        ),
      },
      {
        path: "allTrainers",
        element: (
          <AdminRoute>
            <AllTrainers></AllTrainers>
          </AdminRoute>
        ),
      },
      {
        path: "trainerApplications",
        element: (
          <AdminRoute>
            <TrainerApplications></TrainerApplications>
          </AdminRoute>
        ),
      },
      {
        path: "balance",
        element: (
          <AdminRoute>
            <Balance></Balance>
          </AdminRoute>
        ),
      },
    ],
  },
]);

export default router;
