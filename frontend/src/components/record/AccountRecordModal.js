import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import Record from './Record';
import './AccountRecordModal.css';

const AccountRecordModal = ({ onClose }) => {
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
                        <img src="/favicon.ico" alt="" className="chrome-url-favicon" />
                        <span className="chrome-url">bet.hkjc.com/ch/betslip/acctstmt</span>
                        <div className="chrome-toolbar-right">
                            <span className="chrome-translate-icon" aria-hidden="true">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M4 10h5.5M7.25 6.5 9.5 10l-2.25 3.5M11 6h2.2c1.5 0 2.7 1.1 2.7 2.5S14.7 11 13.2 11H11" stroke="#5f6368" strokeWidth="1.2" strokeLinecap="round" />
                                    <text x="12" y="15" fontSize="7" fill="#34a853" fontFamily="Arial">文</text>
                                </svg>
                            </span>
                            <span className="chrome-install-icon" aria-hidden="true">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                                    <path d="M12 3v10M8.5 9.5 12 13l3.5-3.5" stroke="#5f6368" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M4 17h16" stroke="#5f6368" strokeWidth="1.4" strokeLinecap="round" />
                                </svg>
                            </span>
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
