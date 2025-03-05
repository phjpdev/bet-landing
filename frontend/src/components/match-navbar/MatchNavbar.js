import React, { useState } from "react";
import "./MatchNavbar.css";

const MatchNavbar = () => {
  // State to track the active button
  const [active, setActive] = useState("足智彩");

  // Menu items with their corresponding image icons and active colors
  const menuItems = [
    {
      name: "賽馬",
      icon: "https://consvc.hkjc.com/-/media/Sites/JCBW/MenuIcons/eWinLogo/horse_svg/Racing/horse.svg?sc_lang=zh-HK",
      color: "#173e96",
    },
    {
      name: "足智彩",
      icon: "https://consvc.hkjc.com/-/media/Sites/JCBW/MenuIcons/eWinLogo/horse_svg/football_svg.svg?sc_lang=zh-HK",
      color: "#00c06c",
    },
    {
      name: "六合彩",
      icon: "https://consvc.hkjc.com/-/media/Sites/JCBW/MenuIcons/eWinLogo/horse_svg/markSix_svg/MarkSix/MarkSix.svg?sc_lang=zh-HK",
      color: "#d62d2d",
    },
  ];

  return (
    <nav className="match-navbar">
      <div className="match-navbar-container">
        {/* Navigation Buttons */}
        <ul className="match-nav-list">
            <li>
                <button className="match-nav-button">
                    <div className="buttonContent">
                        <img src="https://consvc.hkjc.com/-/media/Sites/JCBW/MenuIcons/eWinLogo.svg?sc_lang=zh-HK" alt="eWin Logo"/>
                    </div>
                </button>
            </li>

          {menuItems.map((item) => (
            <li key={item.name}>
              <button
                className={`match-nav-button ${active === item.name ? "active" : ""}`}
                style={{
                  backgroundColor: active === item.name ? item.color : "transparent",
                  color: active === item.name ? "white" : "black",
                }}
                onClick={() => setActive(item.name)}
              >
                <div className="buttonContent">
                    <img src={item.icon} alt={item.name} className="nav-icon" />
                    <span>{item.name}</span>
                </div>
              </button>
            </li>
          ))}
        </ul>

        {/* Right-side Buttons */}
        <ul className="match-nav-right-list">
            <li><button className="match-nav-right-button">網上渠道</button></li>
            <li><button className="match-nav-right-button">投注處及電話投注</button></li>
            <li><button className="match-nav-right-button">投注資料</button></li>
            <li><button className="match-nav-right-button">客戶支援</button></li>
        </ul>
      </div>
    </nav>
  );
};

export default MatchNavbar;