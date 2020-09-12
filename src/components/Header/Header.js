import React from 'react'
import './Header.css'
import logo from '../../assets/netflixLogo.png'
const Header = (props) => {
    return (
        <div className="header">
            <img alt='Netflix Logo' src={logo}></img>
        </div>
    )
}


export default Header;