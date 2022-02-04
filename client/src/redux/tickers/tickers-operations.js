import axios from 'axios';

// GET @ / (all tickers)
const fetchAllTickers = () => async () => {
  try {
    await axios.get('/');
  } catch (error) {
    console.warn(error);
  }
};

// GET @ / (only favorite tickers)
const fetchFavoriteTickers = () => async () => {
  try {
    await axios.get('/favorite');
  } catch (error) {
    console.warn(error);
  }
};

// PATCH @ /tickers/:id (change favorite status)
const favoriteTicker = tickerId => async () => {
  try {
    const { data } = await axios.patch(`api/tickers/${tickerId}`);

    if (data.status) {
      alert('Ticker was added');
    } else {
      alert('Ticker was deleted');
    }
  } catch (error) {
    console.warn(error);
  }
};

const tickersOperations = {
  fetchAllTickers,
  fetchFavoriteTickers,
  favoriteTicker,
};
export default tickersOperations;
