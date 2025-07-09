import React from 'react';
import { BrowserRouter as Router,Routes,Route,Link, useLocation} from 'react-router-dom';

import Appointments from './components/Appointments';
import Doctors from './components/Doctors';
import Patients from './components/Patients';
import './App.css';
import logo from './img/bird_2.png';
const App = () => {
  const location = useLocation();

  const isLinkActive = (path) => location.pathname === path;

  return (
    <div className="container">
      <div className='imgs'>  
      <h1 style={{ color: "green" }}>
        <img src={logo} alt="" />
        Presa - Hospital Management App
      </h1>
      </div>
      <nav>
        <ul>
          <li className={isLinkActive('/appointments') ? 'active' : ''}>
            <Link to="/appointments">Appointments</Link>
          </li>
          <li className={isLinkActive('/doctors') ? 'active' : ''}>
            <Link to="/doctors">Doctors</Link>
          </li>
          <li className={isLinkActive('/patients') ? 'active' : ''}>
            <Link to="/patients">Patients</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Appointments />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/patients" element={<Patients />} />
      </Routes>
    </div>
  );
};

// Wrap App with Router in main entry point (e.g., index.js)
const WrappedApp = () => (
  <Router>
    <App />
  </Router>
);

export default WrappedApp;
