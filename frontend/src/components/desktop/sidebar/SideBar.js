import React, { useState } from "react";
import "./SideBar.css";

const CUP_ICON =
  "https://consvc.hkjc.com//consvc.hkjc.com/-/media/Sites/JCBW/MenuIcons/cup.svg?sc_lang=zh-HK";
const CASHOUT_ICON =
  "https://consvc.hkjc.com//consvc.hkjc.com/-/media/Sites/JCBW/MenuIcons/icon-betslip/earlySettlement_svg.svg?sc_lang=zh-HK";

const SIDEBAR_ITEMS = [
  { label: "英超冠軍", tone: "red" },
  { label: "所有賽事", tone: "default" },
  { label: "即場投注", tone: "red" },
  { label: "過關/混合過關", tone: "red" },
  { label: "派彩快", tone: "red", icon: "cashout" },
  { label: "同場過關", tone: "red" },
  { label: "球隊入球大細", tone: "default" },
  { label: "球隊半場入球大細", tone: "default" },
  { label: "球隊開出角球大細", tone: "default" },
  { label: "球隊半場開出角球大細", tone: "default" },
  { label: "主客和", tone: "default" },
  { label: "半場主客和", tone: "default" },
  { label: "讓球主客和", tone: "default" },
  { label: "讓球", tone: "default" },
  { label: "半場讓球", tone: "default" },
  { label: "入球大細", tone: "default" },
  { label: "半場入球大細", tone: "default" },
  { label: "開出角球大細", tone: "default" },
  { label: "半場開出角球大細", tone: "default" },
  { label: "開出角球讓球", tone: "default" },
  { label: "半場開出角球讓球", tone: "default" },
  { label: "波膽", tone: "default" },
  { label: "半場波膽", tone: "default" },
  { label: "第一隊入球", tone: "default" },
  { label: "首名入球", tone: "default" },
  { label: "任何時間入球球員", tone: "default" },
  { label: "最後入球球員", tone: "default" },
  { label: "總入球", tone: "default" },
  { label: "入球單雙", tone: "default" },
  { label: "半全場", tone: "default" },
  { label: "特別項目", tone: "default" },
  { label: "冠軍", tone: "default", icon: "cup" },
  { label: "晉級隊伍", tone: "default" },
  { label: "歐洲聯賽冠軍盃", tone: "default" },
  { label: "澳洲盃", tone: "default" },
  { label: "日本天皇盃", tone: "default" },
  { label: "歐洲協會聯賽", tone: "default" },
  { label: "南美球會盃", tone: "default" },
  { label: "北美聯賽盃", tone: "default" },
  { label: "英格蘭聯賽盃", tone: "default" },
  { label: "阿根廷盃", tone: "default" },
  { label: "所有賠率", tone: "default" },
];

const SideBar = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleClick = (index) => {
    setActiveIndex(index);
  };

  const renderIcon = (icon) => {
    if (icon === "cup") {
      return <img src={CUP_ICON} className="sidebar-icon" alt="" />;
    }
    if (icon === "cashout") {
      return <img src={CASHOUT_ICON} className="sidebar-icon" alt="" />;
    }
    return null;
  };

  return (
    <div className="sidebar-container">
      <div className="sidebar-head">賠率</div>
      <ul className="sidebar-list">
        {SIDEBAR_ITEMS.map((item, index) => (
          <li
            key={`${item.label}-${index}`}
            onClick={() => handleClick(index)}
            className={[
              `sidebar-item--${item.tone}`,
              activeIndex === index ? "active" : "",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            {item.label}
            {renderIcon(item.icon)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideBar;
