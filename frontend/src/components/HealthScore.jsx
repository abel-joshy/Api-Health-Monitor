import "../styles/healthScore.css";
import {
  CircularProgressbar,
  buildStyles,
} from "react-circular-progressbar";

import "react-circular-progressbar/dist/styles.css";

function HealthScore({ apis }) {

  const healthyApis = apis.filter(
    (api) => api.status === "UP"
  ).length;

  const totalApis = apis.length;

  const score =
    totalApis > 0
      ? Math.round(
          (healthyApis / totalApis) * 100
        )
      : 0;

  let scoreColor = "#22c55e";

  if (score < 70) {
    scoreColor = "#f59e0b";
  }

  if (score < 40) {
    scoreColor = "#ef4444";
  }

  return (
    <div className="health-score-card">

      <div className="health-score-title">
        API Health Score
      </div>

      <div className="gauge-container">
        <CircularProgressbar
          value={score}
          text={`${score}%`}
          styles={buildStyles({
            textColor: "#ffffff",
            pathColor: scoreColor,
            trailColor: "#1f2937",
            textSize: "18px",
          })}
        />
      </div>

      <div className="health-score-label">
        Overall Health
      </div>

      <div
        className="health-score-change"
        style={{
          color:
            score >= 70
              ? "#22c55e"
              : score >= 40
              ? "#f59e0b"
              : "#ef4444"
        }}
      >
        {healthyApis} of {totalApis} APIs Healthy
      </div>

    </div>
  );
}

export default HealthScore;