import { useDispatch, useSelector } from 'react-redux';
import tickersSelectors from '../../redux/tickers/tickers-selectors';
import { changeFilter } from '../../redux/tickers/tickers-actions';
import s from './Filter.module.css';

const Filter = () => {
  const dispatch = useDispatch();
  const value = useSelector(tickersSelectors.getFilter);

  return (
    <label className={s.label}>
      Search
      <input
        className={s.input}
        type="text"
        name="filter"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Enter the active's name."
        required
        onChange={e => dispatch(changeFilter(e.target.value))}
        value={value}
      ></input>
    </label>
  );
};

export default Filter;
