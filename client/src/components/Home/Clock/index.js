import React, { useState, useEffect } from "react";
import "./index.css";

const Clock = ({masjidTimingList}) => {
  const [time, setTime] = useState(new Date());
//   const [names] = useState([
//     { text: "Fajr", dynamicHours: 11, dynamicMinutes: 30 },
//     { text: "Dhuhr", dynamicHours: 9, dynamicMinutes: 20 },
//     { text: "Asr", dynamicHours: 2, dynamicMinutes: 45 },
//     { text: "Maghrib", dynamicHours: 2, dynamicMinutes: 45 },
//     { text: "Isha", dynamicHours: 2, dynamicMinutes: 45 },
//   ]);

const [names, setNames] = useState([]);

  console.log(masjidTimingList,"ram")

  useEffect(() => {
    const timerId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, []);

  useEffect(() => {
    // Update names state when masjidTimingList changes
    if (masjidTimingList && masjidTimingList.length > 0) {
      const updatedNames = masjidTimingList.map(({ name, starttime }) => {
        const [hours, minutes] = starttime.split(":");
        return {
          text: name,
          dynamicHours: parseInt(hours, 10),
          dynamicMinutes: parseInt(minutes, 10),
        };
      });
      setNames(updatedNames);
    }
  }, [masjidTimingList]);

  const hour = time.getHours();
  const minute = time.getMinutes();
  const second = time.getSeconds();

  const nextPrayerIndex = names.findIndex(
    ({ dynamicHours, dynamicMinutes }) =>
      hour * 60 + minute < dynamicHours * 60 + dynamicMinutes
  );
  // Calculate the time difference between now and the next prayer
  let hours = 0
  let remainingMinutes = 0;
if (nextPrayerIndex !== -1) {
  const nextPrayerTime = names[nextPrayerIndex];
  remainingMinutes =
    (nextPrayerTime.dynamicHours * 60 + nextPrayerTime.dynamicMinutes) -
    (hour * 60 + minute);

    hours = Math.floor(remainingMinutes/60)
    remainingMinutes = remainingMinutes-hours*60

}
  return (
    <div style={{display:"flex",flexDirection:"column",gap:"30px"}}>
    {nextPrayerIndex !== -1 && (
  <div className="next-prayer-heading">
    {`  ${names[nextPrayerIndex].text} in ${hours} hours ${remainingMinutes} minutes`}
  </div>
)}
    <div className="clock-container">
        
      <div className="clock">
       
        <div
          className="hour_hand"
          style={{
            transform: `rotateZ(${hour * 30 + minute * 0.5}deg)`,
          }}
        />
        <div
          className="min_hand"
          style={{
            transform: `rotateZ(${minute * 6 + second * 0.1}deg)`,
          }}
        />
        <div
          className="sec_hand"
          style={{
            transform: `rotateZ(${second * 6}deg)`,
          }}
        />
        <span className="twelve">12</span>
        <span className="one">1</span>
        <span className="two">2</span>
        <span className="three">3</span>
        <span className="four">4</span>
        <span className="five">5</span>
        <span className="six">6</span>
        <span className="seven">7</span>
        <span className="eight">8</span>
        <span className="nine">9</span>
        <span className="ten">10</span>
        <span className="eleven">11</span>

        {names.map(({ text, dynamicHours, dynamicMinutes }, index) => {
           const isActive = hour === dynamicHours && minute >= dynamicMinutes;

           const currentMinutes = hour * 60 + minute;
  const prayerTimeMinutes = dynamicHours * 60 + dynamicMinutes;

  const nextNearestIndex = names.findIndex(
    ({ dynamicHours: dh, dynamicMinutes: dm }) =>
      currentMinutes < dh * 60 + dm
  );


          console.log(nextNearestIndex)
          const style = {
            position: "absolute",
            width:"max-content",
            top: "50%",
            left: "50%",
            fontSize: "14px",
            transform: `translate(-50%, -50%) rotateZ(${
              dynamicHours * 30 - 90 + dynamicMinutes * 0.5
            }deg) translateX(100px)`,
            
            color: index === nextNearestIndex ? "#fff" : "black",
            backgroundColor:index === nextNearestIndex?"#194373":"",
            fontWeight: index === nextNearestIndex ? "bold" : "normal",
          };
          

          return (
            <div key={index} className="name" style={style}>
              {text}
            </div>
          );
        })}
      </div>
    </div>
    </div>
  );
};

export default Clock;
