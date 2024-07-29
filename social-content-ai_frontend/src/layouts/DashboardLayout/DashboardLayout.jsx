import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import "./DashboardLayout.scss";

function DashboardLayout() {
  return (
    <div className="dashboardLayout">
      <div className="dashboardLayout__left">
        <Sidebar />
      </div>
      
      <div className="dashboardLayout__right">
        <Outlet />
      </div>
    </div>
  );
}

export default DashboardLayout;
