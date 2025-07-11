import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Authentications/Login";
import Register from "../pages/Authentications/Register";
import DashboardLayout from "../layouts/DashboardLayout";
import Subscribers from "../pages/Admin/Subscribers";
import PrivateRoute from "../routes/PrivateRoute";
import AdminRoute from "../routes/AdminRoute";
import AllTrainers from "../pages/Admin/AllTrainers";
import TrainerApplications from "../pages/Admin/TrainerApplications";
import Balance from "../pages/Admin/Balance";
import AddClass from "../pages/Admin/AddClass";
import TrainerRoute from "../routes/TrainerRoute";
import ManageSlots from "../pages/Trainer/ManageSlots";
import AddSlot from "../pages/Trainer/AddSlot";
import AddForum from "../pages/Trainer/AddForum";
import AllClasses from "../pages/AllClasses/AllClasses";
import AllTrainersHome from "../pages/AllTrainers/AllTrainersHome";
import BeTrainer from "../pages/BeTrainer/BeTrainer";

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
        path: "/classes",
        Component: AllClasses,
      },
      {
        path: "/trainers/:id",
        Component: AllTrainersHome,
      },
      {
        path: "beTrainer",
        element: (
          <PrivateRoute>
            <BeTrainer></BeTrainer>
          </PrivateRoute>
        ),
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
      {
        path: "addClass",
        element: (
          <AdminRoute>
            <AddClass></AddClass>
          </AdminRoute>
        ),
      },
      {
        path: "manageSlots",
        element: (
          <TrainerRoute>
            <ManageSlots></ManageSlots>
          </TrainerRoute>
        ),
      },
      {
        path: "addSlot",
        element: (
          <TrainerRoute>
            <AddSlot></AddSlot>
          </TrainerRoute>
        ),
      },
      {
        path: "addForum",
        element: (
          <TrainerRoute>
            <AddForum></AddForum>
          </TrainerRoute>
        ),
      },
    ],
  },
]);

export default router;
