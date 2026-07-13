import "../styles/categoryChart.css";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const data = [
  { name: "Healthy", value: 4 },
  { name: "Warning", value: 1 },
  { name: "Down", value: 1 },
];

const COLORS = ["#22c55e", "#f59e0b", "#ef4444"];

function CategoryChart({ apis }) {
  return (
    <div className="category-chart-card">
      <h2>Health by Category</h2>

      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            outerRadius={80}
          >
            {data.map((entry, index) => (
              <Cell
                key={index}
                fill={COLORS[index]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default CategoryChart;