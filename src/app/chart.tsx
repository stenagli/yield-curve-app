'use client'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import { Line } from 'react-chartjs-2';

export default function YieldChart({ yield_data }: { yield_data: string[] }) {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  const data = {
    labels: [5, 7, 10, 20, 30],
    datasets: [{
      label: yield_data[1].split(',')[0],
      data: yield_data[1].split(',').slice(1),
      borderColor: 'rgb(75, 192, 192)'
    }]
  };

  const options = {
    scales: {
      x: {
        type: 'linear' as const
      }
    }
  };

  return (
    <Line data={data} options={options} />
  );
}
