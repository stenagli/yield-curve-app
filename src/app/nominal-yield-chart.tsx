import { Suspense } from 'react'
import Loading from './loading'
import YieldChart from './chart';
import { fetchNominalData } from './utils';

export default async function RealYieldChart() {
  const nominal_data = await fetchNominalData();

  return (
    <Suspense fallback={<Loading />}>
      <YieldChart yield_csv={nominal_data} title={'Nominal Yields'} borderColor={'rgb(255, 87, 51)'} />
    </Suspense>
  )
};

