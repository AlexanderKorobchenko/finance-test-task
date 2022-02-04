import { NavLink } from 'react-router-dom';
import { IoLogInOutline, IoDuplicateOutline } from 'react-icons/io5';
import s from './Authorization.module.css';

function Authorization() {
  return (
    <div className={s.container}>
      <NavLink to="/login" className={navData => (navData.isActive ? s.current : s.link)}>
        <IoLogInOutline />
        <span className={s.text}>Log in</span>
      </NavLink>
      <NavLink to="/register" className={navData => (navData.isActive ? s.current : s.link)}>
        <IoDuplicateOutline />
        <span className={s.text}>Sign up</span>
      </NavLink>
    </div>
  );
}

export default Authorization;
