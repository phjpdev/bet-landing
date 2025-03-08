import React, { useState } from "react";
import "./MatchHeader.css";

const MatchHeader = () => {

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
          <div>更新時間: 05/03/2025 23:52</div>
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
