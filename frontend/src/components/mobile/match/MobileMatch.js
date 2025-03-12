import React, { useState, useEffect, useRef  } from "react";
import axios from "axios";
import './MobileMatch.css'

const MobileMatch = () => {
    const [matches, setMatches] = useState([]); // Store the match data
    const [matchNumbers, setMatchNumbers] = useState(0); // Store the total number of matches
    const [showBottomBar, setShowBottomBar] = useState(false);
    const matchContainerRef = useRef(null);

    const app_url = process.env.REACT_APP_APP_URL;
    const fetchMatches = () => {
        axios.get(`${app_url}/api/matches`) // Request data from the backend
            .then(response => {
                const matchesData = response.data.matchData;
                setMatches(matchesData); // Set match data to state
                setMatchNumbers(matchesData.length); // Set the number of matches
            })
            .catch(error => {
                console.error('Error fetching match count:', error);
            });
    };

    useEffect(() => {
        fetchMatches();
        const interval = setInterval(() => {
            fetchMatches();
        }, 20000);
        return () => clearInterval(interval);
    }, []); 

    const formatGroupDate = (dateString) => {
        const options = { 
            year: 'numeric', 
            month: '2-digit', 
            day: '2-digit',
            weekday: 'short', 
            timeZone: 'Asia/Hong_Kong' // Ensure the correct timezone
        };
    
        const date = new Date(dateString); // Convert to Date object
        const formattedDate = new Intl.DateTimeFormat('zh-HK', options).format(date);
        
        // Extract the numeric date and Chinese weekday separately
        const [datePart, weekday] = formattedDate.split('（');
        console.log(weekday)
        const shortWeekday = weekday.replace('週', '').replace('）', '');
        return `${datePart} (${shortWeekday})`;
    };
    const formatDate = (dateString) => {
        const options = { 
            year: 'numeric', 
            month: '2-digit', 
            day: '2-digit',
            timeZone: 'Asia/Hong_Kong' // Force the time zone to Asia/Hong_Kong
        };
        
        const date = new Date(dateString); // Convert to Date object
        const formattedDate = new Intl.DateTimeFormat('en-GB', options).format(date);
        return formattedDate;
    }
    const formatHour = (dateString) => {
        const options = { 
            hour: '2-digit', 
            minute: '2-digit', 
            hour12: false,
            timeZone: 'Asia/Hong_Kong' // Force the time zone to Asia/Hong_Kong
        };
        
        const date = new Date(dateString); // Convert to Date object
        const formattedTime = new Intl.DateTimeFormat('en-GB', options).format(date);
        return formattedTime;
    };

    // Group matches by date
    const groupedMatches = (matches ?? []).reduce((acc, match) => {
        const dateKey = formatGroupDate(match.time);
        if (!acc[dateKey]) {
            acc[dateKey] = [];
        }
        acc[dateKey].push(match);
        return acc;
    }, {});

    const [openDates, setOpenDates] = useState([]);
    useEffect(() => {
        if (openDates.length === 0) { // Only set once to prevent overwriting user interactions
            setOpenDates(Object.keys(groupedMatches));
        }
    }, [groupedMatches]); 
    
    const toggleDateGroup = (date) => {
        setOpenDates((prev) =>
            prev.includes(date) ? prev.filter((d) => d !== date) : [...prev, date]
        );
    };

    const [currentTime, setCurrentTime] = useState("");
    useEffect(() => {
        const updateDateTime = () => {
          const now = new Date();
    
          // Format Date: DD/MM/YYYY
          const formattedDate = new Intl.DateTimeFormat("zh-TW", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            timeZone: "Asia/Hong_Kong", // Ensure Hong Kong time
          })
            .format(now)
            .replace(/\//g, "/");
    
          // Format Time: HH:MM (24-hour format)
          const formattedTime = new Intl.DateTimeFormat("zh-TW", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
            timeZone: "Asia/Hong_Kong", // Ensure Hong Kong time
          }).format(now);
    
          setCurrentTime(`${formattedDate} ${formattedTime}`);
        };
    
        updateDateTime(); // Initial call
        const interval = setInterval(updateDateTime, 60000); // Update every 1 minute (no seconds needed)
    
        return () => clearInterval(interval); // Cleanup on unmount
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (matchContainerRef.current) {
                const { top } = matchContainerRef.current.getBoundingClientRect();
                if (top <= 0) {
                    setShowBottomBar(true);
                } else {
                    setShowBottomBar(false);
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <div>
            <div className="mobile-match-header-tabs">
                <div className="mobile-match-header-btns">
                    <div className="mobile-match-tab-btn">
                        <img src="/image/search.svg" alt="search" width={24}></img>
                    </div>
                    <div className="mobile-match-tab-btn">
                        <img src="/image/calendar.svg" alt="calendar" width={24}></img>
                    </div>
                    <div className="mobile-match-tab-btn">
                        <img src="/image/leagues.svg" alt="leagues" width={24}></img>
                    </div>
                </div>
                <div className="mobile-match-header-right">
                    <div className="mobile-match-vertical-bar"></div>
                    <div className="mobile-match-header-right-text">
                        <div>主客和</div>
                        <div className="mobile-match-header-right-icon">
                            <img 
                                src="/image/arrow-down.svg" 
                                alt="arrow-down" 
                                width={24} 
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="mobile-match-dis">
                <div className="mobile-match-pagination">共有 {matchNumbers} 場賽事</div>
                <div className="mobile-match-time-div">
                    <div className="mobile-match-time">更新時間: {currentTime}</div>
                    <div style={{cursor:'pointer', display:'flex'}}><img src="/image/refresh.svg" alt="refresh" width={20} height={20} className="mobile-match-time-img"></img></div>
                </div>
            </div>

            {Object.keys(groupedMatches).sort().map((date, index) => (
                <div key={index} style={{margin: '0 8px 12px 8px'}}>
                    {/* Date Header */}
                    <div className="mobile-match-date-header">
                        {date} 賽事
                    </div>

                    {openDates.includes(date) && groupedMatches[date].map((match, matchIndex) => (
                        <div key={matchIndex} className={matchIndex % 2 === 0 ? "match-white-row" : "match-grey-row"}>
                            <div className="mobile-match-row">
                                <div>
                                    <div className="match-flex">
                                        <div className="mobile-match-id">{match.id}</div>
                                        <div className="tournamentText">{match.tournamentText}</div>
                                        <img src="/image/early_settlement_icon.svg" width={20} alt="icon"/>
                                    </div>
                                    <div className="mobile-match-teams-wid">
                                        <div>{match.homeName}</div>
                                        <div>{match.awayName}</div>
                                    </div>
                                    <div className="mobile-match-time-wid">
                                        <div className="mobile-match-time-can">
                                            <div className="mobile-match-time-can-square">
                                                {formatHour(match.time)}
                                            </div>
                                            <div className="mobile-match-time-can-triangle"></div>
                                        </div>
                                        {match.tvChannel ? (
                                            <div className="mobile-match-tvchannel">{match.tvChannel}</div>
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                </div>
                                
                                {/* <div className="">
                                    <div className="">
                                        
                                        {match.homeScore !== null && match.homeScore !== undefined ? (
                                            <div className="match-score-div">
                                                <div className="match-score" style={{borderBottom:'0.5px solid #aaa'}}>{match.homeScore}</div>
                                                <div className="match-score">{match.awayScore}</div>
                                            </div>
                                        ) : (
                                            <div className="match-score-div"></div>
                                        )}
                                        {match.homeScore !== null && match.homeScore !== undefined ? (
                                            <div className="match-vertical-line"></div>
                                        ) : (
                                            <div style={{width:'1px'}}></div>
                                        )}
                                        
                                    </div>
                                    {match.inPlay ? (
                                        <div>
                                            {match.corner ? (
                                                <div className="match-corner">
                                                    <img src="/image/icon-corner.svg"></img>
                                                    <div>{match.corner}({match.homeCorner}:{match.awayCorner})</div>
                                                    <div className="match-status">
                                                        {match.status === "FIRSTHALF" ? "上半" : match.status === "SECONDHALF" ? "下半" : ""}
                                                    </div>
                                                    <img src="/image/icon_clock_green.svg"></img>
                                                </div>
                                            ) : (
                                                <div className="match-inplay">
                                                    <div className="match-vertical-line"></div>
                                                    <div style={{marginLeft: '15px'}}>
                                                        <img src="/image/icon_clock_red.svg" alt="clock" />
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        ""
                                    )}
                                </div> */}
                                <div style={{display:'flex', alignItems:'center', gap:'8px'}}>
                                    {match.homeOdd ? (
                                        <div className="mobile-match-odd">
                                            <div className="mobile-match-odd-block">
                                                <span>{match.homeOdd}</span>
                                                <label className="mobile-custom-checkbox">
                                                    <input type="checkbox" />
                                                    <span></span>
                                                </label>
                                            </div>
                                            <div className="mobile-match-odd-block">
                                                <span>{match.drawOdd}</span>
                                                <label className="mobile-custom-checkbox">
                                                    <input type="checkbox" />
                                                    <span></span>
                                                </label>
                                            </div>
                                            <div className="mobile-match-odd-block">
                                                <span>{match.awayOdd}</span>
                                                <label className="mobile-custom-checkbox">
                                                    <input type="checkbox" />
                                                    <span></span>
                                                </label>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="match-no-odd">
                                            <div className="match-no-odd-black">按此顯示其他即場投注種類</div>
                                            <div className="match-no-odd-red">(主客和現已暫停受注)</div>
                                        </div>
                                    )}
                                    <div className="match-list-icon">
                                        <img src="/image/list.svg" alt="list" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ))}
            <div className="mobile-match-pagination">共有 {matchNumbers} 場賽事</div>
            <div className="mobile-match-text">
                <span style={{fontWeight:'700'}}>重要事項:</span> 頁面所示的賠率謹供參考，最終賠率將於投注獲接納時確定。此等頁面上所示的任何數據、文章和其他資料皆以「現況」形式提供，並只作提供資訊之用。若閣下使用該等資料，此<a href="#" className="match-text-link">免責聲明</a>將適用。
            </div>
        </div>
    );
}   

export default MobileMatch;