import React, { useState } from 'react';
import sauron_eye from '../../assets/images/sauron_eye.png';
import sauron_closed from '../../assets/images/sauron_eye_closed.png';
import './styles.css';

export const VisibilityButton = () => {
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [visibility, setVisibility] = useState("password");

  const toggleVisibility = () => {
    const updatedVisibility = !isPasswordVisible;
    setPasswordVisible(updatedVisibility);
    setVisibility(updatedVisibility ? 'text' : 'password');
  };

  return (
    <div className='visibi_div'>
      <span>Show password?</span>
      <button onClick={toggleVisibility} type='button'>
        <img src={isPasswordVisible ? sauron_eye : sauron_closed} alt='' />
      </button>
    </div>
  );
};

export default VisibilityButton;
