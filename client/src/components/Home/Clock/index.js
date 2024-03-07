import React, { useState, useEffect } from "react";
import "./index.css";

const Clock = ({ masjidTimingList, onShowBannerChange }) => {
  const [time, setTime] = useState(new Date());
  const [showBanner, setShowBanner] = useState(false);
  const [names, setNames] = useState([]);
  const [remainingMinutes, setRemainingMinutes] = useState(0);

  useEffect(() => {
    const timerId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, []);

  useEffect(() => {
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

  useEffect(() => {
    const currentMinutes = time.getHours() * 60 + time.getMinutes();
    const nextPrayerIndex = names.findIndex(
      ({ dynamicHours, dynamicMinutes }) =>
        currentMinutes < dynamicHours * 60 + dynamicMinutes
    );

    if (nextPrayerIndex !== -1) {
      const nextPrayerTime = names[nextPrayerIndex];
      const remaining =
        nextPrayerTime.dynamicHours * 60 +
        nextPrayerTime.dynamicMinutes -
        currentMinutes;

      setRemainingMinutes(remaining);
      console.log(remaining, "remaining");

      if (remaining > 0 && remaining < 2) {
        console.log("kapil");
        setShowBanner(true);
        onShowBannerChange(true);
        const bannerTimeout = setTimeout(() => {
          setShowBanner(false);
          onShowBannerChange(false);
        }, 5*60*1000);

        return () => clearTimeout(bannerTimeout);
      }
    }

    setShowBanner(false);
    onShowBannerChange(false); // If remainingMinutes is not 1, hide the banner
  }, [time, names]);

  const hour = time.getHours();
  const minute = time.getMinutes();
  const second = time.getSeconds();
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
      
      {remainingMinutes !== 0 && (
        <div className="next-prayer-heading">
          {`Next prayer in ${Math.floor(remainingMinutes / 60)} hours ${
            remainingMinutes % 60
          } minutes`}
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
            const currentMinutes = hour * 60 + minute;
            const prayerTimeMinutes = dynamicHours * 60 + dynamicMinutes;
            const nextNearestIndex = names.findIndex(
              ({ dynamicHours: dh, dynamicMinutes: dm }) =>
                currentMinutes < dh * 60 + dm
            );

            const style = {
              position: "absolute",
              width: "max-content",
              top: "50%",
              left: "50%",
              fontSize: "14px",
              transform: `translate(-50%, -50%) rotateZ(${
                dynamicHours * 30 - 90 + dynamicMinutes * 0.5
              }deg) translateX(100px)`,
              color: index === nextNearestIndex ? "#fff" : "black",
              backgroundColor: index === nextNearestIndex ? "#194373" : "",
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
