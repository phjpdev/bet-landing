import React, { useState, useEffect } from "react";
import "./MatchHeader.css";

const MatchHeader = () => {
  const [currentTime, setCurrentTime] = useState("");
  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();

      // Format Date: DD/MM/YYYY
      const formattedDate = new Intl.DateTimeFormat("zh-TW", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        timeZone: "Asia/Hong_Kong", // Ensure Hong Kong time
      })
        .format(now)
        .replace(/\//g, "/");

      // Format Time: HH:MM (24-hour format)
      const formattedTime = new Intl.DateTimeFormat("zh-TW", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone: "Asia/Hong_Kong", // Ensure Hong Kong time
      }).format(now);

      setCurrentTime(`${formattedDate} ${formattedTime}`);
    };

    updateDateTime(); // Initial call
    const interval = setInterval(updateDateTime, 60000); // Update every 1 minute (no seconds needed)

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div className="match-header-container">
      <div className="match-header-nav">
        <div className="match-team">
          <div>主客和</div>
          <div style={{cursor:'pointer'}}>
            <img src="/image/help.svg" alt="help" width={24}></img>
          </div>
          <div>[單項+過關(兩至八關)]</div>
        </div>
        <div className="match-date">
          <div style={{cursor:'pointer'}}><img src="/image/print.svg" alt="print" width={24}></img></div>
          <div style={{cursor:'pointer'}}>列印</div>
          <div>更新時間: {currentTime}</div>
          <div style={{cursor:'pointer'}}><img src="/image/refresh.svg" alt="refresh" width={24}></img></div>
        </div>
      </div>
      <div className="match-header-calculation">
        <div className="match-cal-div">
          <div className="match-cal-arrow"><img src="/image/arrow-down.svg" alt="arrow-down" width={24} className="match-cal-arrow-img"></img></div>
          <span>過關計算機</span>
        </div>
        <div>
          <button className="match-cal-button">添加到投注區</button>
        </div>
      </div>
      <div className="match-header-tabs">
        <div className="match-header-btns">
          <div className="match-tab-btn">
            <img src="/image/search.svg" alt="search" width={24}></img>
            <span>搜索</span>
          </div>
          <div className="match-tab-btn">
            <img src="/image/calendar.svg" alt="calendar" width={24}></img>
            <span>日期</span>
          </div>
          <div className="match-tab-btn">
            <img src="/image/leagues.svg" alt="leagues" width={24}></img>
            <span>賽事</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchHeader;
