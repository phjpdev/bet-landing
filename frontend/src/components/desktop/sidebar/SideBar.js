import React, { useState } from "react";
import "./SideBar.css";

const SideBar = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <div className="sidebar-container">
      <div className="sidebar-head">賠率</div>
      <ul className="sidebar-top-list">
        <li onClick={() => handleClick(0)} className={activeIndex === 0 ? "active" : ""}>首名入球</li>
        <li onClick={() => handleClick(1)} className={activeIndex === 1 ? "active" : ""}>英超</li>
        <li onClick={() => handleClick(2)} className={activeIndex === 2 ? "active" : ""}>
          決賽組合
          <img
            src="https://consvc.hkjc.com//consvc.hkjc.com/-/media/Sites/JCBW/MenuIcons/cup.svg?sc_lang=zh-HK"
            className="sidebar-icon"
            alt="Cup"
          />
        </li>
        <li onClick={() => handleClick(3)} className={activeIndex === 3 ? "active" : ""}>
          派彩快
          <img
            src="https://consvc.hkjc.com//consvc.hkjc.com/-/media/Sites/JCBW/MenuIcons/icon-betslip/earlySettlement_svg.svg?sc_lang=zh-HK"
            className="sidebar-icon"
            alt="Early Settlement"
          />
        </li>
        <li onClick={() => handleClick(4)} className={activeIndex === 4 ? "active" : ""}>同場過關</li>
      </ul>

      <ul className="sidebar-list">
        {["即場投注", "過關/混合過關", "主客和", "晉級隊伍", "半場主客和", "半場主客和", "讓球", "半場讓球", "入球大細", "半場入球大細", "開出角球讓球", "開出角球大細", "半場開出角球大細", "特別項目", "波膽", "半場波膽", "第一隊入球", "總入球", "入球單雙", "半全場", "冠軍", "歐聯冠軍", "南美球會盃", "所有賠率"].map((item, index) => (
          <li
            key={index}
            onClick={() => handleClick(index + 5)} // +5 to ensure unique activeIndex values for each list
            className={activeIndex === index + 5 ? "active" : ""}
          >
            {item}
            {item === "冠軍" && (
              <img
                src="https://consvc.hkjc.com//consvc.hkjc.com/-/media/Sites/JCBW/MenuIcons/cup.svg?sc_lang=zh-HK"
                className="sidebar-icon"
                alt="Cup"
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideBar;
