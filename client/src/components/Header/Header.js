import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
// import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import Authorization from '../Authorization';
import UserMenu from '../UserMenu';
import { authSelectors } from '../../redux/auth';
import s from './Header.module.css';

function Header({ children }) {
  const isLoggedIn = useSelector(authSelectors.getIsLoggedIn);
  // const isLoggedIn = true;
  return (
    <header className={s.header}>
      <div className={s.box}>
        <NavLink to="/" className={navData => (navData.isActive ? s.current : s.link)}>
          <span className={s.text}>Home</span>
        </NavLink>
        {isLoggedIn && (
          <NavLink to="/favorite" className={navData => (navData.isActive ? s.current : s.link)}>
            <span className={s.text}>Favorites</span>
          </NavLink>
        )}
      </div>
      {children}
      {/* <NavLink to="/contacts" className={s.link} activeClassName={s.current}> */}
      {/* <ContactPhoneIcon /> */}
      {/* <span className={s.text}>Contacts</span> */}
      {/* </NavLink> */}
      {isLoggedIn ? <UserMenu name="Alex" /> : <Authorization />}
    </header>
  );
}

export default Header;
