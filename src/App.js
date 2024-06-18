// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/home';
import NavBar from './components/navigation';
import About from './components/about';
import Contact from './components/contact';
import Admissions from './components/admissions';
import Applications from './components/applications';

import './App.css'; // Import the CSS file

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* Apply the CSS class here */}
        <p className="innerman-school">INNERMAN PRE & PRIMARY SCHOOL</p>
      </header>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admissions" element={<Admissions />} />
          <Route path="/apply" element={<Applications />} />
        </Routes>
      </Router>
      <About/>
      <Admissions/>
      <Applications/>
      <Contact/>
    </div>
  );
}

export default App;
