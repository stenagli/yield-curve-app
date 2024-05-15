export async function fetchRealData(): Promise<string> {
  return fetchData('daily_treasury_real_yield_curve');
}

export async function fetchNominalData(): Promise<string> {
  return fetchData('daily_treasury_yield_curve');
}

async function fetchData(type: string): Promise<string> {
  return (await fetch(`https://home.treasury.gov/resource-center/data-chart-center/interest-rates/daily-treasury-rates.csv/all/${yearMonth()}?type=${type}&field_tdr_date_value_month=${yearMonth()}&page&_format=csv`)).text()
}

function yearMonth(): string {
  const today = new Date();
  const year = today.getFullYear();
  const month = ('0' + (today.getMonth()+1)).slice(-2); // e.g. '05' for May
  return year + month;
}
