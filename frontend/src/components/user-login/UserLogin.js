import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import axios from "axios";
import { IoMdClose } from "react-icons/io";
import TermsContent from './TermsContent';
import AccountRecordModal from '../record/AccountRecordModal';
import BalanceEditModal from '../shared/BalanceEditModal';
import { useDisplayBalance } from '../../hooks/useDisplayBalance';
import './UserLogin.css';

const UserLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState("");
    const [eye, setEye] = useState(true);
    const { balance, setBalance, formattedBalance } = useDisplayBalance();
    const [showBalanceModal, setShowBalanceModal] = useState(false);
    const [readTerm, setReadTerm] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showAccountRecordModal, setShowAccountRecordModal] = useState(false);
    const [isLoggingIn, setIsLoggingIn] = useState(false);
    const [showTermsModal, setShowTermsModal] = useState(false);

    const app_url = process.env.REACT_APP_APP_URL;

    const handleUserLogin = async (e) => {
        e.preventDefault();
        setIsLoggingIn(true);
        setError("");

        await new Promise((resolve) => setTimeout(resolve, 5000));

        try {
            const response = await axios.post(`${app_url}/api/user-login`, { username, password });
            localStorage.setItem("user-token", response.data.token);
            localStorage.setItem("user-question", "verified");
            window.dispatchEvent(new Event("user-session-changed"));
            setShowTermsModal(true);
            setError("");
        } catch (error) {
            setError("登入資料不正確，請重新儲入正確的登入名稱及8-20位元包含英文字母及數字的密碼。");
        } finally {
            setIsLoggingIn(false);
        }
    };

    const handleCloseModal = (e) => {
        e.preventDefault();
        setError("");
    };

    const toggleEye = () => {
        setEye((prevEye) => !prevEye);
    };

    const agreeTerms = () => {
        setReadTerm(true);
        setShowTermsModal(false);
    };

    const userLogout = () => {
        localStorage.removeItem("user-token");
        localStorage.removeItem("user-question");
        window.dispatchEvent(new Event("user-session-changed"));
        setShowModal(false);
        setShowAccountRecordModal(false);
        setReadTerm(false);
        setShowTermsModal(false);
    };

    const openAccountRecord = (e) => {
        e.preventDefault();
        if (showAccountRecordModal) {
            return;
        }
        setShowAccountRecordModal(true);
    };

  return (
    <div className='user-login-section'>
            <div className="user-login-container">
                {(readTerm || showTermsModal) ? (
                    <div className='user-login-box'>
                        <div className="user-login-basic-form" style={{display:'flex', justifyContent:'space-between'}}>
                            <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start'}}>
                                <img src='/image/user.svg' alt='user' width={28}/>
                                <div className='user-profile-balance'>
                                    <div style={{fontSize:'12px'}}>投注戶口號碼</div>
                                    <div style={{fontSize:'16px', fontWeight:'500'}}>15339692</div>
                                    <div style={{display:'flex', alignItems:'center', lineHeight:'18px'}}>
                                        <div style={{fontSize:'12px'}}>結餘</div>
                                        <div onClick={toggleEye} style={{ cursor: 'pointer', marginLeft:'8px' }}>
                                            <img src={eye ? '/image/eye_on.svg' : '/image/eye_close.svg'} alt={eye ? "eye-on" : "eye-close"} width={20} />
                                        </div>
                                    </div>
                                    <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                                        <div
                                            className="user-balance-editable"
                                            style={{fontSize:'16px', fontWeight:'500', minWidth:'100px'}}
                                            onClick={() => setShowBalanceModal(true)}
                                        >
                                            {eye ? formattedBalance : '*****'}
                                        </div>
                                        <div style={{cursor:'pointer'}}><img src='/image/refresh.svg' alt='refresh'></img></div>
                                    </div>
                                </div>
                            </div>
                            <div style={{display:'flex', alignItems:'flex-end'}}>
                                <div className='user-logout' onClick={() => setShowModal(true)}>登出</div>
                            </div>
                        </div>
                        <div className="extra-links">
                            <div>
                                <a href="#" onClick={openAccountRecord}>戶口紀錄</a> | 
                                <a href="#">轉賬服務</a>
                            </div>
                            <div className='extra-link-icons'>
                                <img src='/image/add_note_white.svg' alt='add_note_white' width={26}></img>
                                <img src='/image/setIcon.svg' alt='set-icon' width={26}></img>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className='user-login-box'>
                        <div className="user-login-basic-form">
                            {isLoggingIn && (
                                <div className="user-login-loading-overlay" aria-busy="true" aria-label="登入中">
                                    <div className="user-login-loading-box">
                                        <div className="user-login-spinner">
                                            {Array.from({ length: 12 }, (_, i) => (
                                                <span key={i} className="user-login-spinner-bar" />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
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
                                                disabled={isLoggingIn}
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
                                                disabled={isLoggingIn}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <button type="submit" className="user-login-btn" disabled={isLoggingIn}>
                                        登入
                                    </button>
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
                )}
                
                <div className='user-login-detail-container'>
                    {error && 
                        <div className='user-login-error-modal'>
                            <div className='user-login-error-modal-close' onClick={handleCloseModal}>
                                <IoMdClose />
                            </div>
                            <p className="error-text">{error}</p>
                        </div>
                    }
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
        {showTermsModal && createPortal(
            <div className="terms-modal-overlay" role="dialog" aria-modal="true" aria-label="條款及細則">
                <div className="terms-modal">
                    <h2 className="terms-modal-title">條款及細則</h2>
                    <div className="terms-modal-body">
                        <TermsContent />
                    </div>
                    <div className="terms-modal-footer">
                        <button type="button" className="terms-modal-btn" onClick={agreeTerms}>
                            進入主頁
                        </button>
                    </div>
                </div>
            </div>,
            document.body
        )}
        {showModal && (
            <div className="modal-overlay">
                <div className="modal-content">
                    <div className="modal-content-title">fhddhkjc.com says</div>
                    <div>登出後，如有未傳送的注項將被删除。如你正在其他視窗開啟馬會網上服務，該等服務亦會同時被登出，如有需要請關閉該等視窗。</div>
                    <div className="modal-actions">
                        <button onClick={() => setShowModal(false)} className="cancel-btn">取消</button>
                        <button onClick={userLogout} className="confirm-btn">確定</button>
                    </div>
                </div>
            </div>
        )}
        {showAccountRecordModal && (
            <AccountRecordModal onClose={() => setShowAccountRecordModal(false)} />
        )}
        <BalanceEditModal
            isOpen={showBalanceModal}
            initialValue={balance}
            onSave={setBalance}
            onClose={() => setShowBalanceModal(false)}
        />
    </div>
  );
};

export default UserLogin;
