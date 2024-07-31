import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout/DashboardLayout";
import AuthenLayout from "../layouts/AuthenLayout/AuthenLayout";

import Authentication from "../pages/Authentication/Authentication";
import VerifyOTP from "../pages/Authentication/VerifyOTP";

import Error404 from "../pages/Error404/Error404";

import ServiceDashboard from "../pages/ServiceDashboard/ServiceDashboard";
import Profile from "../pages/Profile/Profile";
import StartFromScratch from "../pages/StartFromScratch/StartFromScratch";
import GenerateCaption from "../pages/StartFromScratch/GenerateCaption/GenerateCaption";
import CombinedSteps from "../pages/GetInspired/CombinedSteps";

import PrivateRoute from './PrivateRoute'; 

const appRoutes = [
  {
    path: "/auth",
    element: <AuthenLayout />,
    children: [
      { path: "login", element: <Authentication /> },
      { path: "verify-otp", element: <VerifyOTP /> },
    ],
  },
  {
    path: "/",
    element: <PrivateRoute />, 
    children: [
      {
        path: "",
        element: <DashboardLayout />,
        children: [
          { path: "", element: <ServiceDashboard /> },
          { path: "start-from-scratch", element: <StartFromScratch /> },
          { path: "generate-caption/:socialNetwork", element: <GenerateCaption /> },
          { path: "combined-steps", element: <CombinedSteps /> },
          { path: "profile", element: <Profile /> },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <Error404 />,
  },
];

export const router = createBrowserRouter(appRoutes);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
