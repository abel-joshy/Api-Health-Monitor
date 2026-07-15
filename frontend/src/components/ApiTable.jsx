import "../styles/apiTable.css";
import axios from "axios";
import { useEffect, useState } from "react";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:8000";

function ApiTable() {
  const [apis, setApis] = useState([]);
  const [previousApis, setPreviousApis] = useState([]);

  const [showAlert, setShowAlert] = useState(false);
  const [downApis, setDownApis] = useState([]);

  const fetchApis = async () => {
    try {
      const res = await axios.get(
        `${API_BASE_URL}/api/monitor/all`
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

  useEffect(() => {
    if (previousApis.length === 0) {
      setPreviousApis(apis);
      return;
    }

    const newlyDownApis = apis.filter((api) => {
      const oldApi = previousApis.find(
        (p) => p.name === api.name
      );

      return (
        oldApi &&
        oldApi.status !== "DOWN" &&
        api.status === "DOWN"
      );
    });

    if (newlyDownApis.length > 0) {
      setDownApis(newlyDownApis);
      setShowAlert(true);
    }

    setPreviousApis(apis);
  }, [apis]);

  return (
    <>
      {showAlert && (
        <div
          className="emergency-overlay"
          onClick={() => setShowAlert(false)}
        >
          <div className="emergency-popup">
            <h1>🚨 CRITICAL INCIDENT 🚨</h1>

            <p>The following APIs are DOWN:</p>

            <ul>
              {downApis.map((api) => (
                <li key={api.name}>
                  {api.name}
                </li>
              ))}
            </ul>

            <p className="dismiss-text">
              Click anywhere to dismiss
            </p>
          </div>
        </div>
      )}

      <div className="api-table-card">
        <h2 className="table-title">
          API Status
        </h2>

        <table className="api-table">
          <thead>
            <tr>
              <th>API Name</th>
              <th>Status</th>
              <th>Response Time</th>
              <th>Status Code</th>
            </tr>
          </thead>

          <tbody>
            {apis.length > 0 ? (
              apis.map((api, index) => (
                <tr key={index}>
                  <td>{api.name}</td>

                  <td>
                    <span
                      className={`status-badge ${
                        api.status === "UP"
                          ? "status-up"
                          : api.status === "WARNING"
                          ? "status-warning"
                          : "status-down"
                      }`}
                    >
                      {api.status}
                    </span>
                  </td>

                  <td>
                    {api.response_time !== null
                      ? `${api.response_time} ms`
                      : "Timeout"}
                  </td>

                  <td>
                    {api.status_code ?? "-"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="no-data"
                >
                  No APIs found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ApiTable;