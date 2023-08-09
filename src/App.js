import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import EditProfile from './components/EditProfile';
import Forgot from './components/Forgot';
import Reset from './components/Reset';
function App() {
  const userStatus = useSelector(state => state.user)
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={userStatus ? <Home /> : <Login />}></Route>
        <Route path="/register" element={userStatus ? <Home /> : <Register />}></Route>
        <Route path="/forgot" element={userStatus ? <Home /> : <Forgot />}></Route>
        <Route path="/reset-password" element={userStatus ? <Home /> : <Reset />}></Route>
        <Route path="/" element={userStatus ? <Home /> : <Login />}></Route>
        <Route path="/editProfile" element={userStatus ? <EditProfile /> : <Login />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
