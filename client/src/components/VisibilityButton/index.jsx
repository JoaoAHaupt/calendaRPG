import React from 'react';
import sauron_eye from '../../assets/images/sauron_eye.png';
import sauron_closed from '../../assets/images/sauron_eye_closed.png';
import './styles.css';

const VisibilityButton = ({ visibility, setVisibility }) => {
  const toggleVisibility = () => {
    setVisibility((prevVisibility) =>
      prevVisibility === "password" ? "text" : "password"
    );
  };

  return (
    <div className='visibi_div'>
      <span>Show password?</span>
      <button onClick={toggleVisibility} type='button'>
        <img src={visibility === "text" ? sauron_eye : sauron_closed} alt='visibility icon' />
      </button>
    </div>
  );
};

export default VisibilityButton;
