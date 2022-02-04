import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { AiOutlineHome, AiOutlineStar } from 'react-icons/ai';

import Authorization from '../Authorization';
import UserMenu from '../UserMenu';
import { authSelectors } from '../../redux/auth';
import s from './Header.module.css';

function Header({ children }) {
  const isLoggedIn = useSelector(authSelectors.getIsLoggedIn);

  return (
    <header className={s.header}>
      <div className={s.box}>
        <NavLink to="/" className={navData => (navData.isActive ? s.current : s.link)}>
          <AiOutlineHome></AiOutlineHome>
          <span className={s.text}>Home</span>
        </NavLink>
        {isLoggedIn && (
          <NavLink to="/favorite" className={navData => (navData.isActive ? s.current : s.link)}>
            <AiOutlineStar></AiOutlineStar>
            <span className={s.text}>Favorites</span>
          </NavLink>
        )}
      </div>
      {children}
      {isLoggedIn ? <UserMenu /> : <Authorization />}
    </header>
  );
}

export default Header;
