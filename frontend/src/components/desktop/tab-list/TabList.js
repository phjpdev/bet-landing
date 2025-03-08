import React, { useState } from 'react';
import './TabList.css';

const TabList = () => {
  const [activeTab, setActiveTab] = useState('tab1');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="tab-list-container">
      {/* Tabs */}
      <div className="tabs">
        <div
          className={`tab ${activeTab === 'tab1' ? 'active' : ''}`}
          onClick={() => handleTabClick('tab1')}
        >
          足智焦點
        </div>
        <div
          className={`tab ${activeTab === 'tab2' ? 'active' : ''}`}
          onClick={() => handleTabClick('tab2')}
        >
          服務提示
        </div>
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {activeTab === 'tab1' && (
          <ul className="list">
            <li>即時戰報</li>
            <li>名家分析</li>
            <li>
              <span className="new-item">
                2分鐘學識過關派彩快 <span className="new-badge"><img src='/image/C_new.gif' alt='set-icon' width={12}></img></span>
              </span>
            </li>
            <li>單項派彩快介紹</li>
            <li style={{borderBottom: 'none'}}>足球投注教學平台</li>
          </ul>
        )}

        {activeTab === 'tab2' && (
          <ul className="list">
            <li>「無效球賽」修訂</li>
            <li>馬會開戶口-全天候網上申請開戶</li>
            <li style={{borderBottom: 'none'}}>有節制博彩</li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default TabList;
