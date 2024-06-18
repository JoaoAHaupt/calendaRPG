import React from 'react';
import './styles.css';
import Header from '../../components/Header';
import Dices from '../../components/Dices';
import RegisterButton from '../../components/RegisterButton';
import D20 from '../../assets/images/d20.png';
import D100 from '../../assets/images/d100.png';
import D12 from '../../assets/images/d12.png';
import D6 from '../../assets/images/d6.png';
import D4 from '../../assets/images/d4.png';
import D8 from '../../assets/images/d8.png';

function AboutUs() {
  return (
    <div className="lepo">
      <Header />
      <div className="align_div">
        <div className='dice_div'>
          <Dices image={D4} height={40} />
          <Dices image={D100} height={50} />
          <Dices image={D12} height={130} />
          <Dices image={D20} height={110} />
          <Dices image={D8} height={80} />
        </div>
        <div className="description_about_us">
            <img id='photo_me' src="https://avatars.githubusercontent.com/u/127232326?v=4" alt="me" />
            <p>
              Hello, my name is João Augusto Haupt, and I'm passionate about RPGs! CalendaRPG was born out of my love for RPGs and my desire to enhance the gaming experience by helping my friends and other players maintain organization and coordination in their campaigns. That's why I created CalendaRPG—a dedicated online schedule designed specifically for RPG enthusiasts like you and me.
            </p>
        </div>
        <div className='dice_div'>
          <Dices image={D4} height={140} />
          <Dices image={D100} height={100} />
          <Dices image={D12} height={80} />
          <Dices image={D8} height={30} />
          <Dices image={D6} height={50} />
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
