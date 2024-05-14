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

class YieldData {
  data: string;

  _latestParsedData!: string[][];
  _latestData!: { x: number, y: number }[];

  constructor(data: string) {
    this.data = data;
  }

  latestLabel(): string {
    return this.latestParsedData()[1][0]
  }

  latestData(): { x: number, y: number }[] {
    if (this._latestData)
      return this._latestData;

    this._latestData = [];
    for (let step = 1; step < this.latestParsedData()[1].length; step++) {
      const labelField: string = this.latestParsedData()[0][step]
      this._latestData.push({
        x: Number(labelField.match(/(\d+)/)![0]) / (labelField.includes('Mo') ? 12 : 1),
        y: Number(this.latestParsedData()[1][step])
      });
    }
    return this._latestData;
  }

  latestParsedData(): string[][] {
    if (this._latestParsedData)
      return this._latestParsedData;

    const temp: string[][] = [];
    this.data.split('\n').forEach(row => temp.push(row.split(',')));

    this._latestParsedData = temp;
    return this._latestParsedData;
  }
}

export default function YieldChart({ yield_csv, title }: { yield_csv: string, title: string }) {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  const yieldData = new YieldData(yield_csv);

  const data = {
    datasets: [{
      label: yieldData.latestLabel(),
      data: yieldData.latestData(),
      borderColor: 'rgb(75, 192, 192)'
    }]
  };

  const options = {
    plugins: {
      title: {
        display: true,
        text: title
      }
    },
    scales: {
      x: {
        type: 'linear' as const
      }
    }
  };

  return (
    <div style={{ height: '95%' }}>
      <Line data={data} options={options} />
    </div>
  );
}
