import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import io from 'socket.io-client';

import Item from '../Item';
import ListHeader from '../ListHeader';
import s from './List.module.css';

const socket = io.connect('http://localhost:4000');
socket.emit('start');

function List() {
  const [tickers, setTickers] = useState([]);

  socket.on('ticker', function (response) {
    setTickers(response);
  });

  // useEffect(() => {
  //   return () => {
  //     console.log(socket.disconnected);
  //   };
  // });

  return (
    <ul className={s.list}>
      <ListHeader />
      {tickers.map(ticker => (
        <Item ticker={ticker} key={uuidv4()} />
      ))}
    </ul>
  );
}

export default List;
