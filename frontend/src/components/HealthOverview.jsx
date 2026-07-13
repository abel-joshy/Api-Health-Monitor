import "../styles/healthOverview.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const data = [
  { time: "00:00", healthy: 85 },
  { time: "04:00", healthy: 88 },
  { time: "08:00", healthy: 92 },
  { time: "12:00", healthy: 90 },
  { time: "16:00", healthy: 84 },
  { time: "20:00", healthy: 87 },
  { time: "24:00", healthy: 89 },
];

function HealthOverview({ apis }) {
  return (
    <div className="health-overview-card">
      <h2>Health Overview</h2>

      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="healthy"
            stroke="#22c55e"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default HealthOverview;