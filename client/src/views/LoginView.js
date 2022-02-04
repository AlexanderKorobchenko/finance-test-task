import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Navigate } from 'react-router-dom';

import { authOperations, authSelectors } from '../redux/auth';
import styles from './LoginView.module.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(authSelectors.getIsLoggedIn);

  const handleChange = ({ target: { name, value } }) => {
    switch (name) {
      case 'email':
        return setEmail(value);
      case 'password':
        return setPassword(value);
      default:
        return;
    }
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (email === '' || password === '') {
      alert('Required field');
      return;
    }

    dispatch(authOperations.logIn({ email, password }));

    setEmail('');
    setPassword('');
  };

  return isLoggedIn ? (
    <Navigate to="/" />
  ) : (
    <div className={styles.container}>
      <h4 className={styles.title}>Please, enter your email and password</h4>

      <form onSubmit={handleSubmit} className={styles.form} autoComplete="off">
        <label className={styles.label}>
          Email
          <input
            className={styles.input}
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
          />
        </label>

        <label className={styles.label}>
          Password
          <input
            className={styles.input}
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
          />
        </label>

        <button type="submit" className={styles.btn}>
          Log in
        </button>
        <span className={styles.text}>
          or{' '}
          <NavLink to="/register" className={styles.link}>
            register a new profile
          </NavLink>
        </span>
      </form>
    </div>
  );
}

export default Login;
