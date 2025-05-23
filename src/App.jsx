import { useState } from "react";
import StockPage from "./components/StockPage";
import HeatmapPage from "./components/HeatmapPage";
import Button from "@mui/material/Button";

function App() {
  const [currentPage, setCurrentPage] = useState("stock");

  return (
    <div className="p-4">
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Stock Aggregator</h1>
        <div>
          <button
            onClick={() => setCurrentPage("stock")}
            className="mr-2 px-3 py-1 bg-blue-600 text-white rounded"
          >
            Stock Page
          </button>
          <button
            onClick={() => setCurrentPage("heatmap")}
            className="px-3 py-1 bg-green-600 text-white rounded"
          >
            Heatmap Page
          </button>
        </div>
      </header>
      {currentPage === "stock" ? <StockPage /> : <HeatmapPage />}
    </div>
  );
}

export default App;
