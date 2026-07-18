import "../styles/categoryChart.css";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

const COLORS = {
  Healthy: "#22c55e",
  Warning: "#f59e0b",
  Down: "#ef4444",
};

function CategoryChart({ apis = [] }) {
  const healthy = apis.filter(api => api.status === "UP").length;
  const warning = apis.filter(api => api.status === "WARNING").length;
  const down = apis.filter(api => api.status === "DOWN").length;

  const data = [
    { name: "Healthy", value: healthy },
    { name: "Warning", value: warning },
    { name: "Down", value: down },
  ].filter(item => item.value > 0);

  if (apis.length === 0) {
    return (
      <div className="category-chart-card">
        <h2>Health by Category</h2>
        <p>No API data available</p>
      </div>
    );
  }

  return (
    <div className="category-chart-card">
      <h2>Health by Category</h2>

      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            outerRadius={80}
            label
          >
            {data.map((entry) => (
              <Cell
                key={entry.name}
                fill={COLORS[entry.name]}
              />
            ))}
          </Pie>

          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default CategoryChart;