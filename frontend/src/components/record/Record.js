import React, {useState, useEffect} from "react";
import './Record.css';
import { IoIosArrowDown } from "react-icons/io";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Record = () => {
    const [activeTab, setActiveTab] = useState('record-header-tab3');
    const [currentDateTime, setCurrentDateTime] = useState("");
    const [initialDateTime, setInitialDateTime] = useState("");
    const [showRecordContainer, setShowRecordContainer] = useState(false);
    const [dateRange, setDateRange] = useState([null, null]);
    const [startDate, endDate] = dateRange;
    const [showModal, setShowModal] = useState(false);
    const [showTable, setShowTable] = useState(false);
    const [transactions, setTransactions] = useState([]);
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
    };

    useEffect(() => {
        const updateDateTime = () => {
          const now = new Date();
          const formattedDate = now.toLocaleDateString("zh-HK", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          }); // Format: DD/MM/YYYY
    
          const formattedTime = now.toLocaleTimeString("zh-HK", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false, // Use 24-hour format
          }); // Format: HH:mm
    
          setCurrentDateTime(`${formattedDate} ${formattedTime}`);
          setInitialDateTime(`${formattedDate}`);
        };
    
        updateDateTime(); // Set initial value
        const interval = setInterval(updateDateTime, 1000); // Update every second
    
        return () => clearInterval(interval); // Cleanup on unmount
    }, []);

    const getMaxDate = () => {
        if (!startDate) return null;
        const maxDate = new Date(startDate);
        maxDate.setDate(maxDate.getDate() + 7); // Add 8 days
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
            expense: formData.expense || "",
            deposit: formData.deposit || "",
        };

        setTransactions([...transactions, newTransaction]); // Preserve previous records
        setShowModal(false); // Close modal
        setFormData({ transactionId: "", eventDate: "", betType: "", details: "", expense: "", deposit: "" }); // Reset form
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <>
            <div>
                <div className="record-header">
                    <div>戶口紀錄</div> 
                    <div className="upload-record-table" onClick={() => {setShowModal(true)}}>
                        <img src="/image/download-white.svg" alt="download" width={24}></img>
                        <span>匯出檔案</span>
                    </div>
                </div>
                <div className="record-header-tabs">
                    <div className={`record-header-tab ${activeTab === 'record-header-tab1' ? 'active' : ''}`} onClick={() => handleTabClick('record-header-tab1')}>是次交易紀錄</div>
                    <div className={`record-header-tab ${activeTab === 'record-header-tab2' ? 'active' : ''}`} onClick={() => handleTabClick('record-header-tab2')}>交易紀錄</div>
                    <div className={`record-header-tab ${activeTab === 'record-header-tab3' ? 'active' : ''}`} onClick={() => handleTabClick('record-header-tab3')}>戶口紀錄</div>
                </div>
                <div className="record-info-header">
                    <div className="record-info-item" style={{borderLeft:'none', width:'34%'}}>
                        <div className="record-info-label">時間:</div>
                        <div className="record-info-value">{currentDateTime}</div>
                    </div>
                    
                    <div className="record-info-item" style={{width:'38%'}}>
                        <div className="record-info-label">投注戶口號碼:</div>
                        <div className="record-info-value">15339692</div>
                    </div>

                    <div className="record-info-item" style={{width:'28%'}}>
                        <div className="record-info-label">結餘:</div>
                        <div className="record-info-value balance">$925.20</div>
                    </div>
                </div>
                {showRecordContainer === false ? (
                    <div className="record-info-container">
                        <div className="record-info-container-header">
                            <div className="record-info-container-date">日期範圍 {initialDateTime} - {initialDateTime}</div>
                            <div className="record-info-container-button" onClick={() => {setShowRecordContainer(true)}}>重新搜尋</div>
                        </div>
                        {showTable === false ? (
                            <div className="record-info-container-content">
                                沒有交易記錄
                            </div>
                        ) : (
                            <div style={{ padding: "0 12px" }}>
                                {transactions.length > 0 &&
                                    transactions.map((transaction, index) => (
                                        <div key={index} style={{ marginBottom: "12px" }}> {/* Adds space between tables */}
                                            <table className="transaction-table">
                                                <tbody>
                                                    <tr className="transaction-header">
                                                        <td className="table-label" style={{ background: "#757575", borderRight:'none' }}>交易編號 {transaction.transactionId}</td>
                                                        <td className="table-value" style={{ background: "#757575" }}></td>
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
                    <div className="record-info-sec">
                        <div className="record-info-search">
                            <div className="date-picker-container">
                                <DatePicker
                                    selectsRange={true}
                                    startDate={startDate}
                                    endDate={endDate}
                                    onChange={(update) => {setDateRange(update);}}
                                    dateFormat="dd/MM/yyyy"
                                    maxDate={getMaxDate()}
                                    withPortal
                                    customInput={<CustomInput value={startDate && endDate ? `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}` : ""} initialDateTime={initialDateTime} />}
                                />
                                <div style={{fontSize:'12px', marginTop:'8px', marginLeft:'24px'}}>每次最多可搜尋過去30天內其中8天。(以香港時間計算)</div>
                            </div>

                            <div className="date-picker-container" style={{borderBottom:'none'}}>
                                <div className="date-input-box">
                                    <div><span>交易種類</span></div>
                                    <div style={{display:'flex',alignItems:'center', gap:'16px'}}>
                                        <span className="date-display">所有投注種類</span>
                                        <span className="arrow-icon"><IoIosArrowDown style={{fontSize:'20px', display:'flex'}}/></span>
                                    </div>
                                </div>
                                <div className="date-input-box" style={{marginTop:'12px'}} >
                                    <div><span>顯示種類</span></div>
                                    <div style={{display:'flex',alignItems:'center', gap:'16px'}}>
                                        <span className="date-display">所有</span>
                                        <span className="arrow-icon"><IoIosArrowDown style={{fontSize:'20px', display:'flex'}}/></span>
                                    </div>
                                </div>
                            </div>
                            <div className="record-search-btn-div">
                                <div className="record-search-btn" onClick={() => {setShowRecordContainer(false)}}>搜尋</div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            {showModal && (
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
                                <textarea 
                                    name="details" 
                                    onChange={handleInputChange} 
                                    rows="3" 
                                    style={{resize:'none'}}
                                />
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
                            <button onClick={() => setShowModal(false)} className="cancel-btn">取消</button>
                            <button onClick={handleShowTable} className="confirm-btn">確定</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

const CustomInput = ({ value, onClick, initialDateTime }) => (
    <div className="date-input-box" onClick={onClick}>
        <div><span>日期</span></div>
        <div style={{display:'flex',alignItems:'center', gap:'16px'}}>
            {value || `${initialDateTime} - ${initialDateTime}`}
            <span className="arrow-icon"><IoIosArrowDown style={{fontSize:'20px', display:'flex'}}/></span>
        </div>
    </div>
);

export default Record;