import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './App.css';
import Navbar from './components/desktop/navbar/Navbar';
import MatchNavbar from './components/desktop/match-navbar/MatchNavbar';
import UserLogin from './components/user-login/UserLogin';
import TabList from './components/desktop/tab-list/TabList';
import ImageSlider from './components/image-slider/ImageSlider';
import Tabs from './components/desktop/tabs/Tabs';
import SideBar from './components/desktop/sidebar/SideBar';
import MatchHeader from './components/desktop/match-header/MatchHeader';
import Match from './components/desktop/match/Match';
import Footer from "./components/desktop/footer/Footer";

function Home() {
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
            <Navbar />
            <MatchNavbar />
            <div className='main'>
                <div className='main-div'>
                    <div className='first-div'>
                        <TabList />
                        <ImageSlider />
                    </div>
                    <div className='second-div'>
                        <Tabs />
                    </div>
                    <div className='third-div'>
                        <SideBar />
                        <div className='match-section'>
                            <MatchHeader />
                            <Match />
                        </div>
                    </div>
                </div>
                <UserLogin />
            </div>
            <Footer />
        </div>
    );
}

export default Home;
