import { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import Header from './components/Header';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AboutUsPage from './pages/AboutUsPage';
import RegisterPage from './pages/RegisterPage';

function App() {
  const [count, setCount] = useState(0);
  const [array, setArray] = useState([]);


  return (
    <Router>
      <div className='App'>
        <div className='content'>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/about us" element={<AboutUsPage />} />
            <Route path="/register" element={<RegisterPage/>} />

          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
