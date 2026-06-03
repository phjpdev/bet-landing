import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Record from './Record';
import './AccountRecordModal.css';

const DEFAULT_URL = 'bet.hkjc.com/ch/betslip/acctstmt';

const MODAL_TRANSITION_MS = 280;

const AccountRecordModal = ({ onClose }) => {
    const [url, setUrl] = useState(DEFAULT_URL);
    const [isVisible, setIsVisible] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const isClosingRef = useRef(false);

    const requestClose = useCallback(() => {
        if (isClosingRef.current) {
            return;
        }
        isClosingRef.current = true;
        setIsClosing(true);
        setIsVisible(false);
    }, []);

    const handleUrlFocus = (e) => {
        e.target.select();
    };

    const handleUrlBlur = () => {
        if (!url.trim()) {
            setUrl(DEFAULT_URL);
        }
    };

    const handleUrlKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.target.blur();
        }
    };

    useEffect(() => {
        let innerFrame;
        const outerFrame = requestAnimationFrame(() => {
            innerFrame = requestAnimationFrame(() => setIsVisible(true));
        });
        return () => {
            cancelAnimationFrame(outerFrame);
            if (innerFrame) {
                cancelAnimationFrame(innerFrame);
            }
        };
    }, []);

    useEffect(() => {
        if (!isClosing) {
            return undefined;
        }
        const timer = setTimeout(() => onClose(), MODAL_TRANSITION_MS);
        return () => clearTimeout(timer);
    }, [isClosing, onClose]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                requestClose();
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'hidden';
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = '';
        };
    }, [requestClose]);

    return createPortal(
        <div
            className={`account-record-modal-root${isVisible ? ' account-record-modal-root--visible' : ''}`}
            role="dialog"
            aria-modal="true"
            aria-label="戶口紀錄"
        >
            <div className="account-record-modal-window">
                <div className="chrome-titlebar">
                    <div className="chrome-titlebar-left">
                        <img src="/favicon.ico" alt="" className="chrome-favicon" />
                        <span className="chrome-title-text">香港賽馬會 - Google Chrome</span>
                    </div>
                    <div className="chrome-window-controls">
                        <button type="button" className="chrome-win-btn" tabIndex={-1} aria-hidden="true">
                            <span className="chrome-win-minimize" />
                        </button>
                        <button type="button" className="chrome-win-btn" tabIndex={-1} aria-hidden="true">
                            <span className="chrome-win-maximize" />
                        </button>
                        <button
                            type="button"
                            className="chrome-win-btn chrome-win-close"
                            onClick={requestClose}
                            aria-label="關閉"
                        >
                            <span className="chrome-win-close-icon" />
                        </button>
                    </div>
                </div>
                <div className="chrome-toolbar">
                    <div className="chrome-address-bar">
                        <button
                            type="button"
                            className="chrome-omnibox-btn"
                            tabIndex={-1}
                            aria-label="網站設定"
                        >
                            <img
                                src="/image/google-view-info.svg"
                                alt=""
                                className="chrome-omnibox-img chrome-omnibox-img--site-info"
                            />
                        </button>
                        <input
                            type="text"
                            className="chrome-url-input"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            onFocus={handleUrlFocus}
                            onBlur={handleUrlBlur}
                            onKeyDown={handleUrlKeyDown}
                            spellCheck={false}
                            autoComplete="off"
                            aria-label="網址"
                        />
                        <div className="chrome-toolbar-right">
                            {/* <button type="button" className="chrome-omnibox-btn" tabIndex={-1} aria-label="翻譯">
                                <img
                                    src="/image/translate.png"
                                    alt=""
                                    className="chrome-omnibox-img chrome-omnibox-img--translate"
                                />
                            </button> */}
                            <button type="button" className="chrome-omnibox-btn" tabIndex={-1} aria-label="隱藏密碼">
                                <img
                                    src="/image/chrome-eye-off.svg"
                                    alt=""
                                    className="chrome-omnibox-img chrome-omnibox-img--visibility"
                                />
                            </button>
                        </div>
                    </div>
                </div>
                <div className="account-record-modal-body">
                    <Record embedded />
                </div>
            </div>
        </div>,
        document.body
    );
};

export default AccountRecordModal;
