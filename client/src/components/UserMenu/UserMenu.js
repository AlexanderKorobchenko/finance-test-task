import { useDispatch, useSelector } from 'react-redux';
import { authSelectors, authOperations } from '../../redux/auth';
// import LogoutIcon from '@mui/icons-material/Logout';
import s from './UserMenu.module.css';

function UserMenu() {
  const dispatch = useDispatch();
  const { name, avatar } = useSelector(authSelectors.getUser);

  return (
    <div className={s.container}>
      <div className={s.circle}>
        <img src={avatar} alt={name} className={s.img} />
      </div>
      <span className={s.text}>Welcome, {name ? name : 'User'}!</span>
      <button type="button" className={s.btn} onClick={() => dispatch(authOperations.logOut())}>
        {/* <LogoutIcon fontSize="small" /> */}
        Log out
      </button>
    </div>
  );
}

export default UserMenu;
