import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './styles.css';

export const Header = () => {
    const navigate = useNavigate(); 

    const handleLoginClick = () => {
        navigate('/login'); 
    }

    return (
        <header>
            <div className='header-container'>
                <Link to={"/"}><span><b><u>CalendaRPG</u></b></span></Link>
                <Link to="/why">Why?</Link>
                <Link to="/about us">About us</Link>
                
            </div>
            <button onClick={handleLoginClick}>Login</button> 
        </header>
    );
}

export default Header;
