import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';  

import { AuthContext } from '../../assets/util/AuthContext';
import './styles.css';
import Calendar from '../Calendar';
import d20Menu from '../../assets/images/d20Menu.png';
import RollDices from '../../components/RollDices';
import AddCampaing from '../../components/AddCampaing';
import CreateCampaing from '../../components/CreateCampaing';
import CreateSession from '../../components/CreateSession';

function MenuPage() {
  const [page, setPage] = useState(null);
  const [cookies, setCookies] = useState(false);
  const [userId, setUserId] = useState(null)
  const [username, setUsername] = useState(null)
  const [email, setEmail] = useState(null)
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/get_cookies', { withCredentials: true });
        const userData = response.data;
        setEmail(userData.email);
        setUserId(userData.id);
        setUsername(userData.username);
        setCookies(true);
        
        if (userData) {
          try {
            const response = await axios.get('http://localhost:5000/get_campaigns_user', {
              params: { dm_id: userId },
              withCredentials: true
            });

            setCampaigns(response.data);
          
          } catch (error) {
            console.error('Failed to fetch campaigns:', error);
          }
        }

      } catch (error) {
        console.error('Failed to fetch cookies:', error);
      }
    };

    fetchData(); 

  }, []); 

  return (
    <>
      {cookies ? (
        <div className='menu-page'>
          <Calendar />
          {page}
          <div className='action-bar'>
            <h2>{username}</h2>

            <button id='dice_menu_button' onClick={() => setPage(<RollDices />)}>
              <u>Let's roll!</u>
              <img src={d20Menu} alt='d20 menu' />
            </button>
            <button id='dice_menu_button' onClick={() => setPage(null)}>
              <u>Currency</u>
            </button>
            <button id='dice_menu_button' onClick={() => setPage(<AddCampaing />)}>
              <u>Add campaing</u>
            </button>
            <button id='dice_menu_button' onClick={() => setPage(<CreateCampaing dm_id={userId}/>)}>
              <u>Create campaing</u>
            </button>
            <button id='dice_menu_button' onClick={() => setPage(<CreateSession userId={userId}/>)}>
              <u>Create session</u>
            </button>
            <button id='dice_menu_button' onClick={() => setPage(null)}>
              <u>Settings</u>
            </button>
            <button id='dice_menu_button' onClick={() => setPage(null)}>
              <u>Logout</u>
            </button>
          </div>
        </div>
      ) : (
        <p>Please log in.</p>
      )}
    </>
  );
}

export default MenuPage;
