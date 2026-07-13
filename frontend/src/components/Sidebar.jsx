import "../styles/sidebar.css";
import { NavLink } from "react-router-dom";

import {
  LayoutDashboard,
  Activity,
  Bell,
  BarChart3,
  Settings
} from "lucide-react";

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="logo-section">
        <div className="logo-circle">A</div>

        <div>
          <h2>API Monitor</h2>
          <p>Health Dashboard</p>
        </div>
      </div>

      <nav className="sidebar-nav">
        <NavLink to="/" className="nav-item">
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/apis" className="nav-item">
          <Activity size={20} />
          <span>APIs</span>
        </NavLink>

        <NavLink to="/alerts" className="nav-item">
          <Bell size={20} />
          <span>Alerts</span>
        </NavLink>

        <NavLink to="/reports" className="nav-item">
          <BarChart3 size={20} />
          <span>Reports</span>
        </NavLink>

        <NavLink to="/settings" className="nav-item">
          <Settings size={20} />
          <span>Settings</span>
        </NavLink>
      </nav>

     
    </div>
  );
}

export default Sidebar;