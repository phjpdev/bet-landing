import React, { useState } from 'react';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Logged in with', { username, password });
  };

  return (
    <div className="login-container">
        <div className='login-box'>
            <div className="login-basic-form">
                <form onSubmit={handleLogin}>
                    <div className='login-form'>
                        <div className='login-input'>
                            <div className="input-group">
                                <input
                                    type="text"
                                    placeholder="登入名稱 / 投注戶口號碼"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="input-field"
                                    required
                                />
                            </div>
                            <div className="input-group">
                                <input
                                    type="password"
                                    placeholder="網上密碼"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="input-field"
                                    required
                                />
                            </div>
                        </div>
                        <button type="submit" className="login-btn">登入</button>
                    </div>
                </form>
            </div>
            <div className="extra-links">
                <div>
                    <a href="#">申請網上投注服務</a> | 
                    <a href="#">無法登入</a>
                </div>
                <div>
                    <img src='/image/setIcon.svg' alt='set-icon' width={26}></img>
                </div>
            </div>
        </div>
        <div className='login-manage'>
            <div className='manage-text'>
                <div>總注數:</div>
                <div>0</div>
            </div>
            <div className='manage-text'>
                <div>總投注金額:</div>
                <div>$0</div>
            </div>
            <div className='manage-button'>
                <button style={{width:'90px'}}><img src='/image/deleteIcon.svg' alt='delete-icon'></img></button>
                <button style={{width:'230px'}}>發送注項</button>
            </div>
        </div>
    </div>
  );
};

export default Login;
