import React from "react";
import './MobileFooter.css'

const MobileFooter = () => {
    return (
        <div className="mobile-footer-container">
            <div className="footer-top">
                <div className="mobile-footer-banner-media">
                    <img src="/image/media_communication_system.svg" width={40} height={40}/>
                    <div className="footer-banner-media-content">傳媒通訊系統</div>
                </div>
                <div className="footer-banner-rgp-imag">
                    <img src="https://consvc.hkjc.com//consvc.hkjc.com/-/media/Sites/JCBW/RGP_CHI.PNG?sc_lang=zh-HK" width="121" height="74" title="博彩要有節制" />
                </div>
            </div>
            <div className="footer-banner-rgp-content">
                <div className="footer-play-responsibly">博彩要有節制</div>
                <div>
                    <ul style={{paddingInlineStart:'20px', fontSize:'12px'}}>
                        <li>未滿十八歲人士不得投注或進入可投注的地方。</li>
                        <li>向非法或海外莊家下注，即屬違法，且可被判監禁。</li>
                        <li>切勿沉迷賭博，如需尋求輔導協助，可致電平和基金熱線1834 633。</li>
                    </ul>
                </div>
            </div>
            <div className="mobile-footer-bottom">
                <div className="mobile-rgpLinks" style={{fontSize:'12px'}}>
                    <div className="mobile-footer-link">常見問題</div>
                    <div className="mobile-footer-line-bar"></div>
                    <div className="mobile-footer-link">聯絡我們</div>
                    <div className="mobile-footer-line-bar"></div>
                    <div className="mobile-footer-link">網頁指南</div>
                    <div className="mobile-footer-line-bar"></div>
                    <div className="mobile-footer-link">提倡有節制博彩</div>
                    <div className="mobile-footer-line-bar"></div>
                    <div className="mobile-footer-link">規例</div>
                    <div className="mobile-footer-line-bar"></div>
                    <div className="mobile-footer-link">私隱條款</div>
                    <div className="mobile-footer-line-bar"></div>
                    <div className="mobile-footer-link">網絡保安</div>
                </div>
                <div className="mobile-copyRight">
                    <a href="#" className="copyRight-link">版權所有 不得轉載</a>
                    <span> © 2006-2025 香港馬會足球博彩有限公司</span>
                </div>
            </div>
        </div>
    );
}
export default MobileFooter;