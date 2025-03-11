import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './Login.css'

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const app_url = process.env.REACT_APP_APP_URL;
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${app_url}/api/login`, { username, password });
            localStorage.setItem("token", response.data.token);
            localStorage.removeItem("user-token"); // Removes the user token
            localStorage.removeItem("user-question");
            navigate("/home"); // Redirect after login
        } catch (error) {
            setError("用户名或密码无效");
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h2>登入</h2>
                {error && <p className="error-message">{error}</p>}
                <form onSubmit={handleLogin}>
                    <div className="login-input-div">
                        <input 
                            type="text" 
                            placeholder="用户名" 
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)} 
                            required 
                        />
                        <input 
                            type="password" 
                            placeholder="密码" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            required 
                        />
                    </div>
                    <button type="submit">登入</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
