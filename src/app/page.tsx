import YieldChart from './chart';

export default async function Home() {
  const yield_data = (await (await fetch("https://home.treasury.gov/resource-center/data-chart-center/interest-rates/daily-treasury-rates.csv/all/202405?type=daily_treasury_real_yield_curve&field_tdr_date_value_month=202405&page&_format=csv")).text()).split("\n", 2);

  return (
    <YieldChart yield_data={yield_data} />
  );
}
