import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineGlobal } from "react-icons/ai";
import { BsList } from "react-icons/bs";
import { AiOutlineUser } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";
import './MobileNavbar.css'
import UserLogin from "../../user-login/UserLogin";

const MobileNavbar = () => {
    const navigate = useNavigate();
    const [visible, SetVisible] = useState(false);
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
                    <AiOutlineUser onClick={() => {SetVisible(true)}} style={{width:'30px', height:'30px'}}/>
                    {visible === true && 
                        <div className="mobile-user-login-container">
                            <div className="mobile-user-login-section">
                                <UserLogin />
                                <IoMdClose className="mobile-login-close" onClick={() => {SetVisible(false)}}/>
                            </div>
                        </div>
                    }
                    <button className="logout-btn" onClick={handleLogout}>登出</button>
                </div>
            </nav>
        </div>
    );
};

export default MobileNavbar;
