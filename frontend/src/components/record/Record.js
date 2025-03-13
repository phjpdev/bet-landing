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
    const [startDate, setStartDate] = useState(new Date());
    
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

    return (
        <div>
            <div className="record-header">
                戶口紀錄
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
                    <div className="record-info-container-content">
                        沒有交易記錄
                    </div>
                </div>
            ) : (
                <div className="record-info-sec">
                    <div className="record-info-search">
                        <div className="date-picker-container">
                            {/* Date Selection Box */}
                            <div className="date-input-box" >
                                <div><span>日期</span></div>
                                <div style={{display:'flex',alignItems:'center', gap:'16px'}}>
                                    <span className="date-display">{initialDateTime} - {initialDateTime}</span>
                                    <span className="arrow-icon"><IoIosArrowDown style={{fontSize:'20px', display:'flex'}}/></span>
                                </div>
                            </div>
                            <div style={{fontSize:'12px', marginTop:'8px', marginLeft:'24px'}}>每次最多可搜尋過去30天內其中8天。(以香港時間計算)</div>
                        </div>
                        <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
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
                            <div className="record-search-btn">搜尋</div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Record;