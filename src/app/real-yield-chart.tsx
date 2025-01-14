import { Suspense } from 'react'
import Loading from './loading'
import YieldChart from './chart';
import { fetchRealData } from './utils';

export default async function RealYieldChart() {
  return (
    <Suspense fallback={<Loading />}>
      <YieldChart yieldCsvPromise={fetchRealData()} title={'Real Yields'} borderColor={'rgb(75, 192, 192)'} />
    </Suspense>
  )
};
