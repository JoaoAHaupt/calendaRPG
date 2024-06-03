import React from 'react';
import './styles.css'
import { Link } from 'react-router-dom';

export const RegisterButton = () => {
    return (
        <Link to="/register">
            <button className='register_button'>Register!</button>
        </Link>
    );
}

export default RegisterButton;
