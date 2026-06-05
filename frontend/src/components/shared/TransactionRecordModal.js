import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { EMPTY_TRANSACTION_FORM } from '../../utils/transactionFormat';
import './TransactionRecordModal.css';

const TransactionRecordModal = ({ isOpen, mode, initialData, onSave, onDelete, onClose }) => {
    const [form, setForm] = useState(EMPTY_TRANSACTION_FORM);

    useEffect(() => {
        if (isOpen) {
            setForm({ ...EMPTY_TRANSACTION_FORM, ...initialData });
        }
    }, [isOpen, initialData]);

    if (!isOpen) {
        return null;
    }

    const title = mode === 'edit' ? '編輯記錄' : '新增記錄';

    const handleChange = (field) => (e) => {
        setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

    const handleToggle = (showShareBet) => {
        setForm((prev) => ({ ...prev, showShareBet }));
    };

    const handleSubmit = () => {
        onSave(form);
        onClose();
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
            onClose();
        }
    };

    return createPortal(
        <div
            className="transaction-record-modal-overlay"
            role="presentation"
            onClick={onClose}
        >
            <div
                className="transaction-record-modal"
                role="dialog"
                aria-modal="true"
                aria-label={title}
                onClick={(e) => e.stopPropagation()}
                onKeyDown={handleKeyDown}
            >
                <h2 className="transaction-record-modal-title">{title}</h2>

                <input
                    type="text"
                    className="transaction-record-input"
                    placeholder="參考編號"
                    value={form.referenceNo}
                    onChange={handleChange('referenceNo')}
                />
                <input
                    type="text"
                    className="transaction-record-input"
                    placeholder="日期時間"
                    value={form.dateTime}
                    onChange={handleChange('dateTime')}
                />
                <textarea
                    className="transaction-record-input transaction-record-textarea"
                    placeholder="投注類別"
                    value={form.betType}
                    onChange={handleChange('betType')}
                    rows={4}
                />
                <textarea
                    className="transaction-record-input transaction-record-textarea"
                    placeholder="細節"
                    value={form.details}
                    onChange={handleChange('details')}
                    rows={4}
                />
                <input
                    type="text"
                    className="transaction-record-input"
                    placeholder="支出"
                    value={form.expense}
                    onChange={handleChange('expense')}
                />
                <input
                    type="text"
                    className="transaction-record-input"
                    placeholder="存入"
                    value={form.deposit}
                    onChange={handleChange('deposit')}
                />

                <p className="transaction-record-share-label">是否顯示 分享注項?</p>
                <div className="transaction-record-share-toggle">
                    <button
                        type="button"
                        className={`transaction-record-toggle-btn ${!form.showShareBet ? 'active' : ''}`}
                        onClick={() => handleToggle(false)}
                    >
                        否
                    </button>
                    <button
                        type="button"
                        className={`transaction-record-toggle-btn ${form.showShareBet ? 'active' : ''}`}
                        onClick={() => handleToggle(true)}
                    >
                        是
                    </button>
                </div>

                <div className={`transaction-record-actions${mode === 'edit' && onDelete ? ' transaction-record-actions--with-delete' : ''}`}>
                    {mode === 'edit' && onDelete && (
                        <button
                            type="button"
                            className="transaction-record-action-btn transaction-record-action-btn--delete"
                            onClick={onDelete}
                        >
                            刪除
                        </button>
                    )}
                    <button type="button" className="transaction-record-action-btn" onClick={onClose}>
                        取消
                    </button>
                    <button type="button" className="transaction-record-action-btn" onClick={handleSubmit}>
                        確定
                    </button>
                </div>
            </div>
        </div>,
        document.body
    );
};

export default TransactionRecordModal;
