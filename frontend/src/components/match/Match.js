import React, { useState, useEffect } from "react";
import axios from "axios";
import './Match.css';

const Match = () => {
    const [matches, setMatches] = useState([]); // Store the match data
    const [matchNumbers, setMatchNumbers] = useState(0); // Store the total number of matches

    const fetchMatches = () => {
        axios.get('http://localhost:5000/api/matches') // Request data from the backend
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
        }, 60000);
        return () => clearInterval(interval);
    }, []); 

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
    };

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

    return (
        <div className="match-container">
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

            {matches.map((match, index) => {
                return (
                    <div key={index} className={index % 2 === 0 ? "match-white-row" : "match-grey-row"}>
                        <div className="match-row">
                            <div className="match-time-wid">
                                <div className="match-time">{formatDate(match.time)}</div>
                                <div className="match-time">{formatHour(match.time)}</div>
                            </div>
                            <div className="match-vertical-line"></div>
                            <div className="match-id">{match.id}</div>
                            <div className="match-vertical-line"></div>
                            <div className="match-tournament"><img src={match.tournament}></img></div>
                            <div className="match-vertical-line"></div>
                            <div className="match-teams">
                                <div className="match-teams-flex">
                                    <div className="match-teams-wid">
                                        <div>{match.homeName}</div>
                                        <div>{match.awayName}</div>
                                    </div>
                                    <div className="match-tv">
                                        <img src="/image/early_settlement_icon.svg" width={20}></img>
                                        {match.tvChannel ? (
                                            <div className="match-tvchannel">{match.tvChannel}</div>
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                </div>
                                {match.inPlay ? (
                                    <div className="match-inplay">
                                        <div className="match-vertical-line"></div>
                                        <div style={{margin:'auto'}}>
                                            <img src="/image/icon_clock_red.svg"></img>
                                        </div>
                                    </div>
                                ) : (
                                    ""
                                )}
                            </div>
                            <div className="match-vertical-line"></div>
                            <div className="match-odd">
                                <label className="custom-checkbox">
                                    <input type="checkbox" />
                                    <span></span>
                                </label>
                                <span>{match.homeOdd}</span>
                                <label className="custom-checkbox">
                                    <input type="checkbox" />
                                    <span></span>
                                </label>
                                <span>{match.drawOdd}</span>
                                <label className="custom-checkbox">
                                    <input type="checkbox" />
                                    <span></span>
                                </label>
                                <span>{match.awayOdd}</span>
                            </div>
                            <div className="match-list-icon">
                                <img src="/image/list.svg"></img>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Match;
