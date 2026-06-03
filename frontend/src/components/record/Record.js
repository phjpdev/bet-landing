import React, { useState, useEffect, useMemo } from "react";

import './Record.css';

import { IoIosArrowDown } from "react-icons/io";
import { useDisplayBalance } from '../../hooks/useDisplayBalance';
import { useAccountTransactions, createTransactionId } from '../../hooks/useAccountTransactions';
import BalanceEditModal from '../shared/BalanceEditModal';
import TransactionRecordModal from '../shared/TransactionRecordModal';
import {
    EMPTY_TRANSACTION_FORM,
    computeHkjcTableColumnWidths,
    formatBalanceSummaryRow,
    formatCurrency,
} from '../../utils/transactionFormat';

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";



const TABLE_COLUMNS = [

    '交易編號',

    '日期/時間',

    '賽事日',

    '投注類別',

    '細節',

    '收據',

    '支出',

    '存入',

];

const ACCOUNT_RECORD_TABLE_LOAD_MS = 4500;

const HkjcTableSpinner = () => (
    <div className="record-hkjc-spinner" aria-hidden="true">
        {Array.from({ length: 12 }, (_, i) => (
            <span key={i} className="record-hkjc-spinner-bar" />
        ))}
    </div>
);

const Record = ({ embedded = false }) => {

    const [activeTab, setActiveTab] = useState('record-header-tab3');
    const [isTableLoading, setIsTableLoading] = useState(embedded);

    const [currentDateTime, setCurrentDateTime] = useState("");

    const [initialDateTime, setInitialDateTime] = useState("");

    const [showRecordContainer, setShowRecordContainer] = useState(false);

    const [dateRange, setDateRange] = useState([null, null]);

    const [startDate, endDate] = dateRange;

    const [showModal, setShowModal] = useState(false);

    const [showBalanceModal, setShowBalanceModal] = useState(false);

    const { balance, setBalance, formattedBalance } = useDisplayBalance();

    const { transactions, saveTransaction } = useAccountTransactions();

    const hkjcTableColumnWidths = useMemo(
        () => computeHkjcTableColumnWidths(transactions),
        [transactions],
    );

    const [showTable, setShowTable] = useState(false);

    const [legacyTransactions, setLegacyTransactions] = useState([]);

    const [transactionModal, setTransactionModal] = useState({
        open: false,
        mode: 'add',
        id: null,
        data: EMPTY_TRANSACTION_FORM,
    });

    const [formData, setFormData] = useState({

        transactionId: "",

        eventDate: "",

        betType: "",

        details: "",

        expense: "",

        deposit: "",

    });



    const handleTabClick = (tab) => {
        setActiveTab(tab);
        if (tab !== 'record-header-tab3') {
            setShowRecordContainer(false);
        }
    };



    useEffect(() => {
        if (!embedded) {
            return undefined;
        }
        setIsTableLoading(true);
        const timer = setTimeout(() => setIsTableLoading(false), ACCOUNT_RECORD_TABLE_LOAD_MS);
        return () => clearTimeout(timer);
    }, [embedded]);

    useEffect(() => {

        const updateDateTime = () => {

            const now = new Date();

            const formattedDate = now.toLocaleDateString("zh-HK", {

                year: "numeric",

                month: "2-digit",

                day: "2-digit",

            });



            const formattedTime = now.toLocaleTimeString("zh-HK", {

                hour: "2-digit",

                minute: "2-digit",

                hour12: false,

            });



            setCurrentDateTime(`${formattedDate} ${formattedTime}`);

            setInitialDateTime(formattedDate);

        };



        updateDateTime();

        const interval = setInterval(updateDateTime, 1000);

        return () => clearInterval(interval);

    }, []);



    const getMaxDate = () => {

        if (!startDate) return null;

        const maxDate = new Date(startDate);

        maxDate.setDate(maxDate.getDate() + 7);

        return maxDate;

    };



    const handleShowTable = () => {

        setShowModal(false);

        setShowRecordContainer(false);

        setShowTable(true);

        const newTransaction = {

            transactionId: formData.transactionId || "",

            dateTime: currentDateTime,

            eventDate: formData.eventDate || "",

            betType: formData.betType || "",

            details: formData.details || "",

            receipt: "",

            expense: formData.expense || "",

            deposit: formData.deposit || "",

        };



        setLegacyTransactions([...legacyTransactions, newTransaction]);

        setFormData({ transactionId: "", eventDate: "", betType: "", details: "", expense: "", deposit: "" });

    };

    const openAddTransaction = () => {
        setTransactionModal({
            open: true,
            mode: 'add',
            id: null,
            data: { ...EMPTY_TRANSACTION_FORM, dateTime: currentDateTime },
        });
    };

    const openEditTransaction = (tx) => {
        setTransactionModal({
            open: true,
            mode: 'edit',
            id: tx.id,
            data: {
                referenceNo: tx.referenceNo || '',
                dateTime: tx.dateTime || '',
                eventDate: tx.eventDate || '',
                betType: tx.betType || '',
                details: tx.details || '',
                receipt: tx.receipt || '',
                expense: tx.expense || '',
                deposit: tx.deposit || '',
                showShareBet: Boolean(tx.showShareBet),
                balanceSnapshot: tx.balanceSnapshot || '',
            },
        });
    };

    const closeTransactionModal = () => {
        setTransactionModal((prev) => ({ ...prev, open: false }));
    };

    const handleSaveTransaction = (form) => {
        saveTransaction({
            id: transactionModal.id || createTransactionId(),
            referenceNo: form.referenceNo,
            dateTime: form.dateTime,
            eventDate: form.eventDate || '',
            betType: form.betType,
            details: form.details,
            receipt: form.receipt || '',
            expense: form.expense,
            deposit: form.deposit,
            showShareBet: form.showShareBet,
            balanceSnapshot: form.balanceSnapshot || balance,
        });
    };

    const renderTransactionModal = () => (
        <TransactionRecordModal
            isOpen={transactionModal.open}
            mode={transactionModal.mode}
            initialData={transactionModal.data}
            onSave={handleSaveTransaction}
            onClose={closeTransactionModal}
        />
    );



    const handleInputChange = (e) => {

        const { name, value } = e.target;

        setFormData({ ...formData, [name]: value });

    };



    const renderSearchOverlay = () => (

        <div className="record-info-sec">

            <div className="record-info-search">

                <div className="date-picker-container">

                    <DatePicker

                        selectsRange={true}

                        startDate={startDate}

                        endDate={endDate}

                        onChange={(update) => { setDateRange(update); }}

                        dateFormat="dd/MM/yyyy"

                        maxDate={getMaxDate()}

                        withPortal

                        customInput={<CustomInput value={startDate && endDate ? `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}` : ""} initialDateTime={initialDateTime} />}

                    />

                    <div className="record-search-hint">每次最多可搜尋過去30天內其中8天。(以香港時間計算)</div>

                </div>



                <div className="date-picker-container date-picker-container--last">

                    <div className="date-input-box">

                        <div><span>交易種類</span></div>

                        <div className="date-input-box-right">

                            <span className="date-display">所有投注種類</span>

                            <span className="arrow-icon"><IoIosArrowDown style={{ fontSize: '20px', display: 'flex' }} /></span>

                        </div>

                    </div>

                    <div className="date-input-box date-input-box--spaced">

                        <div><span>顯示種類</span></div>

                        <div className="date-input-box-right">

                            <span className="date-display">所有</span>

                            <span className="arrow-icon"><IoIosArrowDown style={{ fontSize: '20px', display: 'flex' }} /></span>

                        </div>

                    </div>

                </div>

                <div className="record-search-btn-div">

                    <div className="record-search-btn" onClick={() => { setShowRecordContainer(false); }}>搜尋</div>

                </div>

            </div>

        </div>

    );



    const openBalanceModal = () => setShowBalanceModal(true);

    const renderBalanceModal = () => (
        <BalanceEditModal
            isOpen={showBalanceModal}
            initialValue={balance}
            onSave={setBalance}
            onClose={() => setShowBalanceModal(false)}
        />
    );

    const renderExportModal = () => showModal && (

        <div className="modal-overlay">

            <div className="modal-content" style={{ height: "auto" }}>

                <div className="modal-container">

                    <div className="modal-input">

                        <label>交易編號</label>

                        <input type="text" name="transactionId" onChange={handleInputChange} />

                    </div>

                    <div className="modal-input">

                        <label>賽事日</label>

                        <input type="text" name="eventDate" onChange={handleInputChange} />

                    </div>

                    <div className="modal-input">

                        <label>投注類別</label>

                        <input type="text" name="betType" onChange={handleInputChange} />

                    </div>

                    <div className="modal-input">

                        <label>細節</label>

                        <textarea name="details" onChange={handleInputChange} rows="3" style={{ resize: 'none' }} />

                    </div>

                    <div className="modal-input">

                        <label>支出</label>

                        <input type="text" name="expense" onChange={handleInputChange} />

                    </div>

                    <div className="modal-input">

                        <label>存入</label>

                        <input type="text" name="deposit" onChange={handleInputChange} />

                    </div>

                </div>

                <div className="modal-actions">

                    <button type="button" onClick={() => setShowModal(false)} className="cancel-btn">取消</button>

                    <button type="button" onClick={handleShowTable} className="confirm-btn">確定</button>

                </div>

            </div>

        </div>

    );



    const renderDetailsCell = (tx) => (
        <td
            className="record-hkjc-details-cell"
            onClick={() => openEditTransaction(tx)}
        >
            {tx.details}
        </td>
    );

    const renderHkjcTransactionTable = () => (
        <div className={`record-hkjc-table-area${isTableLoading ? ' record-hkjc-table-area--loading' : ''}`}>
            <div className="record-hkjc-table-scroll">
                <table className="record-hkjc-table">
                    <colgroup>
                        {TABLE_COLUMNS.map((col, index) => (
                            <col key={col} style={{ width: hkjcTableColumnWidths[index] }} />
                        ))}
                    </colgroup>
                    <thead>
                        <tr>
                            {TABLE_COLUMNS.map((col) => (
                                <th
                                    key={col}
                                    className={col === '細節' ? 'record-hkjc-th-details' : ''}
                                    onClick={col === '細節' ? openAddTransaction : undefined}
                                >
                                    {col}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {isTableLoading ? (
                            <tr className="record-hkjc-table-loading-row">
                                <td colSpan={8}>
                                    <div
                                        className="record-hkjc-table-loading-inner"
                                        aria-busy="true"
                                        aria-label="載入中"
                                    >
                                        <HkjcTableSpinner />
                                    </div>
                                </td>
                            </tr>
                        ) : transactions.length === 0 ? (
                            <tr>
                                <td colSpan={8} className="record-hkjc-empty-cell">
                                    沒有交易紀錄
                                </td>
                            </tr>
                        ) : (
                            transactions.map((tx) => (
                                <React.Fragment key={tx.id}>
                                    {tx.balanceSnapshot !== '' && tx.dateTime && (
                                        <tr className="record-hkjc-balance-summary-row">
                                            <td colSpan={8}>
                                                {formatBalanceSummaryRow(tx.dateTime, tx.balanceSnapshot)}
                                            </td>
                                        </tr>
                                    )}
                                    <tr className="record-hkjc-transaction-row">
                                        <td>{tx.referenceNo}</td>
                                        <td>{tx.dateTime}</td>
                                        <td>{tx.eventDate}</td>
                                        <td>{tx.betType}</td>
                                        {renderDetailsCell(tx)}
                                        <td>{tx.receipt}</td>
                                        <td className="record-hkjc-expense-cell">
                                            {tx.expense ? formatCurrency(tx.expense) : ''}
                                        </td>
                                        <td className="record-hkjc-deposit-cell">
                                            {tx.deposit ? formatCurrency(tx.deposit) : ''}
                                        </td>
                                    </tr>
                                </React.Fragment>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );

    const renderAccountRecordTab = () => renderHkjcTransactionTable();

    const renderHkjcDateRow = () => (
        <div className="record-hkjc-date-row-wrapper">
            <div className="record-hkjc-date-row">
                <span className="record-hkjc-date-text">
                    日期範圍 {initialDateTime} - {initialDateTime}
                </span>
                <button
                    type="button"
                    className="record-hkjc-search-btn"
                    onClick={() => setShowRecordContainer(true)}
                >
                    重新搜尋
                </button>
            </div>
        </div>
    );

    const renderEmbeddedTabContent = () => {
        if (activeTab === 'record-header-tab1') {
            return (
                <>
                    <div className="record-hkjc-hint-bar">
                        複查是次登入之每項交易細節。客戶登出「投注區」後，此處紀錄亦將被清除。
                    </div>
                    <div className="record-hkjc-empty record-hkjc-empty--session">是次未有交易紀錄。</div>
                </>
            );
        }

        if (activeTab === 'record-header-tab2') {
            return (
                <div className="record-hkjc-empty record-hkjc-empty--transaction">沒有被接納交易。</div>
            );
        }

        if (showRecordContainer) {
            return renderSearchOverlay();
        }

        return renderAccountRecordTab();
    };

    if (embedded) {
        return (
            <div className="record-root record-root--embedded">
                <div className="record-hkjc-page">
                    <div className="record-hkjc-topbar">
                        <span className="record-hkjc-topbar-title">戶口紀錄</span>
                        <div className="record-hkjc-topbar-actions">
                            <button
                                type="button"
                                className="record-hkjc-topbar-action"
                                onClick={() => setShowModal(true)}
                            >
                                <img src="/image/download-white.svg" alt="" width={18} height={18} />
                                <span>匯出檔案</span>
                            </button>
                            <button
                                type="button"
                                className="record-hkjc-topbar-action"
                                onClick={() => window.print()}
                            >
                                <img src="/image/print.svg" alt="" className="record-hkjc-topbar-icon--print" width={18} height={18} />
                                <span>列印</span>
                            </button>
                        </div>
                    </div>
                    <div className="record-hkjc-tabs">
                        <button
                            type="button"
                            className={`record-hkjc-tab ${activeTab === 'record-header-tab1' ? 'active' : ''}`}
                            onClick={() => handleTabClick('record-header-tab1')}
                        >
                            是次交易紀錄
                        </button>
                        <button
                            type="button"
                            className={`record-hkjc-tab ${activeTab === 'record-header-tab2' ? 'active' : ''}`}
                            onClick={() => handleTabClick('record-header-tab2')}
                        >
                            交易紀錄
                        </button>
                        <button
                            type="button"
                            className={`record-hkjc-tab ${activeTab === 'record-header-tab3' ? 'active' : ''}`}
                            onClick={() => handleTabClick('record-header-tab3')}
                        >
                            戶口紀錄
                        </button>
                    </div>
                    {activeTab === 'record-header-tab3' && (
                        <div className="record-hkjc-summary">
                            <div className="record-hkjc-summary-item record-hkjc-summary-item--first">
                                <span>時間:</span>
                                <span className="record-hkjc-summary-value">{currentDateTime}</span>
                            </div>
                            <div className="record-hkjc-summary-item">
                                <span>投注戶口號碼:</span>
                                <span className="record-hkjc-summary-value">15339692</span>
                            </div>
                            <div className="record-hkjc-summary-item">
                                <span className="record-hkjc-summary-label">結餘:</span>
                                <span
                                    className="record-hkjc-balance record-balance-editable"
                                    onClick={openBalanceModal}
                                >
                                    {formattedBalance}
                                </span>
                            </div>
                        </div>
                    )}
                    {activeTab === 'record-header-tab3' && !showRecordContainer && renderHkjcDateRow()}
                    <div className="record-hkjc-main">
                        {renderEmbeddedTabContent()}
                    </div>
                </div>
                {renderExportModal()}
                {renderBalanceModal()}
                {renderTransactionModal()}
            </div>
        );
    }



    return (

        <div className="record-root">

            <div>

                <div className="record-header">

                    <div>戶口紀錄</div>

                    <div className="upload-record-table" onClick={() => { setShowModal(true); }}>

                        <img src="/image/download-white.svg" alt="download" width={24} />

                        <span>匯出檔案</span>

                    </div>

                </div>

                <div className="record-header-tabs">

                    <div className={`record-header-tab ${activeTab === 'record-header-tab1' ? 'active' : ''}`} onClick={() => handleTabClick('record-header-tab1')}>是次交易紀錄</div>

                    <div className={`record-header-tab ${activeTab === 'record-header-tab2' ? 'active' : ''}`} onClick={() => handleTabClick('record-header-tab2')}>交易紀錄</div>

                    <div className={`record-header-tab ${activeTab === 'record-header-tab3' ? 'active' : ''}`} onClick={() => handleTabClick('record-header-tab3')}>戶口紀錄</div>

                </div>

                <div className="record-info-header">

                    <div className="record-info-item" style={{ borderLeft: 'none', width: '34%' }}>

                        <div className="record-info-label">時間:</div>

                        <div className="record-info-value">{currentDateTime}</div>

                    </div>

                    <div className="record-info-item" style={{ width: '38%' }}>

                        <div className="record-info-label">投注戶口號碼:</div>

                        <div className="record-info-value">15339692</div>

                    </div>

                    <div className="record-info-item" style={{ width: '28%' }}>

                        <div className="record-info-label">結餘:</div>

                        <div
                            className="record-info-value balance record-balance-editable"
                            onClick={openBalanceModal}
                        >
                            {formattedBalance}
                        </div>

                    </div>

                </div>

                <div className="record-content-scroll">

                    {showRecordContainer === false ? (

                        <div className="record-info-container">

                            <div className="record-info-container-header">

                                <div className="record-info-container-date">日期範圍 {initialDateTime} - {initialDateTime}</div>

                                <div className="record-info-container-button" onClick={() => { setShowRecordContainer(true); }}>重新搜尋</div>

                            </div>

                            {showTable === false ? (

                                <div className="record-info-container-content">沒有交易紀錄</div>

                            ) : (

                                <div style={{ padding: "0 12px" }}>

                                    {legacyTransactions.map((transaction, index) => (

                                        <div key={index} style={{ marginBottom: "12px" }}>

                                            <table className="transaction-table">

                                                <tbody>

                                                    <tr className="transaction-header">

                                                        <td className="table-label" style={{ background: "#757575", borderRight: 'none' }}>交易編號 {transaction.transactionId}</td>

                                                        <td className="table-value" style={{ background: "#757575" }} />

                                                    </tr>

                                                    <tr>

                                                        <td className="table-label">日期/時間</td>

                                                        <td className="table-value">{transaction.dateTime}</td>

                                                    </tr>

                                                    <tr>

                                                        <td className="table-label">賽事日</td>

                                                        <td className="table-value">{transaction.eventDate}</td>

                                                    </tr>

                                                    <tr>

                                                        <td className="table-label">投注類別</td>

                                                        <td className="table-value">{transaction.betType}</td>

                                                    </tr>

                                                    <tr>

                                                        <td className="table-label">細節</td>

                                                        <td className="table-value" style={{ whiteSpace: "pre-line" }}>{transaction.details}</td>

                                                    </tr>

                                                    <tr>

                                                        <td className="table-label">支出</td>

                                                        <td className="table-value">{transaction.expense}</td>

                                                    </tr>

                                                    <tr>

                                                        <td className="table-label">存入</td>

                                                        <td className="table-value">{transaction.deposit}</td>

                                                    </tr>

                                                </tbody>

                                            </table>

                                        </div>

                                    ))}

                                </div>

                            )}

                        </div>

                    ) : (

                        renderSearchOverlay()

                    )}

                </div>

            </div>

            {renderExportModal()}

            {renderBalanceModal()}

            {renderTransactionModal()}

        </div>

    );

};



const CustomInput = ({ value, onClick, initialDateTime }) => (

    <div className="date-input-box" onClick={onClick}>

        <div><span>日期</span></div>

        <div className="date-input-box-right">

            {value || `${initialDateTime} - ${initialDateTime}`}

            <span className="arrow-icon"><IoIosArrowDown style={{ fontSize: '20px', display: 'flex' }} /></span>

        </div>

    </div>

);



export default Record;

