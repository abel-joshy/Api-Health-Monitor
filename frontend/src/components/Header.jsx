import "../styles/header.css";
import { Bell, RefreshCw, Calendar } from "lucide-react";

function Header() {
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
  onClick={() => window.location.reload()}
>
  <RefreshCw size={18} />
  Refresh
</button>

        <div className="notification-icon">
          <Bell size={20} />
          <span className="notification-badge">3</span>
        </div>

        <div className="profile">
          AJ
        </div>
      </div>
    </div>
  );
}

export default Header;