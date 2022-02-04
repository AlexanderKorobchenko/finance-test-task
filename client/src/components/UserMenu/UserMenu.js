import { useDispatch, useSelector } from 'react-redux';
import { IoLogOutOutline } from 'react-icons/io5';

import { authSelectors, authOperations } from '../../redux/auth';
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
        <IoLogOutOutline></IoLogOutOutline>
        Log out
      </button>
    </div>
  );
}

export default UserMenu;
