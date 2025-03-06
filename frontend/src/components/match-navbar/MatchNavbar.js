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
                <button className={`match-nav-button ewin ${active === "" ? "active" : ""}`} onClick={() => setActive("")}>
                    <div className="buttonContent">
                        <img src="https://consvc.hkjc.com/-/media/Sites/JCBW/MenuIcons/eWinLogo.svg?sc_lang=zh-HK" alt="eWin" className="nav-icon"/>
                    </div>
                </button>
            </li>
            <li>
                <button className={`match-nav-button racing ${active === "賽馬" ? "active" : ""}`} onClick={() => setActive("賽馬")}>
                    <div className="buttonContent">
                        <img src="https://consvc.hkjc.com/-/media/Sites/JCBW/MenuIcons/eWinLogo/horse_svg/Racing/horse.svg?sc_lang=zh-HK" alt="Racing" className="nav-icon"/>
                        <span>賽馬</span>
                    </div>
                </button>
            </li>
            <li>
                <button className={`match-nav-button football ${active === "足智彩"? "active" : ""}`} onClick={() => setActive("足智彩")}>
                    <div className="buttonContent">
                        <img src="https://consvc.hkjc.com/-/media/Sites/JCBW/MenuIcons/eWinLogo/horse_svg/football_svg.svg?sc_lang=zh-HK" alt="Football" className="nav-icon"/>
                        <span>足智彩</span>
                    </div>
                </button>
            </li>
            <li>
                <button className={`match-nav-button mark ${active === "六合彩"? "active" : ""}`} onClick={() => setActive("六合彩")}>
                    <div className="buttonContent">
                        <img src="https://consvc.hkjc.com/-/media/Sites/JCBW/MenuIcons/eWinLogo/horse_svg/markSix_svg/MarkSix/MarkSix.svg?sc_lang=zh-HK" alt="Mark" className="nav-icon"/>
                        <span>六合彩</span>
                    </div>
                </button>
            </li>
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