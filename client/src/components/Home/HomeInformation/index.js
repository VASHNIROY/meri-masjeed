import "./index.css";
import { GrFormCheckmark } from "react-icons/gr";

function HomeInformation() {
  return (
    <div className="home-information-top-container">
      <div className="home-information-main-container">
        <div className="home-information-left-container">
          <h1 className="app-main-heading">Large Info Screens</h1>
          <p className="app-para-text">
            Meri-Masjid is the Large Screen Display solution for your Masjid to
            display and track the daily salah times on the Masjid premises and
            on mobile phones. Once loaded in the browser it can work offline
            without need of an internet connection!
          </p>
        </div>
        <div className="home-information-right-container">
          <img
            src="https://my-masjid.com/wp-content/uploads/2021/01/screenshot-of-flow-new.png"
            alt=""
            className="home-information-image"
          />
        </div>
      </div>
      <div className="home-information-main-container-1">
        <div className="home-information-left-cobtainer">
          <img
            src="https://my-masjid.com/wp-content/uploads/2021/01/ipad-iphone-namo_updated.png"
            alt=""
            className="home-information-image"
          />
        </div>
        <div className="home-information-left-container">
          <h1 className="app-main-heading">Arrive on Time</h1>
          <p className="app-para-text">
            A difference of only 5 minutes can make or break your jamaah
            attendance. Some times they stand earlier some times later. Now your
            masjid community – and anyone in the world – can follow the exact
            time for Adhan and Iqamah from home or on the road from mobile
            devices. This motivates more people to join the masjid right on
            time.
          </p>
          <p className="app-para-text">
            You or the Muazzin don’t have to look at the screen. At each Adhan
            and Iqamah a buzz sound is played. Nobody will be in doubt that the
            time of Adhan or Iqamah has started.
          </p>
          <p className="app-para-text">
            Now you will be right on time for every salah in your masjid إن شاء
            الله!
          </p>
        </div>
      </div>
      <div className="home-information-main-container home-information-main-container-1">
        <div className="home-information-right-container">
          <h1 className="app-main-heading">Sound Feedback</h1>
          <p className="app-para-text">
          The system plays three discreet sounds, so that you don’t even have to look at the screen to know the event related to Salah.
          </p>
          <p className="app-para-text" style={{display:"flex",alignItems:"center",gap:"50px"}}><GrFormCheckmark className="home-information-icon-color"/>1 beep at Adhan time</p>
          <p className="app-para-text" style={{display:"flex",alignItems:"center",gap:"50px"}}><span><GrFormCheckmark className="home-information-icon-color"/></span> 1 long buzz as final warning to turn off mobile phones</p>
          <p className="app-para-text" style={{display:"flex",alignItems:"center",gap:"50px"}}><span><GrFormCheckmark className="home-information-icon-color"/></span> 2 beeps at Iqamah time</p>
        <p className="app-para-text">The final warning buzz to turn off mobile phones is played 45 sec prior to Iqamah and has two purposes. To remind turning off the mobile phone and to advice the people in sunnah prayers to finish their sunnah in 45 sec as the Jamaah will stand soon. We don’t play the Adhan or Iqamah as it is the duty of the Muazzin and it carries high reward to call the Adhan and Iqamah.</p>
        </div>
        <div className="home-information-left-container" style={{width:"35%"}}>
          <img
            src="https://my-masjid.com/wp-content/uploads/2020/12/loud-speaker-310849_1280-1.png"
            alt=""
            className="home-information-sound-image"
          />
        </div>
      </div>
      <div className="home-information-main-container-1">
        <div className="home-information-left-cobtainer">
          <img
            src="https://my-masjid.com/wp-content/uploads/2021/01/ipad-iphone-namo_updated.png"
            alt=""
            className="home-information-image"
          />
        </div>
        <div className="home-information-left-container">
          <h1 className="app-main-heading">Less Distraction</h1>
          <p className="app-para-text">
          Do people constantly look at their mobile phones when waiting for Salah? Does the phones ring under Salah? This is annoying and distracting for all the community how came for peace and prayers in the Masjid
          </p>
          <p className="app-para-text">
          The discreet sound feedbacks free you from looking at any device. You can concentrate and devote yourself more to your prayers.
          </p>
          <p className="app-para-text">
          The meri-Masjid solution reminds to turn off mobile phones as a sliding image:
          </p>
          <p className="app-para-text">
          3 times before Adhan
          </p>
        </div>
      </div>
    </div>
  );
}
export default HomeInformation;
