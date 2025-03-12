import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Login from "./components/login/Login";
import Home from './Home';
import MobileHome from "./MobileHome";
import Record from "./components/record/Record";

function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(!!localStorage.getItem("user-token"));
  const [isUserQuestionAuthenticated, setIsUserQuestionAuthenticated] = useState(!!localStorage.getItem("user-question"));

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    // Re-check token on component mount
    const token = localStorage.getItem("token");
    const userToken = localStorage.getItem("user-token");
    const userQuestion = localStorage.getItem("user-question");
    if (token) {
      setIsAuthenticated(true);
    }
    if (userToken) {
      setIsUserAuthenticated(true);
    }
    if (userQuestion) {
      setIsUserQuestionAuthenticated(true);
    }
  }, []);

  return (
    <Router>
      <Routes>
        {/* If authenticated, redirect to /home */}
        <Route path="/login" element={isAuthenticated ? <Navigate to="/home" /> : <Login />} />
        <Route path="/home" element={isMobile ? <MobileHome /> : <Home />} />
        <Route path="/account-record" element={isUserAuthenticated && isUserQuestionAuthenticated ? <Record /> : <Navigate to="/home" />} />
        {/* Redirect all other routes to login */}
        <Route path="*" element={<Navigate to={isAuthenticated ? "/home" : "/login"} />} />
      </Routes>
    </Router>
  );
}

export default App;
