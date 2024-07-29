import React from "react";
import { Outlet, createBrowserRouter } from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout/DashboardLayout";
import AuthenLayout from "../layouts/AuthenLayout/AuthenLayout";

import Authentication from "../pages/Authentication/Authentication";
import VerifyOTP from "../pages/Authentication/VerifyOTP";

import Error404 from "../pages/Error404/Error404";

import ServiceDashboard from "../pages/ServiceDashboard/ServiceDashboard";
import Profile from "../pages/Profile/Profile";
import StartFromScratch from "../pages/StartFromScratch/StartFromScratch";
import GetInspired from "../pages/GetInspired/GetInspired";
import GenerateCaption from "../pages/StartFromScratch/GenerateCaption/GenerateCaption";

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
      element: <DashboardLayout />,
      children: [
        { path: "", element: <ServiceDashboard /> }, 
        { path: "start-from-scratch", element: <StartFromScratch /> },
        { path: "start-from-scratch/faceboook-post", element: <GenerateCaption /> },
        

        { path: "get-inspired", element: <GetInspired /> },  
        
        
        { path: "profile", element: <Profile /> },     
      ],
    },
    {
      path: "*",
      element: <Error404 />,
    },
]

export const router = createBrowserRouter([
    {
      element: <Outlet />,
      children: appRoutes,
    },
  ]);