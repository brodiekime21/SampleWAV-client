import { Routes, Route, Navigate, Outlet } from 'react-router-dom'
import './App.css';

import Navbar from './components/Navbar';

import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Signup from './pages/Signup';
import EditProfile from './pages/EditProfile';
import CreateSample from './pages/CreateSample';
import BrowseSamples from './pages/BrowseSamples';
import CreatePack from './pages/CreatePack';
import PackDetails from './pages/PackDetails';


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
          <Route path='/browse-samples' element={<BrowseSamples />} />

          <Route element={<LoggedIn />}>

            <Route path='/profile/:id' element={<Profile />} />
            <Route path='/edit-profile/:id' element={<EditProfile />} />
            <Route path='/create-sample' element={<CreateSample />} />
            <Route path='/create-pack' element={<CreatePack />} />
            <Route path='/pack-details/:id' element={<PackDetails />} />



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
