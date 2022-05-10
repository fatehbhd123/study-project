import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Welcome from "./components/Welcome/Welcome"
import About from "./components/About/About"
import ContactUs from './components/ContactUs/ContactUs';
import Footer from './components/Footer/Footer';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import "./components/Navbar/Navbar.css"
import "./components/Welcome/Welcome.css"
import "./components/About/About.css"
import "./components/ContactUs/ContactUs.css"
import "./components/Footer/Footer.css"
import "./components/Login/Login.css"
import "./components/Signup/Signup.css"
function App() {
  return (
    <Router>
      <Routes>
        <Route path='/'
          element={<>
            <Navbar />
            <Welcome />
            <About />
            <ContactUs />
            <Footer />
          </>}
        />
        <Route path="/login" element={<Login />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
