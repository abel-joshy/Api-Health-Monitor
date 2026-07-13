import "../styles/recentAlerts.css";

function RecentAlerts({ apis }) {
  const alerts = [
    {
      type: "down",
      message: "Payment API is down",
      time: "10:30 AM"
    },
    {
      type: "warning",
      message: "Pickup API response is high",
      time: "10:25 AM"
    },
    {
      type: "success",
      message: "Auth API recovered",
      time: "10:20 AM"
    }
  ];

  return (
    <div className="recent-alerts-card">
      <h2 className="alert-title">Recent Alerts</h2>

      {alerts.map((alert, index) => (
        <div className="alert-item" key={index}>
          <div className="alert-left">
            <span className={`alert-dot ${alert.type}`}></span>
            <span>{alert.message}</span>
          </div>

          <span className="alert-time">{alert.time}</span>
        </div>
      ))}
    </div>
  );
}

export default RecentAlerts;