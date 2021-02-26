import React from 'react';
import {NavLink} from 'react-router-dom';
import logo from '../assets/logo.jpg';
import '../css/Navbar.css';

const Navbar = () => {
    return (
        <header className='header homepage'>
                <img width='200' src={logo} alt='logo' />
                <div className="nav">
                    <NavLink className='nav1' exact to='/'>Home</NavLink>
                    <NavLink className='nav2' exact to='/login'>Login</NavLink>
                    <NavLink exact to='/register'>Register</NavLink>
                </div>
            </header>
    )
}

export default Navbar
