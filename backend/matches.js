const axios = require("axios");
let matchData = [];

const tournamentIcons = [
    { "key": "阿根廷甲組聯賽", "value": "https://consvc.hkjc.com/-/media/Sites/JCBW/TournIcon/flag_APL.svg?sc_lang=zh-HK" },
    { "key": "澳洲職業聯賽", "value": "https://consvc.hkjc.com/-/media/Sites/JCBW/TournIcon/flag_AD1.svg?sc_lang=zh-HK" },
    { "key": "女子澳洲職業聯賽", "value": "https://consvc.hkjc.com/-/media/Sites/JCBW/TournIcon/flag_AD1W.svg?sc_lang=zh-HK" },
    { "key": "比利時甲組聯賽", "value": "https://consvc.hkjc.com/-/media/Sites/JCBW/TournIcon/flag_BFL.svg?sc_lang=zh-HK" },
    { "key": "巴西甲組聯賽", "value": "https://consvc.hkjc.com/-/media/Sites/JCBW/TournIcon/flag_BD1.svg?sc_lang=zh-HK" },
    { "key": "巴西聖保羅省聯賽", "value": "https://consvc.hkjc.com/-/media/Sites/JCBW/TournIcon/flag_BPC.svg?sc_lang=zh-HK" },
    { "key": "智利甲組聯賽", "value": "https://consvc.hkjc.com/-/media/Sites/JCBW/TournIcon/flag_CD1.svg?sc_lang=zh-HK" },
    { "key": "荷蘭甲組聯賽", "value": "https://consvc.hkjc.com/-/media/Sites/JCBW/TournIcon/flag_DFL.svg?sc_lang=zh-HK" },
    { "key": "荷蘭乙組聯賽", "value": "https://consvc.hkjc.com/-/media/Sites/JCBW/TournIcon/flag_DF2.svg?sc_lang=zh-HK" },
    { "key": "女子荷蘭甲組聯賽", "value": "https://consvc.hkjc.com/-/media/Sites/JCBW/TournIcon/flag_DFLW.svg?sc_lang=zh-HK" },
    { "key": "英格蘭超級聯賽", "value": "https://consvc.hkjc.com/-/media/Sites/JCBW/TournIcon/flag_EPL1.svg?sc_lang=zh-HK" },
    { "key": "英格蘭冠軍聯賽", "value": "https://consvc.hkjc.com/-/media/Sites/JCBW/TournIcon/flag_ED1.svg?sc_lang=zh-HK" },
    { "key": "英格蘭甲組聯賽", "value": "https://consvc.hkjc.com/-/media/Sites/JCBW/TournIcon/flag_ED2.svg?sc_lang=zh-HK" },
    { "key": "英格蘭乙組聯賽", "value": "https://consvc.hkjc.com/-/media/Sites/JCBW/TournIcon/flag_ED3.svg?sc_lang=zh-HK" },
    { "key": "女子英格蘭超級聯賽", "value": "https://consvc.hkjc.com/-/media/Sites/JCBW/TournIcon/Flag_EPLW.svg?sc_lang=zh-HK" },
    { "key": "芬蘭超級聯賽", "value": "https://consvc.hkjc.com/-/media/Sites/JCBW/TournIcon/flag_FVL.svg?sc_lang=zh-HK" },
    { "key": "法國甲組聯賽", "value": "https://consvc.hkjc.com/-/media/Sites/JCBW/TournIcon/flag_FFL.svg?sc_lang=zh-HK" },
    { "key": "法國乙組聯賽", "value": "https://consvc.hkjc.com/-/media/Sites/JCBW/TournIcon/flag_FF2.svg?sc_lang=zh-HK" },
    { "key": "女子法國甲組聯賽", "value": "https://consvc.hkjc.com/-/media/Sites/JCBW/TournIcon/flag_FFLW.svg?sc_lang=zh-HK" },
    { "key": "德國甲組聯賽", "value": "https://consvc.hkjc.com/-/media/Sites/JCBW/TournIcon/flag_GSL.svg?sc_lang=zh-HK" },
    { "key": "德國乙組聯賽", "value": "https://consvc.hkjc.com/-/media/Sites/JCBW/TournIcon/flag_GD2.svg?sc_lang=zh-HK" },
    { "key": "女子德國甲組聯賽", "value": "https://consvc.hkjc.com/-/media/Sites/JCBW/TournIcon/flag_GSLW.svg?sc_lang=zh-HK" },
    { "key": "意大利甲組聯賽", "value": "https://consvc.hkjc.com/-/media/Sites/JCBW/TournIcon/flag_ISA.svg?sc_lang=zh-HK" },
    { "key": "女子意大利甲組聯賽", "value": "https://consvc.hkjc.com/-/media/Sites/JCBW/TournIcon/flag_ISAW.svg?sc_lang=zh-HK" },
    { "key": "日本職業聯賽", "value": "https://consvc.hkjc.com/-/media/Sites/JCBW/TournIcon/flag_JD1.svg?sc_lang=zh-HK" },
    { "key": "日本乙組聯賽", "value": "https://consvc.hkjc.com/-/media/Sites/JCBW/TournIcon/flag_JD2.svg?sc_lang=zh-HK" },
    { "key": "女子日本職業聯賽", "value": "https://consvc.hkjc.com/-/media/Sites/JCBW/TournIcon/flag_JD1W.svg?sc_lang=zh-HK" },
    { "key": "南韓職業聯賽", "value": "https://consvc.hkjc.com/-/media/Sites/JCBW/TournIcon/flag_KD1.svg?sc_lang=zh-HK" },
    { "key": "女子南韓職業聯賽", "value": "https://consvc.hkjc.com/-/media/Sites/JCBW/TournIcon/Flag_KD1W.svg?sc_lang=zh-HK" },
    { "key": "墨西哥超級聯賽", "value": "https://consvc.hkjc.com/-/media/Sites/JCBW/TournIcon/flag_MXL.svg?sc_lang=zh-HK" },
    { "key": "墨西哥甲組聯賽", "value": "https://consvc.hkjc.com/-/media/Sites/JCBW/TournIcon/flag_MD1.svg?sc_lang=zh-HK" },
    { "key": "女子墨西哥超級聯賽", "value": "https://consvc.hkjc.com/-/media/Sites/JCBW/TournIcon/flag_MXLW.svg?sc_lang=zh-HK" },
    { "key": "挪威超級聯賽", "value": "https://consvc.hkjc.com/-/media/Sites/JCBW/TournIcon/flag_NTL.svg?sc_lang=zh-HK" },
    { "key": "女子挪威超級聯賽", "value": "https://consvc.hkjc.com/-/media/Sites/JCBW/TournIcon/flag_NTLW.svg?sc_lang=zh-HK" },
    { "key": "葡萄牙超級聯賽", "value": "https://consvc.hkjc.com/-/media/Sites/JCBW/TournIcon/flag_PFL.svg?sc_lang=zh-HK" },
    { "key": "卡塔爾超級聯賽", "value": "https://consvc.hkjc.com/-/media/Sites/JCBW/TournIcon/flag_QSL.svg?sc_lang=zh-HK" },
    { "key": "俄羅斯超級聯賽", "value": "https://consvc.hkjc.com/-/media/Sites/JCBW/TournIcon/flag_RPL.svg?sc_lang=zh-HK" },
    { "key": "沙特職業聯賽", "value": "https://consvc.hkjc.com/-/media/Sites/JCBW/TournIcon/flag_SDL.svg?sc_lang=zh-HK" },
    { "key": "蘇格蘭超級聯賽", "value": "https://consvc.hkjc.com/-/media/Sites/JCBW/TournIcon/flag_SPL.svg?sc_lang=zh-HK" },
    { "key": "女子蘇格蘭超級聯賽", "value": "https://consvc.hkjc.com/-/media/Sites/JCBW/TournIcon/flag_SPLW.svg?sc_lang=zh-HK" },
    { "key": "西班牙甲組聯賽", "value": "https://consvc.hkjc.com/-/media/Sites/JCBW/TournIcon/flag_SFL.svg?sc_lang=zh-HK" },
    { "key": "西班牙乙組聯賽", "value": "https://consvc.hkjc.com/-/media/Sites/JCBW/TournIcon/flag_SF2.svg?sc_lang=zh-HK" },
    { "key": "女子西班牙甲組聯賽", "value": "https://consvc.hkjc.com/-/media/Sites/JCBW/TournIcon/Flag_SFLW.svg?sc_lang=zh-HK" },
    { "key": "瑞典超級聯賽", "value": "https://consvc.hkjc.com/-/media/Sites/JCBW/TournIcon/flag_SAL.svg?sc_lang=zh-HK" },
    { "key": "女子瑞典超級聯賽", "value": "https://consvc.hkjc.com/-/media/Sites/JCBW/TournIcon/flag_SALW.svg?sc_lang=zh-HK" },
    { "key": "美國職業聯賽", "value": "https://consvc.hkjc.com/-/media/Sites/JCBW/TournIcon/flag_MLS.svg?sc_lang=zh-HK" },
    { "key": "女子美國職業聯賽", "value": "https://consvc.hkjc.com/-/media/Sites/JCBW/TournIcon/flag_MLSW.svg?sc_lang=zh-HK" },
    { "key": "阿根廷盃", "value": "https://consvc.hkjc.com/-/media/Sites/JCBW/TournIcon/flag_AGC.svg?sc_lang=zh-HK" },
    { "key": "阿根廷超級盃", "value": "https://consvc.hkjc.com/-/media/Sites/JCBW/TournIcon/flag_AUC.svg?sc_lang=zh-HK" },
    { "key": "澳洲足總盃", "value": "https://consvc.hkjc.com/-/media/Sites/JCBW/TournIcon/flag_AFA.svg?sc_lang=zh-HK" },
    { "key": "比利時盃", "value": "https://consvc.hkjc.com/-/media/Sites/JCBW/TournIcon/flag_BFC.svg?sc_lang=zh-HK" },
    { "key": "比利時超級盃", "value": "https://consvc.hkjc.com/-/media/Sites/JCBW/TournIcon/flag_BSC.svg?sc_lang=zh-HK" },
    { "key": "巴西盃", "value": "https://consvc.hkjc.com/-/media/Sites/JCBW/TournIcon/flag_BDC.svg?sc_lang=zh-HK" },
    { "key": "智利盃", "value": "https://consvc.hkjc.com/-/media/Sites/JCBW/TournIcon/flag_CHC.svg?sc_lang=zh-HK" },
    { "key": "智利超級盃", "value": "https://consvc.hkjc.com/-/media/Sites/JCBW/TournIcon/flag_CSC.svg?sc_lang=zh-HK" },
    { "key": "荷蘭盃", "value": "https://consvc.hkjc.com/-/media/Sites/JCBW/TournIcon/flag_DAC.svg?sc_lang=zh-HK" },
    { "key": "荷蘭超級盃", "value": "https://consvc.hkjc.com/-/media/Sites/JCBW/TournIcon/flag_DSC.svg?sc_lang=zh-HK" },
    { "key": "英格蘭聯賽盃", "value": "https://consvc.hkjc.com/-/media/Sites/JCBW/TournIcon/flag_ELC.svg?sc_lang=zh-HK" },
    { "key": "英格蘭聯賽錦標", "value": "https://consvc.hkjc.com/-/media/Sites/JCBW/TournIcon/flag_ELT.svg?sc_lang=zh-HK" },
    { "key": "英格蘭社區盾", "value": "https://consvc.hkjc.com/-/media/Sites/JCBW/TournIcon/flag_ESH.svg?sc_lang=zh-HK" },
    { "key": "英格蘭足總盃", "value": "https://consvc.hkjc.com/-/media/Sites/JCBW/TournIcon/flag_EFA.svg?sc_lang=zh-HK" },
    { "key": "女子英格蘭聯賽盃", "value": "https://consvc.hkjc.com/-/media/Sites/JCBW/TournIcon/flag_ELCW.svg?sc_lang=zh-HK" },
    { "key": "女子英格蘭足總盃", "value": "https://consvc.hkjc.com/-/media/Sites/JCBW/TournIcon/flag_EFAW.svg?sc_lang=zh-HK" },
    { "key": "法國冠軍盃", "value": "https://consvc.hkjc.com/-/media/Sites/JCBW/TournIcon/flag_FCT.svg?sc_lang=zh-HK" },
    { "key": "法國足總盃", "value": "https://consvc.hkjc.com/-/media/Sites/JCBW/TournIcon/flag_FFA.svg?sc_lang=zh-HK" },
    { "key": "女子法國盃", "value": "https://consvc.hkjc.com/-/media/Sites/JCBW/TournIcon/flag_FFAW.svg?sc_lang=zh-HK" },
    { "key": "德國盃", "value": "https://consvc.hkjc.com/-/media/Sites/JCBW/TournIcon/flag_GSC.svg?sc_lang=zh-HK" },
    { "key": "德國超級盃", "value": "https://consvc.hkjc.com/-/media/Sites/JCBW/TournIcon/flag_GSPC.svg?sc_lang=zh-HK" },
    { "key": "女子德國盃", "value": "https://consvc.hkjc.com/-/media/Sites/JCBW/TournIcon/flag_GSCW.svg?sc_lang=zh-HK" },
    { "key": "意大利盃", "value": "https://consvc.hkjc.com/-/media/Sites/JCBW/TournIcon/flag_IFC.svg?sc_lang=zh-HK" },
    { "key": "意大利超級盃", "value": "https://consvc.hkjc.com/-/media/Sites/JCBW/TournIcon/flag_ISC.svg?sc_lang=zh-HK" },
    { "key": "女子意大利盃", "value": "https://consvc.hkjc.com/-/media/Sites/JCBW/TournIcon/Flag_IFCW.svg?sc_lang=zh-HK" },
    { "key": "女子意大利超級盃", "value": "https://consvc.hkjc.com/-/media/Sites/JCBW/TournIcon/flag_ISCW.svg?sc_lang=zh-HK" },
    { "key": "日本天皇盃", "value": "https://consvc.hkjc.com/-/media/Sites/JCBW/TournIcon/flag_JEC.svg?sc_lang=zh-HK" },
    { "key": "日本聯賽盃", "value": "https://consvc.hkjc.com/-/media/Sites/JCBW/TournIcon/flag_JLC.svg?sc_lang=zh-HK" },
    { "key": "日本超級盃", "value": "https://consvc.hkjc.com/-/media/Sites/JCBW/TournIcon/flag_JSC.svg?sc_lang=zh-HK" },
    { "key": "日本皇后盃", "value": "https://consvc.hkjc.com/-/media/Sites/JCBW/TournIcon/flag_JECW.svg?sc_lang=zh-HK" },
    { "key": "女子日本聯賽盃", "value": "https://consvc.hkjc.com/-/media/Sites/JCBW/TournIcon/flag_JLCW.svg?sc_lang=zh-HK" },
    { "key": "南韓足總盃", "value": "https://consvc.hkjc.com/-/media/Sites/JCBW/TournIcon/flag_KFC.svg?sc_lang=zh-HK" },
    { "key": "墨西哥冠軍盃", "value": "https://consvc.hkjc.com/-/media/Sites/JCBW/TournIcon/flag_MCC.svg?sc_lang=zh-HK" },
    { "key": "墨西哥盃", "value": "https://consvc.hkjc.com/-/media/Sites/JCBW/TournIcon/flag_MXC.svg?sc_lang=zh-HK" },
    { "key": "墨西哥超級盃", "value": "https://consvc.hkjc.com/-/media/Sites/JCBW/TournIcon/flag_MSC.svg?sc_lang=zh-HK" },
    { "key": "挪威盃", "value": "https://consvc.hkjc.com/-/media/Sites/JCBW/TournIcon/flag_NWC.svg?sc_lang=zh-HK" },
    { "key": "挪威超級盃", "value": "https://consvc.hkjc.com/-/media/Sites/JCBW/TournIcon/flag_NSC.svg?sc_lang=zh-HK" },
    { "key": "女子挪威盃", "value": "https://consvc.hkjc.com/-/media/Sites/JCBW/TournIcon/flag_NWCW.svg?sc_lang=zh-HK" },
    { "key": "葡萄牙盃", "value": "https://consvc.hkjc.com/-/media/Sites/JCBW/TournIcon/flag_PFC.svg?sc_lang=zh-HK" },
    { "key": "葡萄牙聯賽盃", "value": "https://consvc.hkjc.com/-/media/Sites/JCBW/TournIcon/flag_PLC.svg?sc_lang=zh-HK" },
    { "key": "葡萄牙超級盃", "value": "https://consvc.hkjc.com/-/media/Sites/JCBW/TournIcon/flag_PSC.svg?sc_lang=zh-HK" },
    { "key": "卡塔爾星盃", "value": "https://consvc.hkjc.com/-/media/Sites/JCBW/TournIcon/flag_QSC.svg?sc_lang=zh-HK" },
    { "key": "俄羅斯盃", "value": "https://consvc.hkjc.com/-/media/Sites/JCBW/TournIcon/flag_RFC.svg?sc_lang=zh-HK" },
    { "key": "俄羅斯超級盃", "value": "https://consvc.hkjc.com/-/media/Sites/JCBW/TournIcon/flag_RSC.svg?sc_lang=zh-HK" },
    { "key": "沙特國王盃", "value": "https://consvc.hkjc.com/-/media/Sites/JCBW/TournIcon/flag_SKC.svg?sc_lang=zh-HK" },
    { "key": "蘇格蘭足總盃", "value": "https://consvc.hkjc.com/-/media/Sites/JCBW/TournIcon/flag_SFA.svg?sc_lang=zh-HK" },
    { "key": "蘇格蘭聯賽盃", "value": "https://consvc.hkjc.com/-/media/Sites/JCBW/TournIcon/flag_SLC.svg?sc_lang=zh-HK" },
    { "key": "女子蘇格蘭聯賽盃", "value": "https://consvc.hkjc.com/-/media/Sites/JCBW/TournIcon/flag_SLCW.svg?sc_lang=zh-HK" },
    { "key": "西班牙盃", "value": "https://consvc.hkjc.com/-/media/Sites/JCBW/TournIcon/flag_SFC.svg?sc_lang=zh-HK" },
    { "key": "西班牙超級盃", "value": "https://consvc.hkjc.com/-/media/Sites/JCBW/TournIcon/flag_SSC.svg?sc_lang=zh-HK" },
    { "key": "女子西班牙盃", "value": "https://consvc.hkjc.com/-/media/Sites/JCBW/TournIcon/flag_SFCW.svg?sc_lang=zh-HK" },
    { "key": "女子西班牙超級盃", "value": "https://consvc.hkjc.com/-/media/Sites/JCBW/TournIcon/flag_SSCW.svg?sc_lang=zh-HK" },
    { "key": "瑞典盃", "value": "https://consvc.hkjc.com/-/media/Sites/JCBW/TournIcon/flag_SWC.svg?sc_lang=zh-HK" },
    { "key": "美職聯賽盃", "value": "https://consvc.hkjc.com/-/media/Sites/JCBW/TournIcon/flag_MLC.svg?sc_lang=zh-HK" },
    { "key": "亞冠精英盃", "value": "https://consvc.hkjc.com/-/media/Sites/JCBW/TournIcon/flag_ACL.svg?sc_lang=zh-HK" },
    { "key": "亞冠盃2", "value": "https://consvc.hkjc.com/-/media/Sites/JCBW/TournIcon/flag_AC2.svg?sc_lang=zh-HK" },
    { "key": "中北美洲冠軍盃", "value": "https://consvc.hkjc.com/-/media/Sites/JCBW/TournIcon/flag_CNC.svg?sc_lang=zh-HK" },
    { "key": "世界冠軍球會盃", "value": "https://consvc.hkjc.com/-/media/Sites/JCBW/TournIcon/flag_CWP.svg?sc_lang=zh-HK" },
    { "key": "國冠盃", "value": "https://consvc.hkjc.com/-/media/Sites/JCBW/TournIcon/flag_ICC.svg?sc_lang=zh-HK" },
    { "key": "南美自由盃", "value": "https://consvc.hkjc.com/-/media/Sites/JCBW/TournIcon/flag_LBC.svg?sc_lang=zh-HK" },
    { "key": "南美球會盃", "value": "https://consvc.hkjc.com/-/media/Sites/JCBW/TournIcon/flag_SAC.svg?sc_lang=zh-HK" },
    { "key": "南美超級盃", "value": "https://consvc.hkjc.com/-/media/Sites/JCBW/TournIcon/flag_SAS.svg?sc_lang=zh-HK" },
    { "key": "歐洲聯賽冠軍盃", "value": "https://consvc.hkjc.com/-/media/Sites/JCBW/TournIcon/flag_UCL.svg?sc_lang=zh-HK" },
    { "key": "歐霸盃", "value": "https://consvc.hkjc.com/-/media/Sites/JCBW/TournIcon/flag_UEC.svg?sc_lang=zh-HK" },
    { "key": "歐洲協會聯賽", "value": "https://consvc.hkjc.com/-/media/Sites/JCBW/TournIcon/flag_UEF.svg?sc_lang=zh-HK" },
    { "key": "歐洲超級盃", "value": "https://consvc.hkjc.com/-/media/Sites/JCBW/TournIcon/flag_USC.svg?sc_lang=zh-HK" },
    { "key": "女子歐洲聯賽冠軍盃", "value": "https://consvc.hkjc.com/-/media/Sites/JCBW/TournIcon/flag_UCLW.svg?sc_lang=zh-HK" },
    { "key": "亞洲盃", "value": "https://consvc.hkjc.com/-/media/Sites/JCBW/TournIcon/flag_ASC.svg?sc_lang=zh-HK" },
    { "key": "亞洲盃外圍賽", "value": "https://consvc.hkjc.com/-/media/Sites/JCBW/TournIcon/flag_ASQ.svg?sc_lang=zh-HK" },
    { "key": "男亞足", "value": "https://consvc.hkjc.com/-/media/Sites/JCBW/TournIcon/flag_AMF.svg?sc_lang=zh-HK" },
    { "key": "女亞足", "value": "https://consvc.hkjc.com/-/media/Sites/JCBW/TournIcon/flag_AWF.svg?sc_lang=zh-HK" },
    { "key": "東亞錦標賽", "value": "https://consvc.hkjc.com/-/media/Sites/JCBW/TournIcon/flag_EAC.svg?sc_lang=zh-HK" },
    { "key": "女子東亞錦標賽", "value": "https://consvc.hkjc.com/-/media/Sites/JCBW/TournIcon/flag_WEA.svg?sc_lang=zh-HK" },
    { "key": "東南亞錦標賽", "value": "https://consvc.hkjc.com/-/media/Sites/JCBW/TournIcon/flag_SEC.svg?sc_lang=zh-HK" },
    { "key": "U22 亞洲盃", "value": "https://consvc.hkjc.com/-/media/Sites/JCBW/TournIcon/flag_A22.svg?sc_lang=zh-HK" },
    { "key": "U23 亞洲盃", "value": "https://consvc.hkjc.com/-/media/Sites/JCBW/TournIcon/flag_A23.svg?sc_lang=zh-HK" },
    { "key": "美洲國家盃", "value": "https://consvc.hkjc.com/-/media/Sites/JCBW/TournIcon/flag_COA.svg?sc_lang=zh-HK" },
    { "key": "美洲金盃", "value": "https://consvc.hkjc.com/-/media/Sites/JCBW/TournIcon/flag_CGC.svg?sc_lang=zh-HK" },
    { "key": "非洲國家盃", "value": "https://consvc.hkjc.com/-/media/Sites/JCBW/TournIcon/flag_ANC.svg?sc_lang=zh-HK" },
    { "key": "非洲國家盃外圍賽", "value": "https://consvc.hkjc.com/-/media/Sites/JCBW/TournIcon/flag_ANQ.svg?sc_lang=zh-HK" },
    { "key": "歐洲國家盃", "value": "https://consvc.hkjc.com/-/media/Sites/JCBW/TournIcon/flag_EUC.svg?sc_lang=zh-HK" },
    { "key": "歐洲國家盃外圍賽", "value": "https://consvc.hkjc.com/-/media/Sites/JCBW/TournIcon/flag_EUQ.svg?sc_lang=zh-HK" },
    { "key": "歐洲國家聯賽", "value": "https://consvc.hkjc.com/-/media/Sites/JCBW/TournIcon/flag_ENL.svg?sc_lang=zh-HK" },
    { "key": "女子歐洲國家盃", "value": "https://consvc.hkjc.com/-/media/Sites/JCBW/TournIcon/flag_WEU.svg?sc_lang=zh-HK" },
    { "key": "U21歐洲國家盃", "value": "https://consvc.hkjc.com/-/media/Sites/JCBW/TournIcon/flag_E21.svg?sc_lang=zh-HK" },
    { "key": "U21歐國外", "value": "https://consvc.hkjc.com/-/media/Sites/JCBW/TournIcon/flag_E2Q.svg?sc_lang=zh-HK" },
    { "key": "國際賽", "value": "https://consvc.hkjc.com/-/media/Sites/JCBW/TournIcon/flag_INT.svg?sc_lang=zh-HK" },
    { "key": "男奧足", "value": "https://consvc.hkjc.com/-/media/Sites/JCBW/TournIcon/flag_OLY.svg?sc_lang=zh-HK" },
    { "key": "女奧足", "value": "https://consvc.hkjc.com/-/media/Sites/JCBW/TournIcon/flag_OLW.svg?sc_lang=zh-HK" },
    { "key": "洲際國家盃", "value": "https://consvc.hkjc.com/-/media/Sites/JCBW/TournIcon/flag_CFC.svg?sc_lang=zh-HK" },
    { "key": "世盃", "value": "https://consvc.hkjc.com/-/media/Sites/JCBW/TournIcon/flag_WC.svg?sc_lang=zh-HK" },
    { "key": "世盃外", "value": "https://consvc.hkjc.com/-/media/Sites/JCBW/TournIcon/flag_WCQ.svg?sc_lang=zh-HK" },
    { "key": "女子世盃", "value": "https://consvc.hkjc.com/-/media/Sites/JCBW/TournIcon/flag_WWC.svg?sc_lang=zh-HK" },
    { "key": "世青盃", "value": "https://consvc.hkjc.com/-/media/Sites/JCBW/TournIcon/flag_WYC.svg?sc_lang=zh-HK" },
    { "key": "女子世青盃", "value": "https://consvc.hkjc.com/-/media/Sites/JCBW/TournIcon/flag_WU20.svg?sc_lang=zh-HK" },
]
  

// Function to send a POST request
async function HKData() {
    const url = "https://info.cld.hkjc.com/graphql/base/";
    const data = {
        "query":"\n      query matchList($startIndex: Int, $endIndex: Int,$startDate: String, $endDate: String, $matchIds: [String], $tournIds: [String], $fbOddsTypes: [FBOddsType]!, $fbOddsTypesM: [FBOddsType]!, $inplayOnly: Boolean, $featuredMatchesOnly: Boolean, $frontEndIds: [String], $earlySettlementOnly: Boolean, $showAllMatch: Boolean) {\n        matches(startIndex: $startIndex,endIndex: $endIndex, startDate: $startDate, endDate: $endDate, matchIds: $matchIds, tournIds: $tournIds, fbOddsTypes: $fbOddsTypesM, inplayOnly: $inplayOnly, featuredMatchesOnly: $featuredMatchesOnly, frontEndIds: $frontEndIds, earlySettlementOnly: $earlySettlementOnly, showAllMatch: $showAllMatch) {\n          id\n          frontEndId\n          matchDate\n          kickOffTime\n          status\n          updateAt\n          sequence\n          esIndicatorEnabled\n          homeTeam {\n            id\n            name_en\n            name_ch\n          }\n          awayTeam {\n            id\n            name_en\n            name_ch\n          }\n          tournament {\n            id\n            frontEndId\n            nameProfileId\n            isInteractiveServiceAvailable\n            code\n            name_en\n            name_ch\n          }\n          isInteractiveServiceAvailable\n          inplayDelay\n          venue {\n            code\n            name_en\n            name_ch\n          }\n          tvChannels {\n            code\n            name_en\n            name_ch\n          }\n          liveEvents {\n            id\n            code\n          }\n          featureStartTime\n          featureMatchSequence\n          poolInfo {\n            normalPools\n            inplayPools\n            sellingPools\n            ntsInfo\n            entInfo\n            definedPools\n          }\n          runningResult {\n            homeScore\n            awayScore\n            corner\n            homeCorner\n            awayCorner\n          }\n          runningResultExtra {\n            homeScore\n            awayScore\n            corner\n            homeCorner\n            awayCorner\n          }\n          adminOperation {\n            remark {\n              typ\n            }\n          }\n          foPools(fbOddsTypes: $fbOddsTypes) {\n            id\n            status\n            oddsType\n            instNo\n            inplay\n            name_ch\n            name_en\n            updateAt\n            expectedSuspendDateTime\n            lines {\n              lineId\n              status\n              condition\n              main\n              combinations {\n                combId\n                str\n                status\n                offerEarlySettlement\n                currentOdds\n                selections {\n                  selId\n                  str\n                  name_ch\n                  name_en\n                }\n              }\n            }\n          }\n        }\n      }\n      ",
        "variables":{
            "fbOddsTypes":[
                "HAD",
                "EHA"
            ],
            "fbOddsTypesM":[
                "HAD",
                "EHA"
            ],
            "featuredMatchesOnly":false,
            "startDate":null,
            "endDate":null,
            "tournIds":null,
            "matchIds":null,
            "tournId":null,
            "tournProfileId":null,
            "subType":null,
            "startIndex":1,
            "endIndex":500,
            "frontEndIds":null,
            "earlySettlementOnly":false,
            "showAllMatch":false,
            "tday":null,
            "tIdList":null
        }
    };

  try {
    const response = await axios.post(url, data);
    const matches = response.data.data.matches;
    // console.log(JSON.stringify(matches[0], null, 2))
    matchData = matches.map(match => {
        const tournament = match.tournament?.name_ch;
        const tournamentImage = tournamentIcons.find(icon => icon.key === tournament)?.value || '';
        const combinations = match.foPools[0]?.lines[0]?.combinations;
        let homeOdds = null, awayOdds = null, drawOdds = null;
        if(combinations) {
          combinations.forEach((combination) => {
            if(combination.str === "H") {homeOdds = combination.currentOdds}
            else if (combination.str === "A") {awayOdds = combination.currentOdds}
            else if (combination.str === "D") {drawOdds = combination.currentOdds}
          })
        }
       
        return {
          time: match.kickOffTime,
          id: match.frontEndId,
          tournament: tournamentImage,
          homeName: match.homeTeam.name_ch,
          awayName: match.awayTeam.name_ch,
          tvChannel: match.tvChannels[0]?.code,
          inPlay: match.foPools[0]?.inplay,
          homeScore: match.runningResult?.homeScore,
          awayScore: match.runningResult?.awayScore,
          corner: match.runningResult?.corner,
          homeCorner: match.runningResult?.homeCorner,
          awayCorner: match.runningResult?.awayCorner,
          poolStatus: match.foPools[0]?.status,
          status: match.status,
          homeOdd: homeOdds,
          awayOdd: awayOdds,
          drawOdd: drawOdds,
        };
    });
    return matchData;
  } catch (error) {
    console.error("Error occurred:", error.message); // Handle errors
  }
}
HKData();
module.exports = HKData ;
