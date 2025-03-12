import React, { useState, useEffect, useRef  } from "react";
import axios from "axios";
import './Match.css';

const Match = () => {
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
        <div ref={matchContainerRef} className="match-container">
            <div className="match-pagination">共有 {matchNumbers} 場賽事</div>
            <div className="match-header-row">
                <div className="match-time-wid">
                    <div className="match-time">預定截止</div>
                    <div className="match-time">投注時間</div>
                </div>
                <div className="match-id">球賽編號</div>
                <div className="match-tournament" style={{cursor:'pointer'}}><img src="/image/header-flag.svg" width={20}></img></div>
                <div className="match-teams">
                    <div className="match-teams-flex" style={{color:'rgb(51, 51, 51)', padding: '0'}}>
                        <div className="match-header-teams-wid">
                            <div>主隊</div>
                            <div>客隊</div>
                        </div>
                        <div className="match-tv">
                        </div>
                    </div>
                    <div className="match-header-inplay" style={{color:'rgb(51, 51, 51)'}}>
                        <div>
                            <div>即場</div>
                            <div>投注</div>
                        </div>
                    </div>
                </div>
                <div className="match-header-odd">
                    <div>賠率</div>
                    <div className="match-header-hor-line"></div>
                    <div className="match-header-odd-flex">
                        <div>主隊勝</div>
                        <div>和</div>
                        <div>客隊勝</div>
                    </div>
                </div>
                <div>
                    <div>對賽</div>
                    <div>往績</div>
                </div>
            </div>

            {Object.keys(groupedMatches).sort().map((date, index) => (
                <div key={index} style={{marginBottom:'12px'}}>
                    {/* Date Header */}
                    <div className="match-date-header" onClick={() => toggleDateGroup(date)}>
                        <div className="match-date-header-arrow">
                        <img 
                            src={openDates.includes(date) ? "/image/arrow-up.svg" : "/image/arrow-down.svg"} 
                            alt="arrow-toggle" 
                            width={24} 
                            className="match-date-header-arrow-img"
                        />
                        </div>
                        {date} 賽事
                    </div>

                    {openDates.includes(date) && groupedMatches[date].map((match, matchIndex) => (
                        <div key={matchIndex} className={matchIndex % 2 === 0 ? "match-white-row" : "match-grey-row"}>
                            <div className="match-row">
                                <div className="match-time-wid">
                                    <div className="match-time">{formatDate(match.time)}</div>
                                    <div className="match-time">{formatHour(match.time)}</div>
                                </div>
                                <div className="match-vertical-line"></div>
                                <div className="match-id">{match.id}</div>
                                <div className="match-vertical-line"></div>
                                <div className="match-tournament"><img src={match.tournament} alt="tournament" /></div>
                                <div className="match-vertical-line"></div>
                                <div className="match-teams">
                                    <div className="match-teams-flex">
                                        <div className="match-team-tv">
                                            <div className="match-teams-wid">
                                                <div>{match.homeName}</div>
                                                <div>{match.awayName}</div>
                                            </div>
                                            <div className="match-tv">
                                                <img src="/image/early_settlement_icon.svg" width={20} alt="icon"/>
                                                {match.tvChannel ? (
                                                    <div className="match-tvchannel">{match.tvChannel}</div>
                                                ) : (
                                                    ""
                                                )}
                                            </div>
                                        </div>
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
                                </div>
                                <div className="match-vertical-line"></div>
                                {match.homeOdd ? (
                                    <div className="match-odd">
                                        <div className="match-odd-block">
                                            <label className="custom-checkbox">
                                                <input type="checkbox" />
                                                <span></span>
                                            </label>
                                            <span>{match.homeOdd}</span>
                                        </div>
                                        <div className="match-odd-block">
                                            <label className="custom-checkbox">
                                                <input type="checkbox" />
                                                <span></span>
                                            </label>
                                            <span>{match.drawOdd}</span>
                                        </div>
                                        <div className="match-odd-block">
                                            <label className="custom-checkbox">
                                                <input type="checkbox" />
                                                <span></span>
                                            </label>
                                            <span>{match.awayOdd}</span>
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
                    ))}
                </div>
            ))}

            <div className="match-pagination">共有 {matchNumbers} 場賽事</div>
            <div className="match-text">
                <span style={{fontWeight:'700'}}>重要事項:</span> 頁面所示的賠率謹供參考，最終賠率將於投注獲接納時確定。此等頁面上所示的任何數據、文章和其他資料皆以「現況」形式提供，並只作提供資訊之用。若閣下使用該等資料，此<a href="#" className="match-text-link">免責聲明</a>將適用。
            </div>

            <div className={`match-add-bottom ${showBottomBar ? "visible" : "hidden"}`}>
                <button className="match-add-bottom-btn">
                    添加到投注區
                </button>
            </div>
        </div>
    );
};

export default Match;
