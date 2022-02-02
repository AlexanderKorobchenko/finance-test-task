const getLoading = state => state.tickers.loading;
const getFilter = state => state.tickers.filter;
const getTickers = state => state.tickers.items;

const tickersSelectors = {
  getLoading,
  getFilter,
  getTickers,
};
export default tickersSelectors;
