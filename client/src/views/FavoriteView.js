import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import tickersOperations from '../redux/tickers/tickers-operations';
import Title from '../components/Title';
import Filter from '../components/Filter';
import List from '../components/List';

export default function TickersView() {
  const dispatch = useDispatch();
  useEffect(() => dispatch(tickersOperations.fetchFavoriteTickers()), [dispatch]);

  return (
    <>
      <Title>Financial statistics</Title>
      <Filter />
      <List />
    </>
  );
}
