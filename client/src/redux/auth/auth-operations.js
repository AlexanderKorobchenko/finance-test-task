import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = 'https://sleepy-forest-52108.herokuapp.com/';

const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = '';
  },
};

//  POST /users/signup
//  body: { name, email, password }
const register = createAsyncThunk('auth/register', async credentials => {
  try {
    const { data } = await axios.post('/api/users/register', credentials);
    return data;
  } catch (error) {
    console.warn(error);
  }
});

//  POST /users/login
//  body: { email, password }
const logIn = createAsyncThunk('auth/login', async credentials => {
  try {
    const { data } = await axios.post('/api/users/login', credentials);
    token.set(data.token);
    return data;
  } catch (error) {
    console.warn(error);
  }
});

//  POST /users/logout
//  headers: Authorization: Bearer token
const logOut = createAsyncThunk('auth/logout', async () => {
  try {
    await axios.get('/api/users/logout');
    token.unset();
  } catch (error) {
    console.warn(error);
  }
});

//  GET /users/current
const fetchCurrentUser = createAsyncThunk('auth/refresh', async (_, thunkAPI) => {
  const state = thunkAPI.getState();
  const persistedToken = state.auth.token;

  if (persistedToken === null) {
    return thunkAPI.rejectWithValue();
  }

  token.set(persistedToken);
  try {
    const { data } = await axios.get('/api/users/current');
    return data;
  } catch (error) {
    console.warn(error);
  }
});

const operations = {
  register,
  logOut,
  logIn,
  fetchCurrentUser,
};
export default operations;
