import s from './List.module.css';

function ListHeader() {
  return (
    <li className={s.item}>
      <span className={s.name}>Index</span>
      <span className={s.name}>Name</span>
      <div className={s.box_price}>
        <span className={s.price}>Price</span>
        <span className={s.change}>Change on</span>
        <span className={s.change_percent}>Percent</span>
      </div>
    </li>
  );
}

export default ListHeader;
