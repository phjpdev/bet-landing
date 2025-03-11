import React, { useState } from 'react';
import axios from "axios";
import { IoMdClose } from "react-icons/io";
import './UserLogin.css';

const UserLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [question, setQuestion] = useState('');
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [questionSuccess, setQuestionSuccess] = useState("");
    const [questionError, setQuestionError] = useState("");
    const [eye, setEye] = useState(true);
    const actualBalance = "925.20"; // Store the actual balance separately
    const [balance, setBalance] = useState(actualBalance);
    const [readTerm, setReadTerm] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const app_url = process.env.REACT_APP_APP_URL;
    const handleUserLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${app_url}/api/user-login`, { username, password });
            localStorage.setItem("user-token", response.data.token);
            setSuccess("登入成功！");
            setError("");
            setQuestion("");
            setQuestionError("");
        } catch (error) {
            setError("登入資料不正確，請重新儲入正確的登入名稱及8-20位元包含英文字母及數字的密碼。");
            setSuccess("");
        }
    };

    const handleCloseModal = (e) => {
        e.preventDefault();
        setError("");
    }
    const handleQuestionCancel = (e) => {
        e.preventDefault();
        setSuccess("");
        setUsername("");
        setPassword("");
        localStorage.removeItem("user-token");
        localStorage.removeItem("user-question");
    }
    const handleQuestion = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${app_url}/api/user-login-question`, { question });
            localStorage.setItem("user-question", response.data.token);
            setQuestionSuccess("question success");
            setQuestionError("");
        } catch (error) {
            setQuestionError("登入答案不正確，請重新儲入。如閣下已忘記登入答案，請按此重設。 [第 1 次嘗試，共有 3 次機會]");
            setQuestionSuccess("");
        }
    }

    const toggleEye = () => {
        setEye(prevEye => !prevEye);
        setBalance(prevBalance => (prevBalance === "*****" ? actualBalance : "*****"));
    };
    const agreeTerms = () => {
        setReadTerm(true);
        setQuestionSuccess("");
        setSuccess("")
    }
    const userLogout = () => {
        localStorage.removeItem("user-token");
        localStorage.removeItem("user-question");
        setShowModal(false);
        setReadTerm(false);
    }

  return (
    <div className='user-login-section'>
        {questionSuccess === "" ? (
            <div className="user-login-container">
                {readTerm === false ? (
                    <div className='user-login-box'>
                        <div className="user-login-basic-form">
                            <form onSubmit={handleUserLogin}>
                                <div className='user-login-form'>
                                    <div className='user-login-input'>
                                        <div className="input-group">
                                            <input
                                                type="text"
                                                placeholder="登入名稱 / 投注戶口號碼"
                                                value={username}
                                                onChange={(e) => setUsername(e.target.value)}
                                                className="input-field"
                                                required
                                            />
                                        </div>
                                        <div className="input-group">
                                            <input
                                                type="password"
                                                placeholder="網上密碼"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                className="input-field"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <button type="submit" className="user-login-btn">登入</button>
                                </div>
                            </form>
                        </div>
                        <div className="extra-links">
                            <div>
                                <a href="#">申請網上投注服務</a> | 
                                <a href="#">無法登入</a>
                            </div>
                            <div style={{cursor:'pointer'}}>
                                <img src='/image/setIcon.svg' alt='set-icon' width={26}></img>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className='user-login-box'>
                        <div className="user-login-basic-form" style={{display:'flex', justifyContent:'space-between'}}>
                            <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start'}}>
                                <img src='/image/user.svg' alt='user' width={28}/>
                                <div className='user-profile-balance'>
                                    <div style={{fontSize:'12px'}}>投注戶口號碼</div>
                                    <div style={{fontSize:'16px', fontWeight:'500'}}>15339692</div>
                                    <div style={{display:'flex', alignItems:'center', lineHeight:'18px'}}>
                                        <div style={{fontSize:'12px'}}>結餘</div>
                                        <div onClick={toggleEye} style={{ cursor: 'pointer', marginLeft:'8px' }}>
                                            <img src={eye ? '/image/eye_on.svg' : '/image/eye_close.svg'} alt={eye ? "eye-on" : "eye-close"} width={20} />
                                        </div>
                                    </div>
                                    <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                                        <div style={{fontSize:'16px', fontWeight:'500', minWidth:'100px'}}>$ {balance}</div>
                                        <div style={{cursor:'pointer'}}><img src='/image/refresh.svg' alt='refresh'></img></div>
                                    </div>
                                </div>
                            </div>
                            <div style={{display:'flex', alignItems:'flex-end'}}>
                                <div className='user-logout' onClick={() => setShowModal(true)}>登出</div>
                            </div>
                        </div>
                        <div className="extra-links">
                            <div>
                                <a href="#">戶口紀錄</a> | 
                                <a href="#">轉賬服務</a>
                            </div>
                            <div className='extra-link-icons'>
                                <img src='/image/add_note_white.svg' alt='add_note_white' width={26}></img>
                                <img src='/image/setIcon.svg' alt='set-icon' width={26}></img>
                            </div>
                        </div>
                    </div> 
                )}
                
                <div className='user-login-detail-container'>
                    {error && 
                        <div className='user-login-error-modal'>
                            <div className='user-login-error-modal-close' onClick={handleCloseModal}>
                                <IoMdClose />
                            </div>
                            <p className="error-text">{error}</p>
                        </div>
                    }
                    {success && (
                        <div className='user-login-answer'>
                            <div className='user-login-answer-title'>登入問題</div>
                            <div className='user-login-answer-content'>
                                <div className='login-question'>你最喜愛的香港地區?</div>
                                <div style={{maxWidth:'240px'}}>
                                    <input type='text' className='login-answer-input' value={question} onChange={(e) => setQuestion(e.target.value)}></input>
                                </div>
                                <div className='forgot-answer'>忘記登入答案?</div>
                                {questionError && (
                                    <div className='question-error-div'>
                                        {questionError.split('按此').map((part, index) => (
                                            <React.Fragment key={index}>
                                                {part}
                                                {index < questionError.split('按此').length - 1 && (
                                                    <a href="#" className='question-error-link'>
                                                        按此
                                                    </a>
                                                )}
                                            </React.Fragment>
                                        ))}
                                    </div>
                                )}
                                <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                                    <div className='login-cancel-btn' onClick={handleQuestionCancel}>取消</div>
                                    <div className='login-ok-btn'  onClick={handleQuestion}>確定</div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                
                <div className='user-login-manage'>
                    <div className='manage-text'>
                        <div>總注數:</div>
                        <div>0</div>
                    </div>
                    <div className='manage-text'>
                        <div>總投注金額:</div>
                        <div>$0</div>
                    </div>
                    <div className='manage-button'>
                        <button style={{width:'90px'}}><img src='/image/deleteIcon.svg' alt='delete-icon'></img></button>
                        <button style={{width:'230px'}}>發送注項</button>
                    </div>
                </div>
            </div>
        ) : (
            <div className="user-login-container">
                <div className='user-login-box'>
                    <div className="user-login-basic-form" style={{display:'flex', justifyContent:'space-between'}}>
                        <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start'}}>
                            <img src='/image/user.svg' alt='user' width={28}/>
                            <div className='user-profile-balance'>
                                <div style={{fontSize:'12px'}}>投注戶口號碼</div>
                                <div style={{fontSize:'16px', fontWeight:'500'}}>15339692</div>
                                <div style={{display:'flex', alignItems:'center', lineHeight:'18px'}}>
                                    <div style={{fontSize:'12px'}}>結餘</div>
                                    <div onClick={toggleEye} style={{ cursor: 'pointer', marginLeft:'8px' }}>
                                        <img src={eye ? '/image/eye_on.svg' : '/image/eye_close.svg'} alt={eye ? "eye-on" : "eye-close"} width={20} />
                                    </div>
                                </div>
                                <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                                    <div style={{fontSize:'16px', fontWeight:'500', minWidth:'100px'}}>$ {balance}</div>
                                    <div style={{cursor:'pointer'}}><img src='/image/refresh.svg' alt='refresh'></img></div>
                                </div>
                            </div>
                        </div>
                        <div style={{display:'flex', alignItems:'flex-end'}}>
                            <div className='user-logout'>登出</div>
                        </div>
                    </div>
                    <div className="extra-links">
                        <div>
                            <a href="#">戶口紀錄</a> | 
                            <a href="#">轉賬服務</a>
                        </div>
                        <div className='extra-link-icons'>
                            <img src='/image/add_note_white.svg' alt='add_note_white' width={26}></img>
                            <img src='/image/setIcon.svg' alt='set-icon' width={26}></img>
                        </div>
                    </div>
                </div>
                
                <div className='user-loggedin-detail-container'>
                    <div style={{color:'#405a55', fontWeight:'500'}}>條款及細則</div>
                    <div className='user-loggedin-detail-container-div'>
                        <div className='loggedin-detail-row'>
                            <div className='loggedin-detail-row-num'>1.</div>
                            <div className='loggedin-detail-row-text'>使用規例</div>
                        </div>
                        <div className='loggedin-detail-row'>
                            <div className='loggedin-detail-row-num'>1.1</div>
                            <div className='loggedin-detail-row-text'>為由香港賽馬會（簡稱「馬會」）、香港馬會賽馬博彩有限公司（簡稱「賽馬博彩公司」）、香港馬會足球博彩有限公司（簡稱「足球博彩公司」）和/或香港馬會獎券有限公司（簡稱「獎券公司」）提供或容許的博彩及相關交易而使用服務，不論是否透過此軟件、在任何瀏覽器或任何電子通訊或關聯平台、方法、渠道或設備（簡稱「服務」），須受馬會的《博彩設施規例》、賽馬博彩公司的《賽馬博彩規例》、足球博彩公司的《足球博彩規例》及/或獎券公司的《獎券規例》（統稱「規例」）所約制。此等規例可從馬會網站（www.hkjc.com）下載，印本亦可在香港特別行政區（簡稱「香港」）跑馬地體育道一號馬會總部及任何投注地點索閱。</div>
                        </div>
                        <div className='loggedin-detail-row'>
                            <div className='loggedin-detail-row-num'>1.2</div>
                            <div className='loggedin-detail-row-text'>此服務僅供（a）成功登記成為本會之用戶（簡稱「用戶」）﹔（b）持有馬會投注戶口（簡稱「投注戶口」）﹔及（c）正式把戶口登入連接投注戶口之香港居民使用（簡稱「戶口持有人」）。該投注戶口及戶口登入只供戶口持有人作個人使用和/或享用。假如戶口持有人容許他人使用其戶口登入資料及/或投注戶口，戶口持有人便須承擔一切後果。</div>
                        </div>
                        <div className='loggedin-detail-row'>
                            <div className='loggedin-detail-row-num'>1.3</div>
                            <div className='loggedin-detail-row-text'>任何人士如透過此服務進行投注或交易，即視作已閱悉此等規例，且同意受其約束。</div>
                        </div>
                        <div className='loggedin-detail-row'>
                            <div className='loggedin-detail-row-num'>1.4</div>
                            <div className='loggedin-detail-row-text'>凡使用此服務的戶口持有人均須承諾，確保傳送、分發或其他經由此服務傳達的任何訊息，不含任何惡意軟件或可能影響馬會網站或此服務運作的元素，又或對馬會、其附屬公司或第三者的資料或系統造成損害、干擾或刪減。.</div>
                        </div>
                        <div className='loggedin-detail-row'>
                            <div className='loggedin-detail-row-num'>1.5</div>
                            <div className='loggedin-detail-row-text'>凡未滿十八歲的人士，均不得透過此服務進行投注或交易。</div>
                        </div>
                        <div className='loggedin-detail-row'>
                            <div className='loggedin-detail-row-num'>1.6</div>
                            <div className='loggedin-detail-row-text'>馬會及/或其附屬公司可隨時拒絕接受任何戶口持有人注項的權利，而毋須給予理由。</div>
                        </div>
                        <div className='loggedin-detail-row'>
                            <div className='loggedin-detail-row-num'>1.7</div>
                            <div className='loggedin-detail-row-text'>在下載任何軟件以使用服務，戶口持有人須保證不會，亦不會允許第三者, 對部分或整個軟件應用進行：<br></br><br></br>(a) 修改，增刪或製作衍生作品，或<br></br><br></br>(b) 複製，分發，提供，出售，再授權或以其它方式篡改。</div>
                        </div>
                        <div className='loggedin-detail-row'>
                            <div className='loggedin-detail-row-num'>1.8</div>
                            <div className='loggedin-detail-row-text'>每位戶口持有人承諾，當把抽取自此服務之內容的任何部份在互聯網上展示時（而所抽取之部份不會包含任何於軟件內呈現之印記（如商標、標誌、服務標記或任何其他印記）），在不損害規則1.2之一般適用性的情況下﹕<br></br><br></br>(a) 只會在其於社交媒體平台的個人戶口上，以馬會准許的形式和方式使用，而可看見使用結果的人應年滿18歲。為免存疑，以構成直播和/或即時展示的形式和方式分享抽取自此服務之內容中所包含的體育活動或其任何部份實屬明文禁止﹔<br></br><br></br>(b) 其會承擔所有與使用有關的風險，而馬會不會就數據不全、流失或損壞負責﹔<br></br><br></br>(c) 使用只為作其紀錄或任何不違反適用法律的目的用途，包括但不限於並不（1）推廣賭博﹔（2）吸引或邀請他人借錢以向馬會、香港馬會賽馬博彩有限公司、香港馬會足球博彩有限公司及/或香港馬會獎券有限公司下注﹔（3）跨大賽馬投注、足球博彩投注或獎券的勝出機會﹔（4）推廣賽馬投注、足球博彩投注或獎券為一項收入來源或解決本身的財務困難的可行途徑﹔（5）就贏取彩金的機會作誤導聲明﹔（6）把贏取彩金描述為最有可能出現的情況及/或暗示賭博的時間愈長或次數愈多，贏取彩金的機會便會愈大﹔（7）暗示賽馬投注、足球博彩投注或獎券是一項投資、就業以外的一項選擇及/或增加收入的適當方法﹔和<br></br><br></br>(d) 其使用不會以任何方式損害或破壞馬會及/或此服務的名聲、名譽名/或形象及/或令馬會及/或此服務的名聲、名譽及/或形象惹來爭議。</div>
                        </div>
                        <div className='loggedin-detail-row'>
                            <div className='loggedin-detail-row-num'>1.9</div>
                            <div className='loggedin-detail-row-text'>戶口持有人可在現稱為「賽馬筆記」的功能就香港馬會賽馬博彩有限公司提供的博彩賽事留下 個人筆記，當該功能可供使用時:
                                <br></br><br></br>(a) 為在服務中留下 （不論是否透過此軟件）及作為服務一部份獲馬會保留的筆記（下稱「筆記」）均屬戶口持有人所有。戶口持有人於使用有關服務並將內容上載為筆記時，即表示向馬會授予全球、免費、無條件、不受限制的永久非獨家使用許可（此使用許可包括容許馬會複製、展示、保留、傳送、重新格式、分析及/或透過數碼渠道分發）以於馬會自行、獲其授權者或與其合作之第三方為推廣馬會之賽馬及/或博彩業務的活動中使用上載的內容﹔

                                <br></br><br></br>(b) 縱有本規則（a）款關於筆記權屬之規定，使用服務的任何部份以留下及/或取閱筆記將仍為服務的一部份，條款及細則的其他部份將在作必要的變更後比照適用﹔

                                <br></br><br></br>(c) 戶口持有人於互聯網連線時使用服務，任何就筆記的修改將獲自動存取，亦唯有其時方能存取 ﹔馬會只會保留筆記的一個版本，而在任何情況下戶口持有人將不能再取閱筆記之前的版本。除上述規定外，馬會可在其全權決定下刪除任何筆記﹔

                                <br></br><br></br>(d) 系統於同一時間可為每位戶口持有人保留有限數量的個人筆記及其為香港現役馬匹或訪港參加級際賽之馬匹所撰寫的馬匹筆記。如筆記數量超出限制，戶口持有人必須先刪除任何已保留的筆記方可撰寫及存取新筆記。當馬匹因退役等緣故不再服役或離開香港（視乎情況而定），為其留存之筆記將遭自動刪除﹔

                                <br></br><br></br>(e) 戶口持有人可隨時刪除任何筆記及/或當中的任何內容。馬會將於賽馬筆記停止服務時或戶口持有人選擇取消其投注戶口時刪除所有筆記。筆記或當中的任何內容遭刪除後，戶口持有人將不再能從已刪除的筆記或內容中擷取資料，故戶口持有人應定期自行匯出筆記作備份之用﹔

                                <br></br><br></br>(f) 戶口持有人可匯出任何已保留的筆記，並將收到用於下載匯出之筆記的連結，獲匯出之筆記的檔案類型將由馬會指定，而前述連結將發送至戶口持有人於匯出筆記時指定的電郵地址，有效期將由馬會指定或戶口持有人於下次匯出筆記時為止，以較早者為準。戶口持有人有責任檢查並確保前述連結不會被電郵服務提供者歸類為垃圾郵件及/或載有上述連結之電郵不會因任何原因遭退回﹔

                                <br></br><br></br>(g) 戶口持有人應自行承擔留下及/或使用筆記的風險，留下、保存及/或其後取閱筆記過程中，若有任何未能取閱筆記、筆記不全、遺失或損壞，馬會概不負責﹔

                                <br></br><br></br>(h) 馬會可隨時更改筆記服務的使用介面及/或接入點，而無需事先通知﹔

                                <br></br><br></br>(i) 馬會同意任何戶口持有人留下筆記、保存筆記及/或取閱筆記作為服務任何一部份，該「同意」在任何情況下，皆不應被視為博彩提示、鼓勵或提議任何人下注亦不應被視為任何形式的建議及/或受到信賴﹔

                                <br></br><br></br>(j) 戶口持有人知悉馬會、賽馬博彩公司、足球博彩公司和/或獎券公司將不會為任何緣故審核或控制任何留下之筆記的任何內容，並同意馬會、賽馬博彩公司、足球博彩公司和/或獎券公司在任何情況下，皆不會因為本規（i）款之同意而被視為贊同或支持筆記內任何部份或就筆記內任何部份表達其想法或意見﹔及

                                <br></br><br></br>(k) 在不損害本規則（i）和（j）款之一般適用性的情況下，馬會可自行規定筆記的呈現方式。</div>
                            </div>
                        <div className='loggedin-detail-row'>
                            <div className='loggedin-detail-row-num'>1.10</div>
                            <div className='loggedin-detail-row-text'>戶口持有人確認及同意當使用服務時，包括但不限於賠率更新功能、瀏覽「上次出賽」錄像或把抽取自此服務之內容的任何部份使用時，相關網絡服務供應商有可能會因應數據傳輸量而收取一定費用及/或其他與戶口持有人協定之費用。</div>
                        </div>
                        <div className='loggedin-detail-row'>
                            <div className='loggedin-detail-row-num'>1.11</div>
                            <div className='loggedin-detail-row-text'>在不損害規則1.7和1.8的一般適用性之情況下，任何戶口持有人使用服務及/或軟件的任何部份時，未經馬會或相關權利擁有人書面同意，對服務及/或軟件之使用不得超出個人使用和享用之範圍。</div>
                        </div>
                        <div className='loggedin-detail-row'>
                            <div className='loggedin-detail-row-num'>2.</div>
                            <div className='loggedin-detail-row-text'>本地使用</div>
                        </div>
                        <div className='loggedin-detail-row'>
                            <div className='loggedin-detail-row-num'>2.1</div>
                            <div className='loggedin-detail-row-text'>此服務只限在香港使用。戶口持有人首要遵守只在香港境內使用此服務的條件，始會獲准享用此服務。用戶禁止在受限制地區內使用服務，尤其若在該等地區使用服務將被視作非法行為的。馬會及其子公司保留權利覆核客戶於申請開立投注戶口或其後所提供的聯絡地址及其他資料，及可要求提供其他資料文件。如戶口持有人未能提供有效證據證明其只在香港使用服務，馬會保留權利暫停或終止提供服務。在香港境外使用此服務所引致的任何後果，馬會及其附屬公司均毋須負責。不論戶口持有人或第三者是否在其知情、同意或授權下在本港或以外地方使用此服務，戶口持有人均須對使用此服務所引致的一切後果承擔全部責任。</div>
                        </div>
                        <div className='loggedin-detail-row'>
                            <div className='loggedin-detail-row-num'>2.2</div>
                            <div className='loggedin-detail-row-text'>所有透過此服務進行的投注及交易，均視為在香港境內進行，並受香港法律約制。</div>
                        </div>
                        <div className='loggedin-detail-row'>
                            <div className='loggedin-detail-row-num'>2.3</div>
                            <div className='loggedin-detail-row-text'>馬會概不歡迎自美國或其附屬領土地區、新加坡、英國、澳洲及其他受限制地區以互聯網、電話、其他電子或電線通訊系統方式進行的投注或交易。</div>
                        </div>
                        <div className='loggedin-detail-row'>
                            <div className='loggedin-detail-row-num'>3.</div>
                            <div className='loggedin-detail-row-text'>登入及保安</div>
                        </div>
                        <div className='loggedin-detail-row'>
                            <div className='loggedin-detail-row-num'>3.1</div>
                            <div className='loggedin-detail-row-text'>戶口持有人可如下使用此服務（包括透過此軟件）﹕

                                <br></br><br></br>(a) 在開立投注戶口後，戶口持有人應以保安設置（包括但不限於個人辨識編碼、保安編碼、密碼、登入問題及登入答案，而其等應由戶口持有人根據馬會不時修訂的界限和要求（包括但不限於密碼長度和組成方式方面的要求）而決定和設定）（統稱「保安設置」）﹔

                                <br></br><br></br>(b) 戶口持有人亦可根據規則（a）款所述的的界限和要求不時修訂其保安設置﹔和

                                <br></br><br></br>(c) 在成功啟動此服務後，戶口持有人可選擇以馬會接受的形式，直接以其個人生物辨識資料在軟件登入投注戶口或間接以其個人生物辨識資料為基礎在軟件登入投注戶口。為免存疑，馬會應有全權決定是否﹕

                                <br></br><br></br>(1) 根據馬會認為合適的要求、限制和約束，局限容許戶口持有人以其個人生物辨識資料或以其個人生物辨識資料為基礎登入（「生物辨識資料登入」）投注戶口的範圍，該等要求、限制和約束包括但不限於相關設備的型號和/或操作系統的版本、不能使用生物辨識資料登入的時間﹔

                                <br></br><br></br>(2) 接納相關核實機制和運算邏輯已預置在戶口持有人使用此服務時所利用的設備（「設備」）內的任何形式的生物辨識資料登入﹔和

                                <br></br><br></br>(3) 在當設備因任何方式已配有為使用者之相同或不同的個人生物辨識資料而設的多種核實機制和運算邏輯時，在不損害規則（2）項的一般適用性之情況下，按納當中那種核實機制和運算邏輯。

                                再者，本規則（c）款並無令任何保安設置失效和/或排除馬會接受以保安設置登入。</div>
                        </div>
                        <div className='loggedin-detail-row'>
                            <div className='loggedin-detail-row-num'>3.2</div>
                            <div className='loggedin-detail-row-text'>使用此服務的戶口持有人，須將有關其投注戶口資料及細節保密，包括（但不僅限於）戶口號碼，保安密碼及個人資料和生物辨識資料與其戶口登入之保密細節（如登入名稱、密碼、登入問題及登入答案）（統稱「機密資料」）。無論交易有否得到戶口持有人授權，所有使用正確機密資料而進行的交易，對戶口持有人而言，均具約束力。</div>
                        </div>
                        <div className='loggedin-detail-row'>
                            <div className='loggedin-detail-row-num'>3.3</div>
                            <div className='loggedin-detail-row-text'>當戶口持有人已為其投注戶口啟動生物辨識資料登入時﹕

                                <br></br><br></br>(a) 戶口持有人不應使用任何或會與他人的生物辨識資料一樣或十分相近的生物辨識資料（例如﹕若戶口持有人為多胞胎中的一員而馬會接納樣貌辨識，則戶口持有人應避免使用樣貌辨識）﹔

                                <br></br><br></br>(b) 戶口持有人應避免其用於生物辨識資料登入的生物辨識資料有突然或急速的轉變（例如﹕若馬會接納樣貌辨識而戶口持有人以此作為其投注戶口的生物辨識資料登入，則戶口持有人應避免整容）﹔

                                <br></br><br></br>(c) 馬會可為此服務和/或軟件的保安和維護緣故，從戶口持有人在其上使用生物辨識資料登入的設備收集使用資料﹔和

                                <br></br><br></br>(d) 如﹕

                                <br></br><br></br>(1) 戶口持有人更改其保安設置的任何部份﹔

                                <br></br><br></br>(2) 馬會合理相信戶口持有人在其上使用生物辨識資料登入的設備受到篡改或以其他方式受到損害﹔或

                                <br></br><br></br>(3) 馬會認為在確保此服務完整和安全時必要或便於確保此服務完整和安全時，包括但不限於因戶口持有人沒有使用生物辨識資料登入達180天時，

                                在戶口持有人的所有設備上暫停生物辨識資料登入功能，而戶口持有人則因此需重啟生物辨識資料登入功能。</div>
                        </div>
                        <div className='loggedin-detail-row'>
                            <div className='loggedin-detail-row-num'>3.4</div>
                            <div className='loggedin-detail-row-text'>在不損害規則3.1至3.3的一般適用性之情況下，戶口持有人須確保登入答案是屬私人、獨特及不被第三者知悉的。戶口持有人明白及同意，如其所選之登入答案被第三者知悉，有關投注戶口的保安程度將會受到損害。任何因第三者正確地提供有關戶口持有人的登入答案因而能使用戶口持有人的投注戶口所引起之損失，馬會及/或其附屬公司一概不負責。本會不建議戶口持有人於其他網頁、登入及/或戶口使用相同的登入問題及/登入答案。</div>
                        </div>
                        <div className='loggedin-detail-row'>
                            <div className='loggedin-detail-row-num'>3.5</div>
                            <div className='loggedin-detail-row-text'>戶口持有人若決定撤銷使用此服務的戶口登入，必須事先致函通知馬會。戶口持有人確認及同意，於馬會確認收到及接納上述撤銷通知函之前，所有透過該戶口登入所作出的指示及進行的交易，均視為對該戶口持有人具約束力的。</div>
                        </div>
                        <div className='loggedin-detail-row'>
                            <div className='loggedin-detail-row-num'>3.6</div>
                            <div className='loggedin-detail-row-text'>在不損害此規則3內任何其他部份的一般適用性之情況下，馬會可在戶口持有人連續沒有使用投注戶口（時期長短由馬會所定）時，強制要求更新投注戶口的保安設置和/或暫停生物辨識資料登入為投注戶口的登入方式（而戶口持有人則因此需重啟生物辨識資料登入功能）。</div>
                        </div>
                        <div className='loggedin-detail-row'>
                            <div className='loggedin-detail-row-num'>3.7</div>
                            <div className='loggedin-detail-row-text'>戶口持有人一經發現或懷疑（a）任何機密資料遭洩露或由未獲授權人士取得，或（b）任何交易在未經授權的情況下進行，須即時致電熱線通知馬會，並致函馬會顧客服務部確證此項通知。儘管如此，在馬會終止或接受終止有關戶口登入之前，所有透過有關投注戶口、戶口登入及／或項服務完成的交易，不論是否經戶口持有人授權，對戶口持有人而言，均具約束力。</div>
                        </div>
                        <div className='loggedin-detail-row'>
                            <div className='loggedin-detail-row-num'>3.8</div>
                            <div className='loggedin-detail-row-text'>戶口持有人須提防或會有第三方因意圖欺騙或其不誠實意圖（不論是否為著金錢上的得益亦不論該第三方能否即時得益）而嘗試以包括但不限於假扮馬會網頁之偽冒網站或應用程式等各種方式假扮為馬會和/或其附屬公司和/或聲稱為參與服務營運的其中一個服務營運者。戶口持有人於透過該有關服務提交任何個人資料（包括但不僅限於機密資料）之前，必須確保該有關服務確實由香港賽馬會或其附屬公司所提供。如有懷疑，戶口持有人應立即與馬會及／或其附屬公司聯絡，以核證該有關服務提供者的真偽。戶口持有人聯絡或向任何虛假或偽冒服務提供者提供任何資料所引致的一切後果，馬會及其附屬公司概不負責。</div>
                        </div>
                        <div className='loggedin-detail-row'>
                            <div className='loggedin-detail-row-num'>4.</div>
                            <div className='loggedin-detail-row-text'>戶口持有人的聲明和保證</div>
                        </div>
                        <div className='loggedin-detail-row'>
                            <div className='loggedin-detail-row-num'>4.1</div>
                            <div className='loggedin-detail-row-text'>儘管此條款及細則另有規定，如果戶口持有人使用服務任何部份時會以任何方式連同任何並非馬會擁有的材料或與任何並非馬會擁有的材料有關，戶口持有人向馬會聲明、保證及使其獲得保障：該些材料（a）並不屬於淫褻、褻瀆、侮辱或誹謗性質﹔（b）並沒有侵犯、誤用或濫用另一人士的姓名、圖像或私隱﹔以及（c）由戶口持有人擁有或戶口持有人已獲授權使用該些材料或使用該些材料不會侵犯任何第三方所有權（包括知識產權）。戶口持有人承諾不會利用此服務、軟件或其等之功能和內容，參與任何詐騙、不誠實、不道德或非法行為。</div>
                        </div>
                        <div className='loggedin-detail-row'>
                            <div className='loggedin-detail-row-num'></div>
                            <div className='loggedin-detail-row-text'></div>
                        </div>
                        <div className='loggedin-detail-row'>
                            <div className='loggedin-detail-row-num'>5.</div>
                            <div className='loggedin-detail-row-text'>責任</div>
                        </div>
                        <div className='loggedin-detail-row'>
                            <div className='loggedin-detail-row-num'>5.1</div>
                            <div className='loggedin-detail-row-text'>任何戶口持有人確認及接受﹕

                                <br></br><br></br>(a) 此服務（儘管或透過軟件提供）受馬會的集團總免責聲明所約束，並且不損害總免責聲明的一般適用性﹔

                                <br></br><br></br>(b) 此服務、軟件和其等之功能和內容由馬會擁有或馬會獲授權使用，旨於向其戶口持有人免費提供娛樂資訊，作個人享用﹔

                                <br></br><br></br>(c) 此服務、軟件和其等之功能和內容只在馬會認為合適時提供，而會並不保證將來可用（不論形式是否與目前一樣）﹔

                                <br></br><br></br>(d) 此服務、軟件和其等之功能和內容不得被詮釋為投注提示或鼓勵或建議任何人士投放賭注，且不應採用和/或依賴該些資料作為任何建議﹔

                                <br></br><br></br>(e) 透過互聯網傳送資料的安全性和穩定性不能完全獲得保障，因此，戶口持有人須接受承擔透過互聯網發送敏感或機密資料的風險（特別是未經加密的資料）﹔

                                <br></br><br></br>(f) 使用此服務和軟件可能出現服務中斷、受干擾、受黑客入侵、傳送故障或延誤等情況﹔

                                <br></br><br></br>(g) 如果軟件內容含有由非馬會本身發表的意見或觀點（包括但不限於馬匹評語﹑實力評分﹑狀態評分﹑最佳路程及預計跑法），該些意見或觀點並不代表馬會，馬會亦沒有同意該些意見或觀點﹔

                                <br></br><br></br>(h) 戶口持有人有全權決定是否進入和使用與軟件連接的第三方網站或應用程式，若進入和使用則須自行承擔風險並接受適用條款與細則的約束，而馬會在本軟件內允許出現或提供第三方網站或應用程式的連結，並不表示亦不應被視為支持、推薦、批准、保證或介紹任何第三方、其網站或應用程式或任何該等第三方在其網站或應用程式提供的服務/產品，或與該些第三方和網站/應用程式存有任何形式的合作。再者，戶口持有人接受，馬會若無另行明確說明或同意，則在戶口持有人與外部網站/應用程式的提供者/主持者達成的任何契約安排中，不論該契約安排的主題為何，馬會皆不會成為協議方﹔

                                <br></br><br></br>(i) 對於軟件的完整性、兼容性或可升版性，馬會不作任何保證﹔和

                                <br></br><br></br>(j) 馬會不會就提供此服務、軟件和其等之功能和內容作任何不侵權、保安、精確性、完整性、特定用途適用性、免受電腦病毒影響等情況的聲明，而戶口持有人須自行負責確保其設備內其他程式、資料和數據得到適當保障和設有備份，以及採取妥善和適當的防範措施，檢查電腦惡意軟件及備份其他程式、資料和數據。</div>
                        </div>
                        <div className='loggedin-detail-row'>
                            <div className='loggedin-detail-row-num'>5.2</div>
                            <div className='loggedin-detail-row-text'>戶口持有人皆同意馬會及其附屬公司對以下並不負責﹕

                                <br></br><br></br>(a) 此服務如不論何故引致戶口持有人之損失、損害、損傷或對戶口持有人利益之各式危害（無論是否與此服務上的任何他資料或此服務的任何服務有關），包括（但不僅限於）任何問題或技術上的不正常運作、任何對戶口持有人設備之損壞、任何在傳送、進行操作或通訊時出現失靈、延誤或干擾等情況﹔資料或指示遭盜取、歪曲或刪減﹔以及服務內容有任何錯誤或遺漏。

                                <br></br><br></br>(b) 任何拒絕或未能確認、接納或完成戶口持有人使用此服務所進行的交易。

                                <br></br><br></br>(c) 任何有關網絡服務供應商與戶口持有人就數據傳送收費所引起之爭議或事項。

                                <br></br><br></br>(d) 對於抽取自此服務之內容的任何部份的使用（不論使用時是否包含任何第三方的材料）。

                                <br></br><br></br>(e) 戶口持有人使用或依賴此服務、軟件和/或其等之功能和/或內容所引致的任何損失、費用、損害或傷害。

                                <br></br><br></br>(f) 戶口持有人因進入和使用與軟件連接的第三方網站和/或應用程式和/或該等網站或應用程式所提供的服務/產品所引致的任何損失、費用、損害或傷害，和/或戶口持有人與任何第三方之間的爭議（不論是否與任何合約有關）。

                                <br></br><br></br>(g) 當戶口持有人使用服務時，不管任何原因而造成之損失或損害。</div>
                        </div>
                        <div className='loggedin-detail-row'>
                            <div className='loggedin-detail-row-num'>5.3</div>
                            <div className='loggedin-detail-row-text'>使用此服務的戶口持有人對任何因其違反或未能履行此等使用條款及細則所引起對馬會、香港馬會賽馬博彩有限公司、香港馬會足球博彩有限公司及/或香港馬會獎券有限公司的一切索償、損失費用和賠償（包括所有法律費用）均須負責所有賠償責任。</div>
                        </div>
                        <div className='loggedin-detail-row'>
                            <div className='loggedin-detail-row-num'>6.</div>
                            <div className='loggedin-detail-row-text'>終止</div>
                        </div>
                        <div className='loggedin-detail-row'>
                            <div className='loggedin-detail-row-num'>6.1</div>
                            <div className='loggedin-detail-row-text'>馬會可隨時通知戶口持有人暫停或終止其戶口登入或/及投注戶口或撤銷向戶口持有人提供此服務，而毋須給予任何理由。</div>
                        </div>
                        <div className='loggedin-detail-row'>
                            <div className='loggedin-detail-row-num'>6.2</div>
                            <div className='loggedin-detail-row-text'>在不損害前文的一般適用性之情況下，馬會可（a）不時檢查投注戶口，並可在懷疑有任何不正常、洗黑錢或非法行為時暫停或終止有關戶口，為此目的，我須就馬會的要求，提供任何財富來源的資料和相關證明文件，以驗證我的財富來源，及（b）暫停或終止長期未被使用的投注戶口而不作事先通知，當中包括但不限於（1）尚有結餘而無進行任何交易達24個月或以上的投注戶口﹔及（2）沒有結餘而無進行任何交易達12個月或以上的投注戶口﹔或（c）在其相信或懷疑戶口持有人曾容許他人使用其投注戶口時把該投注戶口暫停或終止，縱然馬會有權依賴根據規則3而對所有透過投注戶口和/或戶口登入和/或服務完成的交易所產生的約束力。</div>
                        </div>
                        <div className='loggedin-detail-row'>
                            <div className='loggedin-detail-row-num'>7.</div>
                            <div className='loggedin-detail-row-text'>個人資料和私隱</div>
                        </div>
                        <div className='loggedin-detail-row'>
                            <div className='loggedin-detail-row-num'>7.1</div>
                            <div className='loggedin-detail-row-text'>各戶口持有人承諾在下載或使用此服務和此軟件前細閱和明暸馬會之資料私隱政策，並同意馬會根據資料私隱政策利用在戶口持有人使用此服務和此軟件時所收集的個人資料。</div>
                        </div>
                        <div className='loggedin-detail-row'>
                            <div className='loggedin-detail-row-num'>7.2</div>
                            <div className='loggedin-detail-row-text'>戶口持有人可於馬會各場外投注處或透過香港賽馬會網上客戶中心（cc.hkjc.com）更改有關設定。</div>
                        </div>
                        <div className='loggedin-detail-row'>
                            <div className='loggedin-detail-row-num'>8.</div>
                            <div className='loggedin-detail-row-text'>修訂</div>
                        </div>
                        <div className='loggedin-detail-row'>
                            <div className='loggedin-detail-row-num'>8.1</div>
                            <div className='loggedin-detail-row-text'>馬會得全權決定增補、刪除、修訂或更改此等使用條款及細則。</div>
                        </div>
                        <div className='loggedin-detail-row'>
                            <div className='loggedin-detail-row-num'>8.2</div>
                            <div className='loggedin-detail-row-text'>馬會網站登出有關此等增刪修改的內容及生效日期的通告，即視為已給予每一戶口持有人充分通知。</div>
                        </div>
                        <div className='loggedin-detail-row'>
                            <div className='loggedin-detail-row-num'>8.3</div>
                            <div className='loggedin-detail-row-text'>戶口持有人於馬會所公佈此等增刪修改生效日期當日或之後使用此服務，即視為毫無保留地接納該等增刪修改。</div>
                        </div>
                        <div className='loggedin-detail-row'>
                            <div className='loggedin-detail-row-num'>9.</div>
                            <div className='loggedin-detail-row-text'>違反此等使用條件</div>
                        </div>
                        <div className='loggedin-detail-row'>
                            <div className='loggedin-detail-row-num'>9.1</div>
                            <div className='loggedin-detail-row-text'>假如馬會因戶口持有人違反此等使用條款及細則而終止其使用此服務的權利，馬會亦可（但不是必須）取消其投注戶口或/及戶口登入。</div>
                        </div>
                        <div className='loggedin-detail-row'>
                            <div className='loggedin-detail-row-num'>10.</div>
                            <div className='loggedin-detail-row-text'>中英文版本</div>
                        </div>
                        <div className='loggedin-detail-row'>
                            <div className='loggedin-detail-row-num'>10.1</div>
                            <div className='loggedin-detail-row-text'>如條款及細則的中文譯本於英文原本有任何出入之處，一切條款及細則概以英文原本為準。</div>
                        </div>
                    </div>
                </div>
                <div className='loggedin-detail-btn-div'>
                    <div className='loggedin-detail-btn' onClick={agreeTerms}>進入主頁</div>
                </div>
            </div>
        )}
        {/* Logout Confirmation Modal */}
        {showModal && (
            <div className="modal-overlay">
                <div className="modal-content">
                    <div className="modal-content-title">fhddhkjc.com says</div>
                    <div>登出後，如有未傳送的注項將被删除。如你正在其他視窗開啟馬會網上服務，該等服務亦會同時被登出，如有需要請關閉該等視窗。</div>
                    <div className="modal-actions">
                        <button onClick={() => setShowModal(false)} className="cancel-btn">取消</button>
                        <button onClick={userLogout} className="confirm-btn">確定</button>
                    </div>
                </div>
            </div>
        )}
    </div>
  );
};

export default UserLogin;
