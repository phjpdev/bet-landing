import React, { useState } from 'react';
import './TabList.css';

const TabList = () => {
  const [activeTab, setActiveTab] = useState('tab1');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="tab-list-container">
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

      <div className="tab-content">
        {activeTab === 'tab1' && (
          <ul className="list">
            <li>同場過關最高賠率勝出項目</li>
            <li>即時戰報</li>
            <li>名家分析</li>
            <li>
              <span className="new-item">
                2分鐘學識過關派彩快
              </span>
            </li>
            <li>單項派彩快介紹</li>
            <li>足球投注教學平台</li>
          </ul>
        )}

        {activeTab === 'tab2' && (
          <ul className="list">
            <li>馬會開戶口-全天候網上申請開戶</li>
            <li>有節制博彩</li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default TabList;
