// import React from "react";
// import './index.css'
// import ReactPlayer from "react-player";
// import { IoCheckmark } from "react-icons/io5";
 
// function HomeInfo () {
//     return(
//         <>
//           <div className="masid-mani-container">
//             <div className="masid-sub-container">
//                <div className="salah-masid-container">
//                <div className="salah-masid-left-container">
//                     <h2 className="app-main-heading"> Salah times and messages to the community</h2>
//                     <p className="app-para-text" style={{marginTop:'15px'}}>With My-Masjid your masjid is able to manage messages
//                         to the community and your masjid’s exact Adhan and Iqamah timings.
//                         The timings and messages are available on both mobile phones and on
//                          large screens in the masjid. My-masjid is free of cost.
//                          <span>Register</span> your masjid and get started today!</p>
//                 </div>
//                 <div className="salah-masid-right-container">
//                     <img className="salah-image" src='https://my-masjid.com/wp-content/uploads/2021/01/image-14.png' alt='' />
//                 </div>
//                </div>
//             </div>
//          </div>
//          <div className="masid-screen-display-container">
//             <h1 className="app-main-heading" style={{textAlign:'center'}}>My-Masjid Large Screen Display inside your Masjid!</h1>
//          <ReactPlayer width="100%" height="100vh" url='https://youtu.be/iwO8_x9ANUk' controls />
//          </div>
//          <div className="masid-card-contaner">
//             <div className="masid-3-in-1-conatainer">
//                 <h1 className="app-main-heading">3-in1</h1>
//                 <p className="app-para-text">My-Masjid gives you 3 modes to show <span> timings</span> and <span> messages </span> on each
//                        large screen in your masjid.</p>
//                        <div className="masid-whole-card-container">
//                         <div className="masid-card1">
//                             <img className="masid-card-image" src=' https://my-masjid.com/wp-content/uploads/2021/01/3in1image1.png' alt='' />
//                             <h1 className="app-para-heading" style={{textAlign:'center'}}>TIMING</h1>
//                             <p className="app-para-text">Timing screen shows a clock on left side and Adhan,
//                                  Iqamah times on the right. This mode is suitable
//                                  inside prayer halls.</p>
 
//                         </div>
//                         <div className="masid-card2">
//                             <img className="masid-card-image" src=' https://my-masjid.com/wp-content/uploads/2021/01/3in1image2.png' alt='' />
//                             <h1 className="app-para-heading" style={{textAlign:'center'}}>TIMING+INFO</h1>
//                             <p className="app-para-text">Timing+Info screen show salah times on left and
//                                 rotating messages on the right side of the screen.</p>
//                                 <p className="app-para-text">This screen automatically transforms into Timing screen 2
//                                      mins before salah and back again 5 mins after Iqamah.
//                                      This mode is suitable both inside prayer
//                                       halls and close to prayer halls.</p>
//                         </div>
//                         <div className="masid-card3">
//                             <img className="masid-card-image" src=' https://my-masjid.com/wp-content/uploads/2021/01/3in1image2.png' alt='' />
//                             <h1 className="app-para-heading" style={{textAlign:'center'}}>INFO</h1>
//                             <p className="app-para-text">Info screen show rotating messages only and a brief next
//                                  salah alert at the bottom. Info screens are most suitable
//                                   in entrance/exit areas or cafe areas of the Masjid,
//                                   or next to the timing screens within prayer halls.</p>
//                         </div>
 
//                        </div>
//             </div>
           
//          </div>
//          <div className="masid-android-feature-container">
//             <h1 className="app-main-heading" style={{textAlign:'center'}}>Few of the Major Android Features…</h1>
//             <div className="masid-androd-container">
//                 <div className="masid-android-video">
//                 <ReactPlayer width="350px" height="100%" url='https://youtu.be/Ui9b_gkzGkg' controls />
//                 </div>
//                 <div className="app-para-text">
//                     <ul>
//                         <li>Show messages to anyone visiting your Masjid page</li>
//                         <li>The same information on all type of devices</li>
//                         <li>Automatic adjustment for daylight saving</li>
//                         <li>Reminders/Alerts on mobile phones at Salah and Iqama times which are highly customizable.</li>
//                         <li>Option to mark any Masjid as favorite and its management</li>
//                         <li>The application also provides a home screen widget for quick viewing of Salah times without even opening the app.</li>
//                         <li>Ability to share applications with other mobile phone users</li>
//                         <li>User can register his/her Masjid by using the register Masjid feature.</li>                      
//                     </ul>
 
//                 </div>
 
//             </div>
 
//          </div>
//          <div className="My-Masjid-container">
//             <h1 className="app-main-heading" style={{textAlign:'center'}}>My-Masjid App for Android TV</h1>
//             <p className="app-description" style={{textAlign:'center'}}>We also provide Android TV compatability to run My-Masjid Application </p>
//          </div>
//          <div className="masid-smart-tv-container">
//             <div className="masid-smart-tv">
//                 <img className="masid-smartimag" src='  https://my-masjid.com/wp-content/uploads/2020/12/my-masjid_android_tv-2-1.png' alt=''/>
//             </div>
//             <div>
//             <p ><IoCheckmark/>Custom sound for adhan and iqamah times</p>
//             <p ><IoCheckmark/>Full screen Adhan media playback for better visualization</p>
//             <p ><IoCheckmark/>Option to launch My-Masjid application whenever devices restarts</p>
//             <p ><IoCheckmark/>Option to disable screen time out so that app keeps on running all the time</p>
//             <p ><IoCheckmark/>Switch between different display modes</p>
//             <p ><IoCheckmark/>Use My-Masjid application as screen saver</p>
//             <p ><IoCheckmark/>D-pad supported in-app navigation</p>
//             <p ><IoCheckmark/>To download My Masjid for your Smart TV <span>Click Here.</span></p>
//             </div>
//          </div>
//          </>
 
//     )
// }
// export default HomeInfo

import React from "react";
import './index.css'
import { Link } from 'react-router-dom';
import ReactPlayer from "react-player";
import { IoCheckmark } from "react-icons/io5";
// import kidvideo from '../../utils/kidsvideo-1.mp4'
// import kidvideo_2 from "../../utils/kidsvideo-2.mp4";

// import prayertiming_1 from '../../utils/prayertiming-1.PNG'
// import prayertiming_2 from "../../utils/prayertiming-2.PNG";
// import prayertiming_3 from "../../utils/prayertiming-3.PNG";
// import prayertiming_4 from "../../utils/prayertiming-5.PNG";

import { kidvideo,kidvideo_2 } from "../../utils/imageURL";

import { prayertiming_1,prayertiming_2,prayertiming_3 } from "../../utils/imageURL";
 
function HomeInfo () {
    return (
      <>
        <div className="masid-mani-container">
          <div className="masid-sub-container">
            <div className="salah-masid-container">
              <div className="salah-masid-left-container">
                <h2 className="app-main-heading">
                  {" "}
                  Salah times and messages to the community
                </h2>
                <p className="app-para-text" style={{ marginTop: "15px" }}>
                  With Meri-Masjid your masjid is able to manage messages to the
                  community and your masjid’s exact Adhan and Iqamah timings.
                  The timings and messages are available on both mobile phones
                  and on large screens in the masjid. meri-masjid is free of
                  cost.
                  <span>
                    <Link
                      to="/register"
                      style={{ textDecoration: "none", color: "#60c2d3" }}
                    >
                      Register{" "}
                    </Link>
                  </span>{" "}
                  your masjid and get started today!
                </p>
              </div>
              <div className="salah-masid-right-container">
                <img
                  className="salah-image"
                  src="https://res.cloudinary.com/dwsrrlpjl/image/upload/v1715675964/chudqef1oi2kd0n33lno.png"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
        <div className="masid-screen-display-container">
          {/* <h1 className="app-main-heading" style={{textAlign:'center'}}>My-Masjid Large Screen Display inside your Masjid!</h1> */}
          <div className="masid-video-container">
            <ReactPlayer width="100%" url={kidvideo} controls />
          </div>
        </div>
        <div className="masid-card-contaner">
          <div className="masid-3-in-1-conatainer">
            <h1 className="app-main-heading">3-in1</h1>
            <p className="app-para-text">
              Meri-Masjid gives you 3 modes to show <span> timings</span> and{" "}
              <span> messages </span> on each large screen in your masjid.
            </p>
            <div className="masid-whole-card-container">
              <div className="masid-card1">
                <div className="masid-card-image-container">
                  <img
                    className="masid-card-image"
                    src={prayertiming_1}
                    alt=""
                  />
                </div>
                <h1
                  className="app-para-heading"
                  style={{ textAlign: "center" }}
                >
                  TIMING
                </h1>
                <p className="app-para-text">
                  Timing screen shows a clock on left side and Adhan, Iqamah
                  times on the right. This mode is suitable inside prayer halls.
                </p>
              </div>
              <div className="masid-card2">
                <div className="masid-card-image-container">
                  <img
                    className="masid-card-image"
                    src={prayertiming_2}
                    alt=""
                  />
                </div>
                <h1
                  className="app-para-heading"
                  style={{ textAlign: "center" }}
                >
                  TIMING+INFO
                </h1>
                <p className="app-para-text">
                  Timing+Info screen show salah times on left and rotating
                  messages on the right side of the screen.
                </p>
                <p className="app-para-text">
                  This screen automatically transforms into Timing screen 2 mins
                  before salah and back again 5 mins after Iqamah. This mode is
                  suitable both inside prayer halls and close to prayer halls.
                </p>
              </div>
              <div className="masid-card3">
                <div className="masid-card-image-container">
                  <img
                    className="masid-card-image"
                    style={{ height: "100%" }}
                    src={prayertiming_3}
                    alt=""
                  />
                </div>
                <h1
                  className="app-para-heading"
                  style={{ textAlign: "center" }}
                >
                  INFO
                </h1>
                <p className="app-para-text">
                  Info screen show rotating messages only and a brief next salah
                  alert at the bottom. Info screens are most suitable in
                  entrance/exit areas or cafe areas of the Masjid, or next to
                  the timing screens within prayer halls.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="masid-android-feature-container">
          <h1 className="app-main-heading" style={{ textAlign: "center" }}>
            Few of the Major Android Features…
          </h1>
          <div className="masid-androd-container">
            <div className="masid-android-video">
              <ReactPlayer width="100%" url={kidvideo_2} controls />
            </div>
            <div className="app-para-text">
              <ul
                style={{ display: "flex", flexDirection: "column", gap: "6px" }}
              >
                <li>Show messages to anyone visiting your Masjid page</li>
                <li>The same information on all type of devices</li>

                <li>
                  Reminders/Alerts on mobile phones at Salah and Iqama times
                  which are highly customizable.
                </li>
                <li>
                  Option to mark any Masjid as favorite and its management
                </li>
                {/* <li>
                  The application also provides a home screen widget for quick
                  viewing of Salah times without even opening the app.
                </li> */}
                <li>
                  Ability to share applications with other mobile phone users
                </li>
                <li>
                  User can register his/her Masjid by using the register Masjid
                  feature.
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/* <div className="My-Masjid-container">
          <h1 className="app-main-heading" style={{ textAlign: "center" }}>
            My-Masjid App for Android TV
          </h1>
          <p className="app-description" style={{ textAlign: "center" }}>
            We also provide Android TV compatability to run My-Masjid
            Application{" "}
          </p>
        </div> */}
        {/* <div className="masid-smart-screen-container">
          <div className="masid-smart-tv">
            <img
              className="masid-smart-image"
              src="    https://my-masjid.com/wp-content/uploads/2020/12/my-masjid_android_tv-2-1.png"
              alt=""
            />
          </div>
          <div className="masid-smart-checkmark">
            <p
              className="app-para-text"
              style={{ display: "flex", alignItems: "center" }}
            >
              <IoCheckmark className="masid-checkmark" />
              Custom sound for adhan and iqamah times
            </p>
            <p
              className="app-para-text"
              style={{ display: "flex", alignItems: "center" }}
            >
              <IoCheckmark className="masid-checkmark" />
              Full screen Adhan media playback for better visualization
            </p>
            <p
              className="app-para-text"
              style={{ display: "flex", alignItems: "center" }}
            >
              <IoCheckmark className="masid-checkmark" />
              Option to launch My-Masjid application whenever devices restarts
            </p>
            <p
              className="app-para-text"
              style={{ display: "flex", alignItems: "center" }}
            >
              <IoCheckmark className="masid-checkmark" />
              Option to disable screen time out so that app keeps on running all
              the time
            </p>
            <p
              className="app-para-text"
              style={{ display: "flex", alignItems: "center" }}
            >
              <IoCheckmark className="masid-checkmark" />
              Switch between different display modes
            </p>
            <p
              className="app-para-text"
              style={{ display: "flex", alignItems: "center" }}
            >
              <IoCheckmark className="masid-checkmark" />
              Use My-Masjid application as screen saver
            </p>
            <p
              className="app-para-text"
              style={{ display: "flex", alignItems: "center" }}
            >
              <IoCheckmark className="masid-checkmark" />
              D-pad supported in-app navigation
            </p>
            <p
              className="app-para-text"
              style={{ display: "flex", alignItems: "center" }}
            >
              <IoCheckmark className="masid-checkmark" />
              To download My Masjid for your Smart TV <span> Click Here.</span>
            </p>
          </div>
        </div> */}
      </>
    );
}
export default HomeInfo