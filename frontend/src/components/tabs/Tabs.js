import React, { useState } from 'react';
import './Tabs.css';

const Tabs = () => {
  const [activeTab, setActiveTab] = useState('tab1');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="tab-container">
      <div className="tabs">
        <div
          className={`tab ${activeTab === 'tab1' ? 'active' : ''}`}
          onClick={() => handleTabClick('tab1')}
        >
          主頁
        </div>
        <div
          className={`tab ${activeTab === 'tab2' ? 'active' : ''}`}
          onClick={() => handleTabClick('tab2')}
        >
          受注時間
        </div>
        <div
          className={`tab ${activeTab === 'tab3' ? 'active' : ''}`}
          onClick={() => handleTabClick('tab3')}
        >
          賽果/派彩
        </div>
        <div
          className={`tab ${activeTab === 'tab4' ? 'active' : ''}`}
          onClick={() => handleTabClick('tab4')}
        >
          派彩快
        </div>
        <div
          className={`tab ${activeTab === 'tab5' ? 'active' : ''}`}
          onClick={() => handleTabClick('tab5')}
        >
          過關/計數機
        </div>
        <div
          className={`tab ${activeTab === 'tab6' ? 'active' : ''}`}
          onClick={() => handleTabClick('tab6')}
        >
          足智資料庫
        </div>
        <div
          className={`tab ${activeTab === 'tab7' ? 'active' : ''}`}
          onClick={() => handleTabClick('tab7')}
        >
          投注種類
        </div>
      </div>
    </div>
  );
};

export default Tabs;
