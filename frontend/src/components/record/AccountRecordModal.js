import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Record from './Record';
import './AccountRecordModal.css';

const DEFAULT_URL = 'bet.hkjc.com/ch/betslip/acctstmt';

const AccountRecordModal = ({ onClose }) => {
    const [url, setUrl] = useState(DEFAULT_URL);

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
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'hidden';
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = '';
        };
    }, [onClose]);

    return createPortal(
        <div className="account-record-modal-root" role="dialog" aria-modal="true" aria-label="戶口紀錄">
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
                            onClick={onClose}
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
                            <button type="button" className="chrome-omnibox-btn" tabIndex={-1} aria-label="翻譯">
                                <img
                                    src="/image/translate.png"
                                    alt=""
                                    className="chrome-omnibox-img chrome-omnibox-img--translate"
                                />
                            </button>
                            <button type="button" className="chrome-omnibox-btn" tabIndex={-1} aria-label="下載">
                                <img
                                    src="/image/download.png"
                                    alt=""
                                    className="chrome-omnibox-img chrome-omnibox-img--download"
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
