import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './App.css';
import Navbar from './components/navbar/Navbar';
import MatchNavbar from './components/match-navbar/MatchNavbar';
import UserLogin from './components/user-login/UserLogin';
import TabList from './components/tab-list/TabList';
import ImageSlider from './components/image-slider/ImageSlider';
import Tabs from './components/tabs/Tabs';
import SideBar from './components/sidebar/SideBar';
import MatchHeader from './components/match-header/MatchHeader';
import Match from './components/match/Match';

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
                <div>
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
                </div>
                <UserLogin />
            </div>
        </div>
    );
}

export default Home;
