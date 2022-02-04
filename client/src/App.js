import { useEffect, Suspense, lazy } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import io from 'socket.io-client';
import { TailSpin } from 'react-loader-spinner';

import Container from './components/Container';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import Home from './views/HomeView';
import { authOperations } from './redux/auth';
import { readTickers } from './redux/tickers';

const Login = lazy(() => import('./views/LoginView' /* webpackChunkName: "login-page" */));
const Signup = lazy(() => import('./views/SignupView' /* webpackChunkName: "signup-page" */));
const Favorite = lazy(() => import('./views/FavoriteView' /* webpackChunkName: "favorite-page" */));

const socket = io.connect('https://sleepy-forest-52108.herokuapp.com/');
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
        <Suspense
          fallback={
            <div className="loader">
              <div className="spinner">
                <TailSpin color="#498ef2" height="50" />
              </div>
            </div>
          }
        >
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" redirectTo="/" element={<Login />} />
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
        </Suspense>
      </Container>
    </Router>
  );
}

export default App;
