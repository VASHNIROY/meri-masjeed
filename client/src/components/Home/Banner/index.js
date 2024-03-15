import './index.css'

import masjidBanner from '../../utils/merimasjidbg-1.png'

function Banner(){
    return(
        <div className="banner-main-container">
            <div className="banner-sub-container">
                <img src="https://my-masjid.com/wp-content/uploads/2020/12/google_playicon-300x76-1.png" alt="" className="banner-android-app-image"/>
                <p className="app-para-text" style={{color:"#fff"}}>Easily get your Masjid’s timings on a mobile app!</p>
            </div>
        </div>
    )
}
export default Banner