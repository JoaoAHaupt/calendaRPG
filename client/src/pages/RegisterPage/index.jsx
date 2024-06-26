import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from "../../components/Header";
import './styles.css';
import axios from 'axios';
import VisibilityButton from '../../components/VisibilityButton';
import { AuthContext } from '../../assets/util/AuthContext';
import Dices from '../../components/Dices';
import D20 from '../../assets/images/d20.png';
import D100 from '../../assets/images/d100.png';
import D12 from '../../assets/images/d12.png';
import D6 from '../../assets/images/d6.png';
import D4 from '../../assets/images/d4.png';
import D8 from '../../assets/images/d8.png';

function RegisterPage() {
  const { setLoged, setUser } = useContext(AuthContext);
  const [visibility, setVisibility] = useState("password");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    let newUsername = e.target.value;
    if (newUsername[newUsername.length - 1] === " ") {
      newUsername = newUsername.slice(0, -1);
    }
    setUsername(newUsername);
  };

const handleSubmit = async () => {
    setMessage("");
  
    if (password !== confirmPassword) {
      setMessage("Passwords aren't the same");
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:5000/register', {
        username,
        email,
        password
      });
  
      if (response.status === 201) {
        try {
          console.log(username);
          console.log(email);

          const set_cookies = await axios.post('http://localhost:5000/set_cookies', {
            username,
            email 
          });
          setMessage("Cookies set successfully"); 
        } catch (error) {
          console.error(error);
          setMessage("Failed to set cookies");
        }
      }
    } catch (error) {
      setMessage(error.response.data.error || "Failed to register");
    }
  };
  

  return (
    <div>
      <Header />
      
      <div className="align_div">
        <div className='dice_div'>
          <Dices image={D4} height={40}/>
          <Dices image={D100} height={50}/>
          <Dices image={D12} height={130}/>
          <Dices image={D20} height={110}/>
          <Dices image={D8} height={80}/>
        </div>
          
        <div className='register_screen'>
          <h1>Register</h1>
          <div className='input_div'>
            <span>Username</span>
            <input
              type="text"
              value={username}
              onChange={handleUsernameChange}
              placeholder="Ex: Mr.Darkenss"
              maxLength={20}
            />
          </div>
          <div className='input_div'>
            <span>Email</span>
            <input
              type="email"
              value={email}
              onChange={(ev) => setEmail(ev.target.value)}
              placeholder="Ex: dark@mail.com"
              maxLength={120}
            />
          </div>
          <div className='input_div'>
            <span>Password</span>
            <input
              type={visibility}
              value={password}
              onChange={(ev) => setPassword(ev.target.value)}
              placeholder="Ex: prince0fD4rkness"
              maxLength={16}
            />
          </div>
          <div className='input_div'>
            <span>Confirm Password</span>
            <input
              type={visibility}
              value={confirmPassword}
              onChange={(ev) => setConfirmPassword(ev.target.value)}
              placeholder="Ex: prince0fD4rkness"
              maxLength={16}
            />
          </div>
          <p>{message}</p>
          
          <VisibilityButton visibility={visibility} setVisibility={setVisibility}/>          
          <div className='button_div'>
            <button onClick={handleSubmit} className='submit_button'>Let's roll!</button>
          </div>

          <p>Already have an account? <Link to="/login">Login</Link></p>
        </div>
        <div className='dice_div'>
          <Dices image={D4} height={40}/>
          <Dices image={D100} height={50}/>
          <Dices image={D20} height={110}/>
          <Dices image={D8} height={80}/>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
