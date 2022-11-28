import {useInfiniteQuery} from '@tanstack/react-query';
import {fetchCoins} from '../services/api';
import {CoinsArray} from '../utils/Types';
import {useIsFocused} from '@react-navigation/native';

export const useInfiniteCoins = () => {
  const isFocused = useIsFocused();
  return useInfiniteQuery(['coins'], fetchCoins, {
    select: data => {
      const allPagesArray: CoinsArray[] = [];
      data?.pages
        ? data.pages.forEach(coin => allPagesArray.push(coin.data))
        : null;
      const flatCoins = allPagesArray.flat();

      return {
        pages: data.pages,
        pageParams: data.pageParams,
        coins: flatCoins,
      };
    },
    getNextPageParam: lastPage => {
      if (lastPage.data.length < 10) {
        return undefined;
      }
      return lastPage.nextPage;
    },
    onError: (error: Error) => console.log(error),
    // staleTime: 1000 * 60 * 60,
    refetchInterval: 50000, // setInterval autorefetch
    enabled: isFocused ? true : false, // enable/ disable query when it not focus
    refetchIntervalInBackground: false,
    keepPreviousData: true, // keep previous data for pagination
  });
};
