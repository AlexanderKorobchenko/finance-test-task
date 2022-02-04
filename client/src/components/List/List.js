import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { TailSpin } from 'react-loader-spinner';

import tickersSelectors from '../../redux/tickers/tickers-selectors';
import ListHeader from '../ListHeader';
import Item from '../Item';
import s from './List.module.css';

function List() {
  const [loader, setLoader] = useState(true);
  const tickers = useSelector(tickersSelectors.getTickers);
  const filter = useSelector(tickersSelectors.getFilter);

  useEffect(() => {
    setTimeout(() => setLoader(false), 4000);
  }, []);

  function filtration(value) {
    if (value === '') {
      return tickers;
    } else {
      return tickers.filter(ticker => {
        return ticker.index.toLocaleLowerCase().includes(value);
      });
    }
  }

  return loader ? (
    <div className="loader">
      <div className="spinner">
        <TailSpin color="#498ef2" height="50" />
      </div>
    </div>
  ) : (
    <ul className={s.list}>
      <ListHeader />
      {filtration(filter).map(ticker => (
        <Item ticker={ticker} key={ticker.id} />
      ))}
    </ul>
  );
}

export default List;
