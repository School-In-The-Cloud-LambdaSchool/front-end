import React from 'react';
import {NavLink} from 'react-router-dom';
import logo4 from '../assets/logo4.png';
// import './assets/css/main.css';
import '../css/Navbar.css'

const Navbar = () => {
    return (
        <header className='header homepage' id="navbar">
                <img width='200' src='https://banner2.cleanpng.com/20180203/biq/kisspng-cloud-clouds-png-hd-5a763fef17f7d5.9698897115176990550982.jpg' alt='logo2' />
                <div className="nav">
                    <NavLink className='nav1' exact to='/'>Home</NavLink>
                    <NavLink className='nav2' exact to='/login'>Login</NavLink>
                    <NavLink exact to='/register'>Register</NavLink>
                </div>
            </header>
    )
}

export default Navbar
