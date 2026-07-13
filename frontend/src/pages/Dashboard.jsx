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

function Dashboard() {
  const [apis, setApis] = useState([]);

  const fetchApis = async () => {
    try {
      const res = await axios.get(
        "http://127.0.0.1:8000/api/monitor/all"
      );

      setApis(res.data);
    } catch (err) {
      console.error("Failed to fetch APIs:", err);
      setApis([]);
    }
  };

  useEffect(() => {
    fetchApis();

    const interval = setInterval(() => {
      fetchApis();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="dashboard">
      <Sidebar />

      <div className="dashboard-content">
        <Header />

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