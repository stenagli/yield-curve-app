import { Suspense } from 'react'
import Loading from './loading'
import YieldChart from './chart';
import { fetchNominalData } from './utils';

export default async function RealYieldChart() {
  return (
    <Suspense fallback={<Loading />}>
      <YieldChart yieldCsvPromise={fetchNominalData()} title={'Nominal Yields'} borderColor={'rgb(255, 87, 51)'} />
    </Suspense>
  )
};

