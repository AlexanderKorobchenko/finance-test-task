import s from './Title.module.css';

function Title({ children }) {
  return <h1 className={s.title}>{children}</h1>;
}

export default Title;
