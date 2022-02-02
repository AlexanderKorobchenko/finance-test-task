import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import tickersOperations from '../redux/tickers/tickers-operations';

import Title from '../components/Title';
import Filter from '../components/Filter';
import List from '../components/List';

export default function TickersView() {
  const dispatch = useDispatch();
  useEffect(() => dispatch(tickersOperations.fetchAllTickers()), [dispatch]);

  // const contacts = useSelector(contactsSelectors.getAllContacts);

  // const isLoadingContacts = useSelector(contactsSelectors.getLoading);

  return (
    <>
      <Title>Financial statistics</Title>
      <Filter />
      <List />
    </>
  );
}
