import { createAction } from '@reduxjs/toolkit';

export const readTickers = createAction('tickers/readTickers');
export const changeFilter = createAction('tickers/changeFilter');
