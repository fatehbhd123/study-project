import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Welcome from "./components/Welcome/Welcome"
import About from "./components/About/About"
import ContactUs from './components/ContactUs/ContactUs';
import Footer from './components/Footer/Footer';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import Landing from './components/Landing/Landing';
import "./components/Landing/Landing.css"
import "./components/Navbar/Navbar.css"
import "./components/Welcome/Welcome.css"
import "./components/About/About.css"
import "./components/ContactUs/ContactUs.css"
import "./components/Footer/Footer.css"
import "./components/Login/Login.css"
import "./components/Signup/Signup.css"
import "./components/Beginner/Beginner.css"
import Advanced from './components/Advanced/Advanced';
import Beginner from './components/Beginner/Beginner';
import Chapter from './components/Chapter/Chapter';
import Level from './components/Level/Level';
import Association from './components/Association/Association';
function App() {
  return (
    <Router>
      <Routes>
        <Route path='/'
          element={<>
            <Landing />
            <About />
            <ContactUs />
            <Footer />
          </>}
        />
        <Route path="/login" element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/advanced' element={<Advanced />} />
        <Route path='/beginner:username' element={<Beginner />} />
        <Route path='/level:level/chapter/:title' element={<Chapter />} />
        <Route path='/beginner:username/level:level' element={<Level />} />
        <Route path="/association:username" element={<Association />} />
      </Routes>
    </Router>
  );
}

export default App;
