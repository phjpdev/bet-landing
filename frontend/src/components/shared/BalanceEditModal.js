import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import './BalanceEditModal.css';

const BalanceEditModal = ({ isOpen, initialValue, onSave, onClose }) => {
    const [value, setValue] = useState(initialValue);

    useEffect(() => {
        if (isOpen) {
            setValue(initialValue);
        }
    }, [isOpen, initialValue]);

    if (!isOpen) {
        return null;
    }

    const handleSave = () => {
        onSave(value);
        onClose();
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSave();
        } else if (e.key === 'Escape') {
            onClose();
        }
    };

    return createPortal(
        <div
            className="balance-edit-modal-overlay"
            role="presentation"
            onClick={onClose}
        >
            <div
                className="balance-edit-modal-content"
                role="dialog"
                aria-modal="true"
                aria-label="編輯結餘"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="balance-edit-modal-title">編輯結餘</div>
                <div className="balance-edit-modal-field">
                    <label htmlFor="balance-edit-input">結餘 ($)</label>
                    <input
                        id="balance-edit-input"
                        type="text"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        autoFocus
                    />
                </div>
                <div className="balance-edit-modal-actions">
                    <button type="button" className="balance-edit-cancel-btn" onClick={onClose}>
                        取消
                    </button>
                    <button type="button" className="balance-edit-confirm-btn" onClick={handleSave}>
                        確定
                    </button>
                </div>
            </div>
        </div>,
        document.body
    );
};

export default BalanceEditModal;
