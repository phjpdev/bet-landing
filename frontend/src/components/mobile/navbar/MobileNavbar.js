import React from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineGlobal } from "react-icons/ai";
import { BsList } from "react-icons/bs";
import { AiOutlineUser } from "react-icons/ai";
import './MobileNavbar.css'

const MobileNavbar = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("token"); // Remove token
        navigate("/login"); // Redirect to login page
    };
    return (
        <div>
            <nav className="mobile-navbar">
                <div className="mobile-navbar-container">
                    <BsList style={{width:'30px', height:'30px'}}/>
                    <img src="https://consvc.hkjc.com/-/media/Sites/JCBW/MenuIcons/eWinLogo.svg?sc_lang=zh-HK" alt="eWin" className="mobile-nav-img"/>
                </div>
                <div className="mobile-navbar-user">
                    <AiOutlineUser style={{width:'30px', height:'30px'}}/>
                    <button className="logout-btn" onClick={handleLogout}>登出</button>
                </div>
            </nav>
        </div>
    );
};

export default MobileNavbar;
