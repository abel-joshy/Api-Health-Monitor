import { useEffect, useState } from "react";
import axios from "axios";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import HealthScore from "../components/HealthScore";
import HealthOverview from "../components/HealthOverview";
import ResponseTime from "../components/ResponseTime";
import StatusCards from "../components/StatusCards";
import ApiTable from "../components/ApiTable";
import CategoryChart from "../components/CategoryChart";
import RecentAlerts from "../components/RecentAlerts";

import "../styles/dashboard.css";

// Reads API URL from frontend/.env
const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:8000";

function Dashboard() {
  const [apis, setApis] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState("");
  const [error, setError] = useState("");

  const fetchApis = async () => {
    try {
      const res = await axios.get(
        `${API_BASE_URL}/api/monitor/all`
      );

      setApis(res.data);
      setLastUpdated(new Date().toLocaleTimeString());
      setError("");
    } catch (err) {
      console.error("Failed to fetch APIs:", err);
      setError("Unable to connect to monitoring server.");
      setApis([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApis();

    const interval = setInterval(() => {
      fetchApis();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const totalApis = apis.length;

  const healthyApis = apis.filter(
    (api) =>
      api.status === "UP" ||
      api.status === "Healthy" ||
      api.status === "healthy"
  ).length;

  const downApis = totalApis - healthyApis;

  return (
    <div className="dashboard">
      <Sidebar />

      <div className="dashboard-content">
        <Header />

        {/* Dashboard Summary Cards */}
        <div className="dashboard-summary">
          <div className="summary-card">
            <h4>Total APIs</h4>
            <p>{totalApis}</p>
          </div>

          <div className="summary-card">
            <h4>Healthy APIs</h4>
            <p>{healthyApis}</p>
          </div>

          <div className="summary-card">
            <h4>Down APIs</h4>
            <p>{downApis}</p>
          </div>

          <div className="summary-card">
            <h4>Last Updated</h4>
            <p>{lastUpdated || "Loading..."}</p>
          </div>

          <div className="summary-card">
            <h4>Refresh Interval</h4>
            <p>3 Seconds</p>
          </div>

          <div className="summary-card">
            <h4>Environment</h4>
            <p>Production</p>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="loading-message">
            Loading API metrics...
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {/* Existing Dashboard Components */}
        <div className="top-grid">
          <HealthScore apis={apis} />
          <HealthOverview apis={apis} />
          <ResponseTime apis={apis} />
        </div>

        <StatusCards apis={apis} />

        <div className="bottom-grid">
          <ApiTable apis={apis} />

          <div className="right-panel">
            <CategoryChart apis={apis} />
            <RecentAlerts apis={apis} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;