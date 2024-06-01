import { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import Header from './components/Header';
import MainPage from './pages/MainPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  const [count, setCount] = useState(0);
  const [array, setArray] = useState([]);

  const fetchAPI = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/users');
      setArray(response.data.users);
    } catch (error) {
      console.error("Error fetching data from API", error);
    }
  };

  useEffect(() => {
    fetchAPI();
  }, []);

  return (
    <Router>
      <div className='App'>
        <div className='content'>
          <Routes>
            <Route path="/" element={<MainPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
