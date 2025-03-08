import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './App.css';
import UserLogin from './components/user-login/UserLogin';
import ImageSlider from './components/image-slider/ImageSlider';
import Footer from "./components/footer/Footer";
import MobileNavbar from "./components/mobile/navbar/MobileNavbar";

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
        </div>
    );
}

export default MobileHome;
