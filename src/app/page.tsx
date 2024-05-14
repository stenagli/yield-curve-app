import YieldChart from './chart';

export default async function Home() {
  const real_data = (await (await fetch("https://home.treasury.gov/resource-center/data-chart-center/interest-rates/daily-treasury-rates.csv/all/202405?type=daily_treasury_real_yield_curve&field_tdr_date_value_month=202405&page&_format=csv")).text())

  const nominal_data = (await (await fetch('https://home.treasury.gov/resource-center/data-chart-center/interest-rates/daily-treasury-rates.csv/all/202405?field_tdr_date_value_month=202405&type=daily_treasury_yield_curve&page&_format=csv')).text())

  return (
    <>
      <YieldChart yield_csv={real_data} title={'Real Yields'} />
      <YieldChart yield_csv={nominal_data} title={'Nominal Yields'} />
    </>
  );
}
