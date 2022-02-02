import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';
import {
  // favoriteTickerRequest,
  // favoriteTickerSuccess,
  // favoriteTickerError,
  readTickers,
  changeFilter,
  // fetchTickersRequest,
  // fetchTickersSuccess,
  // fetchTickersError,
} from './tickers-actions';

const items = createReducer([], {
  [readTickers]: (_, { payload }) => payload,
  // [favoriteTickerSuccess]: (state, { payload }) => state.filter(({ id }) => id !== payload),
});

// const loading = createReducer(false, {
//   [fetchTickersRequest]: () => true,
//   [fetchTickersSuccess]: () => false,
//   [fetchTickersError]: () => false,
//   [favoriteTickerRequest]: () => true,
//   [favoriteTickerSuccess]: () => false,
//   [favoriteTickerError]: () => false,
// });

const filter = createReducer('', {
  [changeFilter]: (_, { payload }) => payload,
});

const error = createReducer(null, {});

export default combineReducers({
  items,
  filter,
  // loading,
  error,
});
