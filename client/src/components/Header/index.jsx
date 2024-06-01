import React from 'react';
import './styles.css'

export const Header = () => {
    return (
        <header>
            <div className=''>
                <span><b><u>CalendaRPG</u></b></span>
                <a href="">About us</a>
                <a href="">Why?</a>
            </div>
            <button>Login</button>
        </header>
    );
}

export default Header;
