import "../styles/responseTime.css";

function ResponseTime({ apis = [] }) {
  const validApis = apis.filter(
    (api) => api.response_time !== null
  );

  const averageResponseTime =
    validApis.length > 0
      ? Math.round(
          validApis.reduce(
            (sum, api) => sum + api.response_time,
            0
          ) / validApis.length
        )
      : 0;

  return (
    <div className="card">
      <h3>Average Response Time</h3>

      <h1>{averageResponseTime} ms</h1>

      <p>
        {validApis.length} APIs responding
      </p>
    </div>
  );
}

export default ResponseTime;