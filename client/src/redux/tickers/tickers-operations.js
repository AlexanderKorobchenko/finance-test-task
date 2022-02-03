import axios from 'axios';
import {
  favoriteTickerRequest,
  // favoriteTickerSuccess,
  favoriteTickerError,
  fetchTickersRequest,
  // fetchTickersSuccess,
  fetchTickersError,
} from './tickers-actions';

// GET @ / (all tickers)
const fetchAllTickers = () => async dispatch => {
  dispatch(fetchTickersRequest());
  try {
    await axios.get('/');
  } catch (error) {
    dispatch(fetchTickersError(error.message));
  }
};

// GET @ / (only favorite tickers)
const fetchFavoriteTickers = () => async dispatch => {
  dispatch(fetchTickersRequest());
  try {
    await axios.get('/favorite');
  } catch (error) {
    dispatch(fetchTickersError(error.message));
  }
};

// PATCH @ /tickers/:id (change favorite status)
const favoriteTicker = tickerId => async dispatch => {
  dispatch(favoriteTickerRequest());
  try {
    const { data } = await axios.patch(`api/tickers/${tickerId}`);
    console.log(data.status);
    // dispatch(favoriteTickerSuccess(status));
    if (data.status) {
      alert('Ticker was added');
    } else {
      alert('Ticker was deleted');
    }
  } catch (error) {
    dispatch(favoriteTickerError(error.message));
  }
};

const tickersOperations = {
  fetchAllTickers,
  fetchFavoriteTickers,
  favoriteTicker,
};
export default tickersOperations;
