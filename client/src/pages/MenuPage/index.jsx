import React, { useEffect, useState } from 'react';
import './styles.css';
import Calendar from '../Calendar';
import d20Menu from '../../assets/images/d20Menu.png';
import RollDices from '../../components/RollDices';
import AddCampaing from '../../components/AddCampaing';
import CreateCampaing from '../../components/CreateCampaing';

function MenuPage() {
  const [page, setPage] = useState(null);


  return (
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
  );
}

export default MenuPage;
