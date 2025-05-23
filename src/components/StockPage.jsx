import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const StockPage = () => {
  const [timeframe, setTimeframe] = useState(15);
  const [stockData, setStockData] = useState([]);

  useEffect(() => {
    fetch(`http://20.244.56.144/evaluation-service/stock?interval=${timeframe}`)
      .then((res) => res.json())
      .then((data) => setStockData(data));
  }, [timeframe]);

  const average =
    stockData.reduce((acc, d) => acc + d.price, 0) / stockData.length || 0;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">
        Stock Prices Over Last {timeframe} Minutes
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
      <LineChart width={800} height={400} data={stockData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="price" stroke="#8884d8" />
        <Line
          type="monotone"
          dataKey={() => average}
          stroke="#ff7300"
          dot={false}
          name="Average"
        />
      </LineChart>
    </div>
  );
};

export default StockPage;
