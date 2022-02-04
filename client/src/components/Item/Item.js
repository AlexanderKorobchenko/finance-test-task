import { useDispatch } from 'react-redux';
import { FiArrowUp, FiArrowDown } from 'react-icons/fi';

import { tickersOperations } from '../../redux/tickers';
import s from './Item.module.css';

function Item({ ticker }) {
  const dispatch = useDispatch();
  const onFavoriteTicker = id => dispatch(tickersOperations.favoriteTicker(id));

  const changes = ticker.change - ticker.price;
  const percent = (Math.abs(changes) / ticker.price) * 100;

  return (
    <li className={s.item}>
      <span className={s.name}>{ticker.index}</span>
      <span className={s.name}>{ticker.name}</span>
      <div className={s.box_price}>
        <span className={s.price}>{ticker.change}$</span>
        <span className={s.change} style={{ color: changes > 0 ? '#157533' : '#A11216' }}>
          {changes > 0 && '+'}
          {changes.toFixed(2)}$
        </span>
        <span className={s.change_percent} style={{ color: changes > 0 ? '#157533' : '#A11216' }}>
          {changes > 0 ? <FiArrowUp /> : <FiArrowDown />}
          {percent.toFixed(2)}%
        </span>
        <button type="button" className={s.btn} onClick={() => onFavoriteTicker(ticker.id)}>
          +/-
        </button>
      </div>
    </li>
  );
}

export default Item;
