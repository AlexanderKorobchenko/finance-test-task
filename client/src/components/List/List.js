import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import tickersSelectors from '../../redux/tickers/tickers-selectors';
import ListHeader from '../ListHeader';
import Item from '../Item';
import s from './List.module.css';

function List() {
  const tickers = useSelector(tickersSelectors.getTickers);
  const filter = useSelector(tickersSelectors.getFilter);

  function filtration(value) {
    if (value === '') {
      return tickers;
    } else {
      return tickers.filter(ticker => {
        return ticker.index.toLocaleLowerCase().includes(value);
      });
    }
  }

  return (
    <ul className={s.list}>
      <ListHeader />
      {filtration(filter).map(ticker => (
        <Item ticker={ticker} key={uuidv4()} />
      ))}
    </ul>
  );
}

export default List;
