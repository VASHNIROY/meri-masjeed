
import './index.css'

import { useNavigate } from 'react-router-dom'

function HomeImage(){
    const navigate = useNavigate()

    const handleRegister=()=>{
        navigate('/register')
    }

    const handleSelect=()=>{
        navigate('/selectmasjid')
    }

    return(
        <div className="home-image-bg-container">
            <div className="home-image-sub-container">
                <h1 className="app-main-heading" style={{color:"#000",fontWeight:"600"}} >MERI MASJID</h1>
                <p className="app-para-text" style={{color:"#000"}}>Grow community of your Masjid by new technology!</p>
                <div className="home-page-button-container">
                    <button className="app-container-button" onClick={handleRegister}>REGISTER YOUR MASJID NOW</button>
                    <button className="app-container-button-1" onClick={handleSelect}>SELECT MASJID</button>
                </div>
            </div>
        </div>
    )
}
export default HomeImage