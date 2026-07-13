import axios from "axios";
import { useEffect, useState } from "react";
import "../styles/statusCards.css";

function StatusCards({ apis }) {
  const [stats, setStats] = useState({
    total_apis: 0,
    healthy: 0,
    warning: 0,
    down: 0,
    average_response_time: 0
  });

 useEffect(() => {
  const fetchStats = () => {
   axios.get("http://127.0.0.1:8000/api/monitor/stats")
      .then((res) => {
        setStats(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  fetchStats(); // initial load

  const interval = setInterval(fetchStats, 3000);

  return () => clearInterval(interval);
}, []);
  return (
    <div className="status-cards">
      <div className="status-card">
        Healthy: {stats.healthy}
      </div>

      <div className="status-card">
        Down: {stats.down}
      </div>

      <div className="status-card">
        Warning: {stats.warning}
      </div>

      <div className="status-card">
        Total APIs: {stats.total_apis}
      </div>
    </div>
  );
}

export default StatusCards;