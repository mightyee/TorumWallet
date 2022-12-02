import axios from 'axios';

export const fetchCoins = async ({pageParam = 1}) => {
  const response = await axios.get(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=${pageParam}&sparkline=false&price_change_percentage=24h`,
  );

  const Coins = response.data;
  return {
    data: Coins,
    nextPage: pageParam + 1,
  };
};

export const getWatchlistedCoins = async (pageNumber = 1, coinIds: string) => {
  try {
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coinIds}&order=market_cap_desc&per_page=50&page=${pageNumber}&sparkline=false&price_change_percentage=24h`,
    );
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

export const getCoinDetails = async (coinId: string) => {
  try {
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${coinId}?localization=false&tickers=false&market_data=true&community_data=true&developer_data=false&sparkline=false`,
    );
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

export const getTickerDetails = async (coinId: string) => {
  try {
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=max`,
    );

    return response.data;
  } catch (e) {
    console.log(e);
  }
};
