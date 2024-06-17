import React, { useEffect } from 'react';
import './styles.css';
import Calendar from '../Calendar';

function MenuPage() {
  useEffect(() => {
    fetch('/hello')
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then(response => console.log(response))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className='menu-page'>
      <Calendar />
      <div className='action-bar'>
        Rolls
        <br></br>
        Add campaing 
        Create campaing 

      </div>
    </div>
  );
}

export default MenuPage;
