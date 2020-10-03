import React, { useEffect, useState } from 'react'
import logo from '../../assets/netflixLogo.png'
import './NavBar.css'
import * as action from '../../store/action/index'
import { connect } from 'react-redux'
import { NavLink, withRouter } from 'react-router-dom'

const NavBar = (props) => {
    const [show, handleShow] = useState(false);


    useEffect(() => {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                handleShow(true)
            } else handleShow(false);
        })



    }, [])



    return (
        <div className={`nav ${show ? 'nav__black' : null}`}>
            <img
                className='nav__logo'
                src={logo}
                alt='Netflix Logo'></img>
            <button onClick={() => {
                props.logout();

            }} className="nav_button"><NavLink to='/'>LogOut</NavLink></button>

        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(action.logout())
    }
}


export default withRouter(connect(null, mapDispatchToProps)(NavBar));

