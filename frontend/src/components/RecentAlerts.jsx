import "../styles/recentAlerts.css";

function RecentAlerts({ apis = [] }) {
  const alerts = apis
    .filter(api => api.status !== "UP")
    .map(api => ({
      type: api.status === "DOWN" ? "down" : "warning",
      message:
        api.status === "DOWN"
          ? `${api.name} is DOWN`
          : `${api.name} response is slow`,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    }));

  return (
    <div className="recent-alerts-card">
      <h2 className="alert-title">Recent Alerts</h2>

      {alerts.length > 0 ? (
        alerts.map((alert, index) => (
          <div className="alert-item" key={index}>
            <div className="alert-left">
              <span className={`alert-dot ${alert.type}`}></span>
              <span>{alert.message}</span>
            </div>

            <span className="alert-time">
              {alert.time}
            </span>
          </div>
        ))
      ) : (
        <p className="no-alerts">
          🎉 No alerts. All APIs are healthy.
        </p>
      )}
    </div>
  );
}

export default RecentAlerts;