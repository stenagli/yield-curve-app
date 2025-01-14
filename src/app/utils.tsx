// Represents a year and month in the format 'YYYYMM' (e.g., '202501' for January 2025)
type YearMonth = `${number}${number}${number}${number}${number}${number}`;

type TreasuryYieldType = 'daily_treasury_real_yield_curve' | 'daily_treasury_yield_curve';

export async function fetchRealData(): Promise<string> {
  return fetchData('daily_treasury_real_yield_curve');
}

export async function fetchNominalData(): Promise<string> {
  return fetchData('daily_treasury_yield_curve');
}

async function fetchData(type: TreasuryYieldType): Promise<string> {
  let data = await fetchDataToday(type);

  if (!data && day() === 1) {
    // This month's data has not been reported yet
    // so display the most recent data from last month
    data = await fetchDataYesterday(type);
  }

  if (!data) {
    throw new Error(`No data available for type: ${type}`);
  }

  return data;
}

function fetchDataToday(type: TreasuryYieldType) {
  return fetchDataTemplate({ yearMonth: yearMonthToday(), type });
}

function fetchDataYesterday(type: TreasuryYieldType) {
  return fetchDataTemplate({ yearMonth: yearMonthYesterday(), type });
}

async function fetchDataTemplate({ yearMonth, type }: {
  yearMonth: YearMonth;
  type: TreasuryYieldType
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

function yearMonth(date: Date): YearMonth {
  const year = date.getFullYear();
  const month = date.getMonth()+1;
  const paddedMonth = ('0' + month).slice(-2); // e.g. '05' for May
  const yearMonthString = year + paddedMonth;
  if (isValidYearMonth(yearMonthString))
    return yearMonthString as YearMonth;
  else
    throw new Error(`Invalid yearMonth: ${yearMonthString} (original date: ${date.toISOString()})`);
}

function isValidYearMonth(yearMonth: string): yearMonth is YearMonth {
  return /^\d{6}$/.test(yearMonth);
}
