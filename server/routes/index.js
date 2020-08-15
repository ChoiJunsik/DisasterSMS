const express = require('express');
const axios = require('axios');
const syncDate = require('../containers/SyncDate');
const router = express.Router();

const locationTable = {
    'seoul': '서울',
    'gygg': '경기',
    'incheon': '인천',
    'gangwon': '강원',
    'chungnam': '충청남도',
    'chungbuk': '충청북도',
    'daejeon': '대전',
    'jeonbuk': '전라북도',
    'jeonnam': '전라남도',
    'gwangju': '광주',
    'jeju': '제주',
    'gyeongbuk': '경상북도',
    'gyeongnam': '경상남도',
    'daegu': '대구',
    'ulsan': '울산',
    'busan': '부산',
};

//해당 지역 열개의 데이터 가져오기
router.get('/location', async (req, res, next) => {
    const syncDateObj = syncDate();
    const location = (locationTable[req.query.location] !== undefined ? locationTable[req.query.location] : req.query.location);
    const postObj = {
        "bbs_searchInfo":
        {
            "pageIndex":
                "1", "pageUnit": "10", "pageSize": 10, "firstIndex": "1", "lastIndex": "1", "recordCountPerPage": "10",
                "bbs_no": "63", "bbs_ordr": "", "use": "", "opCode": "", "search_type_v": "2", "search_val_v": location,
                "search_key_n": "", "search_notice": "", "search_use": "", "search_permits": "", "search_disaster_a": "",
                "search_disaster_b": "", "search_amendment": "", "search_start": syncDateObj.search_date_limit, "search_end": syncDateObj.search_end, 
                "search_date_limit": syncDateObj.search_date_limit
        }
    };

    const rawData = await axios.post("https://www.safekorea.go.kr/idsiSFK/bbs/user/selectBbsList.do",postObj);
    const boardDatas = [];
    if(rawData.data.bbsList.length===0){
        return res.json(-1);
    }
    rawData.data.bbsList.forEach((val) => {
        const boardData = {
            bbs_ordr : val.BBS_ORDR,
            date : val.FRST_REGIST_DT,
            detailDate : val.LAST_MODF_DT,
            content : val.SJ
        };
        boardDatas.push(boardData);
     });
    return res.json(boardDatas);
});

router.get('/location/detail', async (req, res, next) => {
    const detailSelect = {
        "bbs_searchInfo":{
            "pageIndex":"1","pageUnit":"10","pageSize":"10","firstIndex":"1","lastIndex":"1","recordCountPerPage":"10",
            "bbs_no":"63","bbs_ordr":req.query.bbs_ordr,"use":"","opCode":"2",
            "search_type_v":"","search_val_v":"","search_key_n":"","search_notice":"","search_use":"","search_permits":"","search_disaster_a":"","search_disaster_b":"","search_amendment":"","search_start":"","search_end":""}};
    const response = await axios.post("https://www.safekorea.go.kr/idsiSFK/bbs/user/selectBbsView.do",detailSelect);
    return res.json(response.data.bbsMap.cn);
});

router.get('/location/cur', async (req, res, next) => {
    const syncDateObj = syncDate();
    const location = (locationTable[req.query.location] !== undefined ? locationTable[req.query.location] : req.query.location);
    const postObj = {
        "bbs_searchInfo":
        {
            "pageIndex":
                "1", "pageUnit": "10", "pageSize": 10, "firstIndex": "1", "lastIndex": "1", "recordCountPerPage": "10",
                "bbs_no": "63", "bbs_ordr": "", "use": "", "opCode": "", "search_type_v": "2", "search_val_v": location,
                "search_key_n": "", "search_notice": "", "search_use": "", "search_permits": "", "search_disaster_a": "",
                "search_disaster_b": "", "search_amendment": "", "search_start": syncDateObj.search_date_limit, "search_end": syncDateObj.search_end, 
                "search_date_limit": syncDateObj.search_date_limit
        }
    };

    const rawData = await axios.post("https://www.safekorea.go.kr/idsiSFK/bbs/user/selectBbsList.do",postObj);
    return res.json(rawData.data.rtnResult.totCnt);
});

module.exports = router;