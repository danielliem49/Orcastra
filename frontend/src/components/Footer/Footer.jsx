import { useState } from "react"
import AboutModal from "../AboutModal/AboutModal";
import IncompleteModal from "../IncompleteModal/IncompleteModal";
import { AboutModalContext } from "../../App";
import { IncompleteModalContext } from "../../App";
import './Footer.css'
import 'aos/dist/aos.css';
import logo from '../../assets/logo1.png'
import { padding } from "@mui/system";
import { useContext } from "react"


export default function Footer() {

    const { showAboutModal, setShowAboutModal } = useContext(AboutModalContext)
    const { showIncompleteModal, setShowIncompleteModal } = useContext(IncompleteModalContext)

    return (
        <>
            <div className="footer-container">
                <div className='footer-slogan'>
                    "Connecting investors of today with creators of tomorrow"
                    <div className='footer-slogan-attribute'>
                        -Dosé
                    </div>
                </div>
                <img className="footer-logo" src={logo} >
                </img>

                <div className="footer-links-container">

                    <button className="meet-the-team-button">
                        Test
                    </button>
                </div>

                <div className="footer-lower-container">
                    <div className="footer-lower">
                        <div className="brand-rights">
                            2023 Orca, LLC All Rights Reserved
                        </div>
                        <div className="brand-trademark">
                            ORCA® is a registered trademark of Orca, LLC in the United States as well as certain other jurisdictions.
                        </div>
                        <div className="brand-policies">
                            <span className="brand-policies-item">Privacy Policy</span>
                            <span style={{padding:'0px 14px 0px 14px', fontSize: '10px' }}>•</span>
                            <span className="brand-policies-item">Terms</span>
                            <span style={{ padding: '0px 14px 0px 14px', fontSize: '10px' }}>•</span>
                            <span className="brand-policies-item">Cookie Policy</span>
                        </div>
                    </div>
                    <select className="footer-language-dropdown">
                        <option value="" disabled selected>English (US)</option>
                    </select>
                </div>
            </div>
        </>
    )
}