import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from "../../components/Header";
import './styles.css';
import axios from 'axios';
import VisibilityButton from '../../components/VisibilityButton';

import Dices from '../../components/Dices';
import D20 from '../../assets/images/d20.png';
import D100 from '../../assets/images/d100.png';
import D12 from '../../assets/images/d12.png';
import D6 from '../../assets/images/d6.png';
import D4 from '../../assets/images/d4.png';
import D8 from '../../assets/images/d8.png';


function LoginPage() {
  const [visibility, setVisibility] = useState("password");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("")
  const [color, setColor] = useState("white");

  const handleSubmitLogin = async () => {
    setMessage("");
    try {
      const loginResponse = await axios.post('http://localhost:5000/get_user', {
        email,
        password
      });
      
      const { id, username } = loginResponse.data;
  
      const setCookiesResponse = await axios.post('http://localhost:5000/set_cookies', {
        id,
        email,
        username
      }, { withCredentials: true });
  
      if (setCookiesResponse.status === 200) {
        setColor("green");
        setMessage('Login successful!');      
      }
  
    } catch (error) {
      setColor("red");
      if (error.response) {
        setMessage(`Login failed: email or password incorrect`);
      } else if (error.request) {
        setMessage('Login failed: No response from server.');
      }
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
          
        <div className='login_screen'>
          <h1>Login</h1>
          <div className='input_div'>
            <span>Email</span>
            <input
              type="{email}"
              value={email}
              onChange={(e) => {setEmail(e.target.value)}}
              placeholder="Ex: dark@mail.com"
            />
          </div>
          <div className='input_div'>
            <span>Password</span>
            <input
              type={visibility}
              value={password}
              onChange={(e) => {setPassword(e.target.value)}}
              placeholder="Ex: prince0fD4rkness"

            />
          </div>
          <p  style={{minHeight: "25px",maxHeight: "25px", color:color}}>{message}</p>
          
          <VisibilityButton visibility={visibility} setVisibility={setVisibility}/>          
          <div className='button_div'>
            <button  className='submit_button' onClick={handleSubmitLogin}>
              Let's roll!
            </button>
          </div>

          <p>Don't have an account? <Link to="/register">Register now!</Link></p>
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

export default LoginPage;
