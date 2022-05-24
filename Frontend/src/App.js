import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';

import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import "./components/Landing/Landing.css"
import "./components/Navbar/Navbar.css"
import "./components/Welcome/Welcome.css"
import "./components/About/About.css"
import "./components/ContactUs/ContactUs.css"
import "./components/Footer/Footer.css"
import "./components/Login/Login.css"
import "./components/Signup/Signup.css"
import "./components/Beginner/Beginner.css"
import "./components/Level/Level.css"
import "./components/Chapter/Chapter.css"
import "./components/Advanced/Advanced.css"
import "./components/AdvancedChapter/AdvancedChapter.css"
import "./components/Association/Association.css"
import Advanced from './components/Advanced/Advanced';
import Beginner from './components/Beginner/Beginner';
import Chapter from './components/Chapter/Chapter';
import Level from './components/Level/Level';
import Association from './components/Association/Association';
import HomePage from './components/HomePage/HomePage';
import AdvancedChapter from './components/AdvancedChapter/AdvancedChapter';
import ErrorPage from "./components/ErrorPage/ErrorPage"
import { useDispatch, useSelector } from 'react-redux';
import { login, selectUser } from './components/features/userSlice';
import { useEffect } from 'react';
function App() {
  const user = useSelector(selectUser)
  // console.log(user)
  let navigate = useNavigate();
  let dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem('user')) {
      dispatch(login(
        JSON.parse(localStorage.getItem('user'))
      ))
    } else if (localStorage.getItem('association')) {
      dispatch(login(
        JSON.parse(localStorage.getItem('association'))
      ))
    }
    setTimeout(() => {
    }, 2000);
  }, [])
  return (<>
    <Routes>
      <>
        <Route path='/' element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/advanced' element={<Advanced />} />
        {user && <Route path='/beginner' element={<Beginner />} />}
        {user && <Route path='/beginner/level/chapter/:title' element={<Chapter />} />}
        {user && <Route path='/beginner/level/:level' element={<Level />} />}
        {user && <Route path="/association" element={<Association />} />}
        <Route path='/advanced/chapter/:title' element={<AdvancedChapter />} />
        <Route path='*' element={<ErrorPage />} />
      </>
    </Routes>
  </>
  );
}

export default App;
