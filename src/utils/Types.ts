export type CoinsArray = [];

export type Page = {
  page: CoinsArray;
  pageParam: number;
};

export type InfiniteQueryResponse = {
  pages: Page[];
  pageParams: number[];
  contacts: CoinsArray;
};
