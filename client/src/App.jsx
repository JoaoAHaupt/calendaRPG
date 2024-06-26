import './App.css';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import MenuPage from './pages/MenuPage';
import AboutUs from './pages/AboutUsPage';
import { AuthProvider } from './assets/util/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className='App'>
          <div className='content'>
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/about-us" element={<AboutUs />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/menu" element={<MenuPage />} />
            </Routes>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
