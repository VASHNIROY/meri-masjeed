// import React from "react";
// import "./index.css";
// import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
// import { Carousel } from "react-responsive-carousel";

// import { TestimonialList } from "../Data";

// function Testimonial() {
//   return (
//     <div className="testimonial-main-container">
//       <h1 className="app-main-heading">Testimonial</h1>

//       <div className="carousel-width" tabIndex="0">
//         <Carousel
//           autoPlay={true}
//           swipeable={true}
//           infiniteLoop={true}
//           transitionTime={1000}
//           showArrows={false}
//           showStatus={false}
//           useKeyboardArrows={true}
//           className="carousel-width"
//         >
//           {TestimonialList.map((each) => {
//             return (
//               <div className="testimonial-card">
//                 <span className="testimonial-icon">{each.icon}</span>
//                 <p className="app-para-text">{each.review}</p>
//                 <div className="testmonial-flex-container">
//                   <img
//                     src={each.image}
//                     alt="logo"
//                     className="testmonial-image"
//                   />
//                   <p className="app-description">{each.name}</p>
//                 </div>
//               </div>
//             );
//           })}
//         </Carousel>
//       </div>
//     </div>
//   );
// }
// export default Testimonial;

import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BiSolidQuoteAltRight } from "react-icons/bi";
import "./index.css";

//import team from "../../images/Team2.jpg";

import { TestimonialList } from "../Data";

const HomeCarousel = () => {
  const settings = {
    autoplay: true,
    autoplaySpeed: 2000,
    dots: false,
    infinite: true,
    arrows: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <>
    <h1 className="app-main-heading" style={{textAlign:"center"}}>Testimonial</h1>
    <div className="home-carousel-main-container">
        <Slider {...settings} className="home-carousel-sub-container">
          {TestimonialList.map((each) => (
            <div className="testimonial-card" style={{width:"100%",display:"flex",flexDirection:"column",alignItems:"center"}}>
              <span className="testimonial-icon">{each.icon}</span>
              <p className="app-para-text">{each.review}</p>
              <div className="testmonial-flex-container">
                <img src={each.image} alt="logo" className="testmonial-image" />
                <p className="app-description">{each.name}</p>
              </div>
            </div>
          ))}
        </Slider>
      
     
    </div>
    </>
  );
};

export default HomeCarousel;
