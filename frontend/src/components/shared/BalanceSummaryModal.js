import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
    buildBalanceSummaryDateTime,
    parseBalanceSummaryDateTime,
    sanitizeNumericInput,
} from '../../utils/transactionFormat';
import './TransactionRecordModal.css';

const EMPTY_PARTS = { year: '', month: '', day: '', hour: '', minute: '' };

const BalanceSummaryModal = ({ isOpen, transaction, onSave, onDelete, onClose }) => {
    const [parts, setParts] = useState(EMPTY_PARTS);
    const [balanceSnapshot, setBalanceSnapshot] = useState('');

    useEffect(() => {
        if (!isOpen || !transaction) {
            return;
        }
        setParts(parseBalanceSummaryDateTime(transaction.dateTime) || EMPTY_PARTS);
        setBalanceSnapshot(sanitizeNumericInput(transaction.balanceSnapshot) || '');
    }, [isOpen, transaction]);

    if (!isOpen || !transaction) {
        return null;
    }

    const setPart = (field) => (e) => {
        setParts((prev) => ({ ...prev, [field]: e.target.value }));
    };

    const handleSubmit = () => {
        onSave({
            dateTime: buildBalanceSummaryDateTime(parts),
            balanceSnapshot: sanitizeNumericInput(balanceSnapshot) || '0',
        });
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
                className="transaction-record-modal balance-summary-modal"
                role="dialog"
                aria-modal="true"
                aria-label="編輯戶口結餘"
                onClick={(e) => e.stopPropagation()}
                onKeyDown={handleKeyDown}
            >
                <h2 className="transaction-record-modal-title">編輯戶口結餘</h2>

                <div className="balance-summary-modal-row">
                    <input
                        type="text"
                        inputMode="numeric"
                        className="transaction-record-input balance-summary-modal-input balance-summary-modal-input--year"
                        placeholder="年"
                        value={parts.year}
                        maxLength={4}
                        onChange={setPart('year')}
                    />
                    <span className="balance-summary-modal-label">年</span>
                    <input
                        type="text"
                        inputMode="numeric"
                        className="transaction-record-input balance-summary-modal-input"
                        placeholder="月"
                        value={parts.month}
                        maxLength={2}
                        onChange={setPart('month')}
                    />
                    <span className="balance-summary-modal-label">月</span>
                    <input
                        type="text"
                        inputMode="numeric"
                        className="transaction-record-input balance-summary-modal-input"
                        placeholder="日"
                        value={parts.day}
                        maxLength={2}
                        onChange={setPart('day')}
                    />
                    <span className="balance-summary-modal-label">日</span>
                </div>

                <div className="balance-summary-modal-row">
                    <input
                        type="text"
                        inputMode="numeric"
                        className="transaction-record-input balance-summary-modal-input"
                        placeholder="時"
                        value={parts.hour}
                        maxLength={2}
                        onChange={setPart('hour')}
                    />
                    <span className="balance-summary-modal-label">:</span>
                    <input
                        type="text"
                        inputMode="numeric"
                        className="transaction-record-input balance-summary-modal-input"
                        placeholder="分"
                        value={parts.minute}
                        maxLength={2}
                        onChange={setPart('minute')}
                    />
                </div>

                <div className="balance-summary-modal-row balance-summary-modal-row--balance">
                    <span className="balance-summary-modal-label">之戶口結餘:</span>
                    <input
                        type="text"
                        inputMode="decimal"
                        className="transaction-record-input balance-summary-modal-input balance-summary-modal-input--balance"
                        placeholder="金額"
                        value={balanceSnapshot}
                        onChange={(e) => setBalanceSnapshot(e.target.value)}
                    />
                </div>

                <div className="transaction-record-actions transaction-record-actions--with-delete">
                    {onDelete && (
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
        document.body,
    );
};

export default BalanceSummaryModal;
