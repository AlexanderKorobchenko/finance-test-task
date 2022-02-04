import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { authOperations } from '../redux/auth';
import styles from './LoginView.module.css';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const handleChange = ({ target: { name, value } }) => {
    switch (name) {
      case 'name':
        return setName(value);
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

    if (name === '' || email === '' || password === '') {
      alert('Required field');
      return;
    }

    dispatch(authOperations.register({ name, email, password }));

    setName('');
    setEmail('');
    setPassword('');
    alert('You must be verified. Check your mail and follow the link in the letter.');
    navigate('/login');
  };
  return (
    <div className={styles.container}>
      <h4 className={styles.title}>
        Please fill out the form. Use valid data and <strong>real</strong> email!
      </h4>

      <form onSubmit={handleSubmit} className={styles.form} autoComplete="off">
        <label className={styles.label}>
          Your name
          <input
            className={styles.input}
            type="text"
            name="name"
            value={name}
            onChange={handleChange}
          />
        </label>

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
          Sign up
        </button>
      </form>
    </div>
  );
}

export default Signup;
