import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './App.css';
import UserLogin from './components/user-login/UserLogin';
import MobileNavbar from "./components/mobile/navbar/MobileNavbar";
import MobileImageSlider from "./components/mobile/image-slider/MobileImageSlider";
import MobileMatch from "./components/mobile/match/MobileMatch";
import MobileFooter from "./components/mobile/footer/MobileFooter";

function MobileHome() {
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
            return;
        }
    }, [navigate]);

    return (
        <div>
            <MobileNavbar />
            <MobileImageSlider />
            <MobileMatch />
            <MobileFooter />
        </div>
    );
}

export default MobileHome;
