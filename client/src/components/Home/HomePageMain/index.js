import Navbar from "../../Navbar";
import Banner from "../Banner";
import Features from "../Features";
import Footer from "../Footer";
import HomeImage from "../HomeImage";
import HomeInfo from "../HomeInfo";
import HomeInformation from "../HomeInformation";
import Testimonial from "../Testimonial";
import TrustedBy from "../TrustedBy";

function HomePageMain(){
    return(
        <>
            <Navbar/>
            <HomeImage/>
            <Banner/>
            <TrustedBy/>
            <HomeInfo/>
            {/* <HomeInformation/> */}
            <Features/>
            <Testimonial/>
            <Footer/>
        </>
    )
}
export default HomePageMain