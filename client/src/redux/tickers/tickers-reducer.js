import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';
import { readTickers, changeFilter } from './tickers-actions';

const items = createReducer([], {
  [readTickers]: (_, { payload }) => payload,
});

const filter = createReducer('', {
  [changeFilter]: (_, { payload }) => payload,
});

// const error = createReducer(null, {});

export default combineReducers({
  items,
  filter,
  // error,
});
