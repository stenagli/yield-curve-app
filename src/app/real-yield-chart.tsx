import { Suspense } from 'react'
import Loading from './loading'
import YieldChart from './chart';

export default async function RealYieldChart() {
  const real_data = (await (await fetch("https://home.treasury.gov/resource-center/data-chart-center/interest-rates/daily-treasury-rates.csv/all/202405?type=daily_treasury_real_yield_curve&field_tdr_date_value_month=202405&page&_format=csv")).text())

  return (
    <Suspense fallback={<Loading />}>
      <YieldChart yield_csv={real_data} title={'Real Yields'} />
    </Suspense>
  )
};
