import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/home';
import NavBar from './components/navigation';
import About from './components/about';
import Contact from './components/contact';
import Admissions from './components/admissions';
import Applications from './components/applications';
import Gallery from './components/gallery';
import NoPage from './components/noPage';
import './App.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import HeaderSlideshow from './components/slideShow';
import Footer from './components/footer';
import LoginButton from './components/loginButton';
import Login from './components/loginPage';
import Dashboard from './components/dashboard'; // Use the Dashboard component

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <HeaderSlideshow />
          <div className="header-content">
            <div className="header-flex-container">
              <p className="innerman-school">INNERMAN PRE & PRIMARY SCHOOL</p>
              <LoginButton className="login-button" />
            </div>
          </div>
        </header>
        <NavBar className="navbar" />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admissions" element={<Admissions />} />
            <Route path="/applications" element={<Applications />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} /> {/* Add route for Dashboard */}
            <Route path="*" element={<NoPage />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
