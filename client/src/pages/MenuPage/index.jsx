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
  const { loged, user, setUser } = useContext(AuthContext);
  const [page, setPage] = useState(null);
  const [cookies, setCookies] = useState(null)
  const [campaigns, setCampaigns] = useState([]);
  const userId = 1

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/get_cookies');
        const userData = response.data;
        setCookies(userData)
        try {
          const response = await axios.get('http://localhost:5000/get_campaigns_user', {
            params: { dm_id: userId }
          });
          
          setCampaigns(response.data);
        
        } catch (error) {
          console.error('Failed to fetch user data:', error);
        }

      } catch (error) {
        console.error('Failed to fetch user data:', error);
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
            <button id='dice_menu_button' onClick={() => setPage(<CreateCampaing />)}>
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
            <p>Username: {cookies.username}</p>

          </div>
        </div>
      ) : (
        <p>Please log in.</p>
      )}
    </>
  );
}

export default MenuPage;
