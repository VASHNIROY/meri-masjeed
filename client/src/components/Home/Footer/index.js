import './index.css'
import { FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";

function Footer(){
    return(
        <div className="footer-main-container">
            <div className="footer-sub-container">
                <p className="app-para-text" style={{color:"#fff"}}>© Copyright Meri-Masjid 2023. All Rights Reserved</p>
                <p className="app-para-text" style={{color:"#fff"}}>Powered by Labyrinth Global Solutions</p>
                <div className="footer-flex" style={{color:"#60c2d3"}}>
                    <p>Privacy Polycy</p>
                    <p>Contact Us</p>
                </div>
                <div className="footer-flex" style={{color:"#60c2d3"}}>
                    <FaFacebook className="footer-social-icon"/>
                    <FaXTwitter className="footer-social-icon"/>
                    <FaInstagram className="footer-social-icon"/>
                </div>
            </div>
        </div>
    )
}
export default Footer