const express = require('express');
const axios = require('axios');
const syncDate = require('../containers/SyncDate');
const {locationTable} = require('../containers/data');
const {createUser} = require('../models');
const router = express.Router();
//해당 지역 20개의 데이터 가져오기
router.get('/location', async (req, res, next) => {
    const syncDateObj = syncDate();
    const location = (locationTable[req.query.location] !== undefined ? locationTable[req.query.location] : req.query.location);
    const postObj = {
        "bbs_searchInfo":
        {
            "pageIndex":
                "1", "pageUnit": "20", "pageSize": 20, "firstIndex": "1", "lastIndex": "1", "recordCountPerPage": "10",
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

//기존 proxy api => 스케줄링으로 얻어온 데이터 redis에 저장 후 가져와서 보여주기(최적화 중)
router.get('/location/cur', async (req, res, next) => {
    const client = req.app.get('redis');
    client.get('curMap', function (err, value) {
        if (err) return res.status(404).json({err:-1});
        return res.status(200).json(JSON.parse(value));
    });
});
//weekly 정보
router.get('/location/weekly', async (req, res, next) => {
    const client = req.app.get('redis');
    client.get('weeklyGraph', function (err, value) {
        if (err) return res.status(404).json({err:-1});
        return res.status(200).json(JSON.parse(value));
    });
});

router.post('/subscribe', async (req, res, next) => {
    console.log(req.body);
    const email = req.body.email;
    const tags = req.body.tags;
    await createUser(email,tags);
    res.status(200).json({});
});


module.exports = router;



//(사용안함) 각 지역 한달간 재난문자 발생건수 => 스케줄러,DB화
// router.get('/location/cur', async (req, res, next) => {
//     const syncDateObj = syncDate();
//     const location = (locationTable[req.query.location] !== undefined ? locationTable[req.query.location] : req.query.location);
//     const postObj = {
//         "bbs_searchInfo":
//         {
//             "pageIndex":
//                 "1", "pageUnit": "10", "pageSize": 10, "firstIndex": "1", "lastIndex": "1", "recordCountPerPage": "10",
//                 "bbs_no": "63", "bbs_ordr": "", "use": "", "opCode": "", "search_type_v": "2", "search_val_v": location,
//                 "search_key_n": "", "search_notice": "", "search_use": "", "search_permits": "", "search_disaster_a": "",
//                 "search_disaster_b": "", "search_amendment": "", "search_start": syncDateObj.search_date_limit, "search_end": syncDateObj.search_end, 
//                 "search_date_limit": syncDateObj.search_date_limit
//         }
//     };

//     const rawData = await axios.post("https://www.safekorea.go.kr/idsiSFK/bbs/user/selectBbsList.do",postObj);
//     return res.json(rawData.data.rtnResult.totCnt);
// });