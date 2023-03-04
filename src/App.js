import { Routes, Route, Link, Navigate, Outlet } from 'react-router-dom'
import './App.css';

import Navbar from './components/Navbar';

import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Signup from './pages/Signup';

const App = () => {


  const getToken = () => {
    return localStorage.getItem("authToken")
  }

  const LoggedIn = () => {
    return getToken() ? <Outlet /> : <Navigate to="/" />;
  };

  const NotLoggedIn = () => {
    return !getToken() ? <Outlet /> : <Navigate to="/" />;
  };

  return (
    <div >

      <Navbar />

        <Routes>

          <Route path='/' element={<Home />} />

          <Route element={<LoggedIn />}>

            <Route path='/profile/:id' element={<Profile />} />

          </Route>

          <Route element={<NotLoggedIn />}>

            <Route path='/signup' element={<Signup />} />
            <Route path='/login' element={<Login />} />

          </Route>

        </Routes>

    </div>
  );
}

export default App;
