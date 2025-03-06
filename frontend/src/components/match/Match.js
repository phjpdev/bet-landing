import React, { useState, useEffect } from "react";
import axios from "axios";
import './Match.css';

const Match = () => {
    const [matches, setMatches] = useState([]); // Store the match data
    const [matchNumbers, setMatchNumbers] = useState(0); // Store the total number of matches

    useEffect(() => {
        axios.get('http://localhost:5000/api/matches') // Request data from the backend
            .then(response => {
                const matchesData = response.data.matchData;
                setMatches(matchesData); // Set match data to state
                setMatchNumbers(matchesData.length); // Set the number of matches
            })
            .catch(error => {
                console.error('Error fetching match count:', error);
            });
    }, []); 

    return (
        <div className="match-container">
            <div className="match-pagination">共有 {matchNumbers} 場賽事</div>
            {matches.map((match, index) => {
                return (
                    <div key={index}>
                        {match.time} {/* Display the match time */}
                    </div>
                );
            })}
        </div>
    );
};

export default Match;
