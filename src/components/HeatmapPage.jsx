import { useEffect, useState } from "react";

const HeatmapPage = () => {
  const [timeframe, setTimeframe] = useState(15);
  const [correlations, setCorrelations] = useState([]);
  const [stats, setStats] = useState({});

  useEffect(() => {
    fetch(
      `http://20.244.56.144/evaluation-service/correlation?interval=${timeframe}`
    )
      .then((res) => res.json())
      .then((data) => {
        setCorrelations(data.heatmap);
        setStats(data.stats);
      });
  }, [timeframe]);

  const getColor = (value) => {
    if (value > 0.75) return "#006400";
    if (value > 0.5) return "#32CD32";
    if (value > 0.25) return "#ADFF2F";
    if (value > 0) return "#FFFF99";
    if (value === 0) return "#FFFFFF";
    if (value > -0.25) return "#FFDAB9";
    if (value > -0.5) return "#FFA07A";
    if (value > -0.75) return "#FF4500";
    return "#8B0000";
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">
        Correlation Heatmap (Last {timeframe} min)
      </h2>
      <div className="mb-4">
        {[5, 15, 30, 60].map((interval) => (
          <button
            key={interval}
            onClick={() => setTimeframe(interval)}
            className="mr-2 px-3 py-1 bg-gray-300 rounded"
          >
            {interval} min
          </button>
        ))}
      </div>
      <div className="overflow-auto">
        <table className="border-collapse">
          <thead>
            <tr>
              <th className="border p-1">Stock</th>
              {correlations.map((row) => (
                <th key={row.stock} className="border p-1">
                  {row.stock}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {correlations.map((row) => (
              <tr key={row.stock}>
                <td className="border p-1">{row.stock}</td>
                {row.values.map((val, idx) => (
                  <td
                    key={idx}
                    className="border w-8 h-8 text-xs text-center cursor-pointer"
                    style={{ backgroundColor: getColor(val) }}
                    title={`Correlation: ${val.toFixed(2)}\nAvg: ${stats[
                      row.stock
                    ]?.average?.toFixed(2)}\nSD: ${stats[
                      row.stock
                    ]?.stdDev?.toFixed(2)}`}
                  >
                    {val.toFixed(2)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4">
        <p>
          <strong>Color Legend:</strong> Red - Strong Negative | White - Neutral |
          Green - Strong Positive
        </p>
      </div>
    </div>
  );
};

export default HeatmapPage;
