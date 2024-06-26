import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';  // Importe o Axios

import { AuthContext } from '../../assets/util/AuthContext';
import './styles.css';
import Calendar from '../Calendar';
import d20Menu from '../../assets/images/d20Menu.png';
import RollDices from '../../components/RollDices';
import AddCampaing from '../../components/AddCampaing';
import CreateCampaing from '../../components/CreateCampaing';

function MenuPage() {
  const { loged, user } = useContext(AuthContext);
  const [page, setPage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/get_cookies');
        const userData = response.data;

        // Aqui você pode fazer algo com os dados recebidos, como definir no estado
        console.log(userData); // Exemplo: console.log para verificar os dados recebidos

      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    };

    fetchData(); // Chama a função fetchData ao montar o componente

  }, []); // O array vazio [] indica que o efeito useEffect só deve rodar uma vez, ao montar o componente

  return (
    <>
      {user ? (
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
