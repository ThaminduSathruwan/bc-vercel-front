import { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto"; // Import Chart.js library

interface Miner {
  miner: string;
  miner_count: number;
}

interface StatsData {
  transaction_count: number;
  block_count: number;
  total_tx_amount: number;
  miners: Miner[];
}

const PieChart: React.FC<{ miners: StatsData["miners"] }> = ({ miners }) => {
  const [chartInstance, setChartInstance] = useState<Chart<"pie"> | null>(null);
  const chartContainer = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    let newChartInstance: Chart<"pie"> | null = null;

    if (chartContainer.current && miners) {
      if (chartInstance) {
        chartInstance.destroy(); // Destroy previous instance before rendering new one
      }

      const ctx = chartContainer.current.getContext("2d");
      if (ctx) {
        newChartInstance = new Chart(ctx, {
          type: "pie",
          data: {
            labels: miners.map((miner) => miner.miner),
            datasets: [
              {
                data: miners.map((miner) => miner.miner_count),
                backgroundColor: [
                  "#FF6384",
                  "#36A2EB",
                  "#FFCE56",
                  "#4BC0C0",
                  "#9966FF",
                ],
                hoverBackgroundColor: [
                  "#FF6384",
                  "#36A2EB",
                  "#FFCE56",
                  "#4BC0C0",
                  "#9966FF",
                ],
              },
            ],
          },
        });
        setChartInstance(newChartInstance);
      }
    }

    return () => {
      if (newChartInstance) {
        newChartInstance.destroy();
      }
    };
  }, [miners]);

  return <canvas ref={chartContainer} />;
};

export default PieChart;
