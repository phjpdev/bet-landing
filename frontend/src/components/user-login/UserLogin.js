import React, { useState } from 'react';
import axios from "axios";
import { IoMdClose } from "react-icons/io";
import './UserLogin.css';

const UserLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [question, setQuestion] = useState('');
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [questionSuccess, setQuestionSuccess] = useState("");
    const [questionError, setQuestionError] = useState("");

    const app_url = process.env.REACT_APP_APP_URL;
    const handleUserLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${app_url}/api/user-login`, { username, password });
            localStorage.setItem("user-token", response.data.token);
            setSuccess("登入成功！");
            setError("");
            setQuestion("");
            setQuestionError("");
        } catch (error) {
            setError("登入資料不正確，請重新儲入正確的登入名稱及8-20位元包含英文字母及數字的密碼。");
            setSuccess("");
        }
    };

    const handleCloseModal = (e) => {
        e.preventDefault();
        setError("");
    }
    const handleQuestionCancel = (e) => {
        e.preventDefault();
        setSuccess("");
        setUsername("");
        setPassword("");
        localStorage.removeItem("user-token");
        localStorage.removeItem("user-question");
    }
    const handleQuestion = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${app_url}/api/user-login-question`, { question });
            localStorage.setItem("user-question", response.data.token);
            setQuestionSuccess("question success");
            setQuestionError("");
        } catch (error) {
            setQuestionError("登入答案不正確，請重新儲入。如閣下已忘記登入答案，請按此重設。 [第 1 次嘗試，共有 3 次機會]");
            setQuestionSuccess("");
        }
    }

  return (
    <div className='user-login-section'>
        {questionSuccess === "" ? (
            <div className="user-login-container">
                <div className='user-login-box'>
                    <div className="user-login-basic-form">
                        <form onSubmit={handleUserLogin}>
                            <div className='user-login-form'>
                                <div className='user-login-input'>
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
                                <button type="submit" className="user-login-btn">登入</button>
                            </div>
                        </form>
                    </div>
                    <div className="extra-links">
                        <div>
                            <a href="#">申請網上投注服務</a> | 
                            <a href="#">無法登入</a>
                        </div>
                        <div style={{cursor:'pointer'}}>
                            <img src='/image/setIcon.svg' alt='set-icon' width={26}></img>
                        </div>
                    </div>
                </div>
                
                <div className='user-login-detail-container'>
                    {error && 
                        <div className='user-login-error-modal'>
                            <div className='user-login-error-modal-close' onClick={handleCloseModal}>
                                <IoMdClose />
                            </div>
                            <p className="error-text">{error}</p>
                        </div>
                    }
                    {success && (
                        <div className='user-login-answer'>
                            <div className='user-login-answer-title'>登入問題</div>
                            <div className='user-login-answer-content'>
                                <div className='login-question'>你最喜愛的香港地區?</div>
                                <input type='text' className='login-answer-input' value={question} onChange={(e) => setQuestion(e.target.value)}></input>
                                <div className='forgot-answer'>忘記登入答案?</div>
                                {questionError && (
                                    <div className='question-error-div'>
                                        {questionError.split('按此').map((part, index) => (
                                            <React.Fragment key={index}>
                                                {part}
                                                {index < questionError.split('按此').length - 1 && (
                                                    <a href="#" className='question-error-link'>
                                                        按此
                                                    </a>
                                                )}
                                            </React.Fragment>
                                        ))}
                                    </div>
                                )}
                                <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                                    <div className='login-cancel-btn' onClick={handleQuestionCancel}>取消</div>
                                    <div className='login-ok-btn'  onClick={handleQuestion}>確定</div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                
                <div className='user-login-manage'>
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
        ) : (
            <div className="user-login-container">
                <div className='user-login-box'>
                    <div className="user-login-basic-form">
                        
                    </div>
                    <div className="extra-links">
                        <div>
                            <a href="#">申請網上投注服務</a> | 
                            <a href="#">無法登入</a>
                        </div>
                        <div style={{cursor:'pointer'}}>
                            <img src='/image/setIcon.svg' alt='set-icon' width={26}></img>
                        </div>
                    </div>
                </div>
                
                <div className='user-login-detail-container'>
                    
                </div>
            </div>
        )}
    </div>
  );
};

export default UserLogin;
