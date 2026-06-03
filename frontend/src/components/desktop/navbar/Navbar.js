import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../../context/LanguageContext";
import "./Navbar.css"; // Import the CSS file

const isBettingLoggedIn = () => !!localStorage.getItem("user-token");

const Navbar = () => {
  const navigate = useNavigate();
  const { language, toggleLanguage } = useLanguage();
  const [showFeedbackBtn, setShowFeedbackBtn] = useState(isBettingLoggedIn);

  useEffect(() => {
    const syncFeedbackVisibility = () => {
      setShowFeedbackBtn(isBettingLoggedIn());
    };
    window.addEventListener("storage", syncFeedbackVisibility);
    window.addEventListener("user-session-changed", syncFeedbackVisibility);
    return () => {
      window.removeEventListener("storage", syncFeedbackVisibility);
      window.removeEventListener("user-session-changed", syncFeedbackVisibility);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token
    localStorage.removeItem("user-token"); // Remove token
    localStorage.removeItem("user-question"); // Remove token
    window.dispatchEvent(new Event("user-session-changed"));
    navigate("/login"); // Redirect to login page
    window.location.reload();
  };
  return (
    <nav className="navbar">
      <div className="navbar-container hkjc-page-inner">
        {/* Left Side - Navigation Links */}
        <ul className="nav-links">
          <li><a href="#">主頁</a></li>
          <li><a href="#">馬場體驗</a></li>
          <li><a href="#">賽馬資訊</a></li>
          <li><a href="#">足球資訊</a></li>
          <li><a href="#">馬會會員</a></li>
          <li><a href="#">慈善及社區貢獻</a></li>
          <li><a href="#">馬會知多少</a></li>
        </ul>

        {/* Right Side - Language Switch */}
        <div className="lang-switch">
          <button
            type="button"
            className="logout-btn"
            onClick={handleLogout}
            aria-label="登出"
          >
            登出
          </button>
          {showFeedbackBtn && (
            <button type="button" aria-label="意見/建議">
              <img
                src="/image/Survey_desktop_small.7c28abba66881416c7a6.svg"
                alt=""
                width={24}
                height={24}
              />
              <span>意見/ 建議</span>
            </button>
          )}
          <button type="button" onClick={toggleLanguage} aria-label={language === "zh-HK" ? "Switch to English" : "切換至中文"}>
            <img
              src="/image/lang.65997091ab467b4b4033.svg"
              alt=""
              width={24}
              height={24}
            />
            <span>{language === "zh-HK" ? "ENG" : "中文"}</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
