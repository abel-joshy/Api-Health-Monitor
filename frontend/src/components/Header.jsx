import "../styles/header.css";
import {
  Bell,
  RefreshCw,
  Calendar,
} from "lucide-react";

function Header({
  onRefresh,
  alertCount = 0,
  username = "AJ",
}) {
  return (
    <div className="header">
      <div className="header-left">
        <h1>API Health Dashboard</h1>
        <p>Monitor your APIs in real time</p>
      </div>

      <div className="header-right">
        <div className="time-filter">
          <Calendar size={18} />
          <span>Last 24 Hours</span>
        </div>

        <button
          className="refresh-btn"
          onClick={onRefresh}
          aria-label="Refresh dashboard"
        >
          <RefreshCw size={18} />
          Refresh
        </button>

        <div className="notification-icon">
          <Bell size={20} />

          <span className="notification-badge">
            {alertCount}
          </span>
        </div>

        <div className="profile">
          {username}
        </div>
      </div>
    </div>
  );
}

export default Header;