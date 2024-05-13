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
    labels: yield_data[0].split(',').slice(1),
    datasets: [{
      data: yield_data[1].split(',').slice(1),
      borderColor: 'rgb(75, 192, 192)'
    }]
  };

  return (
    <Line data={data} />
  );
}
