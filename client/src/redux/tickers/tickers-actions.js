import { createAction } from '@reduxjs/toolkit';

export const fetchTickersRequest = createAction('tickers/fetchTickersRequest');
export const fetchTickersSuccess = createAction('tickers/fetchTickersSuccess');
export const fetchTickersError = createAction('tickers/fetchTickersError');

export const favoriteTickerRequest = createAction('tickers/favoriteTickerRequest');
export const favoriteTickerSuccess = createAction('tickers/favoriteTickerSuccess');
export const favoriteTickerError = createAction('tickers/favoriteTickerError');

export const readTickers = createAction('tickers/readTickers');

export const changeFilter = createAction('tickers/changeFilter');
