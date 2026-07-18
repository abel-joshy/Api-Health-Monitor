import axios from "axios";
import { useEffect, useState } from "react";
import "../styles/statusCards.css";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:8000";

function StatusCards() {
  const [stats, setStats] = useState({
    total_apis: 0,
    healthy: 0,
    warning: 0,
    down: 0,
    average_response_time: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await axios.get(
          `${API_BASE_URL}/api/monitor/stats`
        );

        setStats(data);
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      }
    };

    fetchStats();

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