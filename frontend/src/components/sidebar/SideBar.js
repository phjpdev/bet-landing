import React from "react";
import "./SideBar.css";

const SideBar = () => {
  return (
    <div className="sidebar-container">
        <div className="sidebar-head">賠率</div>
        <ul className="sidebar-top-list">
            <li>首名入球</li>
            <li>英超</li>
            <li>決賽組合<img src="https://consvc.hkjc.com//consvc.hkjc.com/-/media/Sites/JCBW/MenuIcons/cup.svg?sc_lang=zh-HK" style={{marginLeft:'5px'}}></img></li>
            <li>派彩快<img src="https://consvc.hkjc.com//consvc.hkjc.com/-/media/Sites/JCBW/MenuIcons/icon-betslip/earlySettlement_svg.svg?sc_lang=zh-HK" style={{marginLeft:'5px'}}></img></li>
            <li>同場過關</li>
        </ul>
        <ul className="sidebar-list">
            <li>即場投注</li>
            <li>過關/混合過關</li>
            <li>主客和</li>
            <li>晉級隊伍</li>
            <li>半場主客和</li>
            <li>半場主客和</li>
            <li>讓球</li>
            <li>半場讓球</li>
            <li>入球大細</li>
            <li>半場入球大細</li>
            <li>開出角球讓球</li>
            <li>開出角球大細</li>
            <li>半場開出角球大細</li>
            <li>特別項目</li>
            <li>波膽</li>
            <li>半場波膽</li>
            <li>第一隊入球</li>
            <li>總入球</li>
            <li>入球單雙</li>
            <li>半全場</li>
            <li>冠軍<img src="https://consvc.hkjc.com//consvc.hkjc.com/-/media/Sites/JCBW/MenuIcons/cup.svg?sc_lang=zh-HK" style={{marginLeft:'5px'}}></img></li>
            <li>歐聯冠軍</li>
            <li>南美球會盃</li>
            <li>所有賠率</li>
        </ul>
    </div>
  );
};

export default SideBar;
