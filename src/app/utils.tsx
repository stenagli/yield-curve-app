export async function fetchRealData(): Promise<string> {
  return fetchData('daily_treasury_real_yield_curve');
}

export async function fetchNominalData(): Promise<string> {
  return fetchData('daily_treasury_yield_curve');
}

async function fetchData(type: string): Promise<string> {
  let data = await fetchDataToday(type);
  if (!data && day() === 1) {
    // This month's data has not been reported yet
    // so display the most recent data from last month
    data = await fetchDataYesterday(type);
  }
  return data;
}

function fetchDataToday(type: string) {
  return fetchDataTemplate({ yearMonth: yearMonthToday(), type });
}

function fetchDataYesterday(type: string) {
  return fetchDataTemplate({ yearMonth: yearMonthYesterday(), type });
}

async function fetchDataTemplate({ yearMonth, type }: {
  yearMonth: string;
  type: string
}) {
return (await fetch(`https://home.treasury.gov/resource-center/data-chart-center/interest-rates/daily-treasury-rates.csv/all/${yearMonth}?type=${type}&field_tdr_date_value_month=${yearMonth}&page&_format=csv`, { cache: 'no-store' })).text()
}

const day = () => new Date().getDate();

function yearMonthToday() {
  const today = new Date();
  return yearMonth(today)
}


function yearMonthYesterday() {
  const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000);
  return yearMonth(yesterday);
}

function yearMonth(date: Date): string {
  const year = date.getFullYear();
  const month = date.getMonth()+1;
  const paddedMonth = ('0' + month).slice(-2); // e.g. '05' for May
  return year + paddedMonth;
}
