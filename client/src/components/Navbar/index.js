import { useState } from 'react'
import { Link } from 'react-router-dom';

//import { ReactComponent as Hamburger } from '../../assets/icons/hamburger.svg'
//import { ReactComponent as Brand } from '../../assets/icons/logo.svg'

import { RxHamburgerMenu } from "react-icons/rx";

import { RxCross2 } from "react-icons/rx";

import './index.css'

//import masjidLogo from '../utils/masjidLogo-1.png'

import { masjidLogo } from '../utils/imageURL';

const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(false)

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar)
  }

  return (
    <nav className="navbar-main-container">
      <div className="navbar-sub-container">
        <div className="navbar-company-logo-container">
        <img src={masjidLogo} alt="logo" className="navbar-company-logo"/>
        </div>
        {showNavbar ? (<div className="navbar-menu-icon" onClick={handleShowNavbar}>
          <RxCross2 style={{color:"#fff",fontSize:"24px"}}/>
        </div>):(<div className="navbar-menu-icon" onClick={handleShowNavbar}>
          <RxHamburgerMenu style={{color:"#fff",fontSize:"24px"}}/>
        </div>)
        }
        <div className={`nav-elements  ${showNavbar && 'nav-active'}`}>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            {/* <li>
              <Link to="/support">Support</Link>
            </li> */}
            <li>
              <Link to="/register">Register Your Masjid</Link>
            </li>
            <li>
              <Link to="/selectmasjid">Select Masjid</Link>
            </li>
            {/* <li>
              <Link to="/tv">Andoroid TV Support</Link>
            </li> */}
            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar