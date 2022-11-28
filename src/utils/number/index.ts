export function numberFormat(num: number, options?: any) {
  let temp = 2;
  if (num < 1 && num > 0.0001) {
    temp = 4;
  }
  if (num < 0.0001) {
    temp = 8;
  }
  let defaultOptions = {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: temp,
    minimumFractionDigits: 2,
    notation: 'standard',
    compactDisplay: 'long',
  };
  return new Intl.NumberFormat('en-US', {
    ...defaultOptions,
    ...options,
  }).format(num);
}

export function normalizeMarketCap(marketCap: number) {
  if (marketCap > 1e12) {
    return `${(marketCap / 1e12).toFixed(3)} T`;
  }
  if (marketCap > 1e9) {
    return `${(marketCap / 1e9).toFixed(3)} B`;
  }
  if (marketCap > 1e6) {
    return `${(marketCap / 1e6).toFixed(3)} M`;
  }
  if (marketCap > 1e3) {
    return `${(marketCap / 1e3).toFixed(3)} K`;
  }
  return marketCap;
}

export function percentageColor(percentage: number) {
  return percentage < 0 ? '#ea3943' : '#16c784' || 'white';
}
