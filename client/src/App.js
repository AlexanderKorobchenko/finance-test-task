import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import io from 'socket.io-client';

import Container from './components/Container';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import Home from './views/HomeView';
import Favorite from './views/FavoriteView';
import Login from './views/LoginView';
import Signup from './views/SignupView';
import { authOperations } from './redux/auth';
import { readTickers } from './redux/tickers';

const socket = io.connect('http://localhost:4000');
socket.emit('start');

function App() {
  const dispatch = useDispatch();

  socket.on('ticker', function (response) {
    dispatch(readTickers(response));
  });

  useEffect(() => {
    dispatch(authOperations.fetchCurrentUser());
  }, [dispatch]);
  return (
    <Router>
      <Container>
        <Header />

        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Signup />} />
          <Route
            exact
            path="/favorite"
            element={
              <PrivateRoute redirectTo="/login">
                <Favorite />
              </PrivateRoute>
            }
          ></Route>
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
