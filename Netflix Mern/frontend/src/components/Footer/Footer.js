import React from 'react'
import './Footer.css'

const Footer = (props) => {
    return (
        <div className="footer">
            <div className="center">
                <p className="questions">Questions? Call 1-555-555-5555</p>
                <div className="terms">
                    <a>Gift Card Terms</a>
                    <a>Terms of Use</a>
                    <a>Privacy Statement</a>
                </div>
                <select>
                    <option value="english">English</option>
                    <option value="albanian">Albanian</option>
                </select>
            </div>
        </div>
    )
}


export default Footer;