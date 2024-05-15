import { Suspense } from 'react'
import Loading from './loading'
import YieldChart from './chart';
import { fetchRealData } from './utils';

export default async function RealYieldChart() {
  const real_data = await fetchRealData();

  return (
    <Suspense fallback={<Loading />}>
      <YieldChart yield_csv={real_data} title={'Real Yields'} borderColor={'rgb(75, 192, 192)'} />
    </Suspense>
  )
};
