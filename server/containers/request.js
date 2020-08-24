const axios = require('axios');
const syncDate = require('./SyncDate');
const {locationTable,redisData} = require('./data');

////////////////////////////////////////////////////////REQUEST
const montlyDataRequest = async (location) => {
    const syncDateObj = syncDate();
    const reqObj = {
        "bbs_searchInfo":
        {
            "pageIndex":
                "1", "pageUnit": "10", "pageSize": 10, "firstIndex": "1", "lastIndex": "1", "recordCountPerPage": "10",
            "bbs_no": "63", "bbs_ordr": "", "use": "", "opCode": "", "search_type_v": "2", "search_val_v": locationTable[location],
            "search_key_n": "", "search_notice": "", "search_use": "", "search_permits": "", "search_disaster_a": "",
            "search_disaster_b": "", "search_amendment": "", "search_start": syncDateObj.search_date_limit, "search_end": syncDateObj.search_end,
            "search_date_limit": syncDateObj.search_date_limit
        }
    };

    const montlyData = await axios.post("https://www.safekorea.go.kr/idsiSFK/bbs/user/selectBbsList.do", reqObj);
    
    redisData[location] = montlyData.data.rtnResult.totCnt;

    return;
}
const todayDataRequest = async (location,ret) => {
    const syncDateObj = syncDate();

    const todayRequest = {
        "bbs_searchInfo":
        {
            "pageIndex":
                "1", "pageUnit": "10", "pageSize": 10, "firstIndex": "1", "lastIndex": "1", "recordCountPerPage": "10",
                "bbs_no": "63", "bbs_ordr": "", "use": "", "opCode": "", "search_type_v": "2", "search_val_v": locationTable[location],
                "search_key_n": "", "search_notice": "", "search_use": "", "search_permits": "", "search_disaster_a": "",
                "search_disaster_b": "", "search_amendment": "", "search_start": syncDateObj.search_end, "search_end": syncDateObj.search_end, 
                "search_date_limit": syncDateObj.search_end
        }
    };

    const todayData = await axios.post("https://www.safekorea.go.kr/idsiSFK/bbs/user/selectBbsList.do",todayRequest);
    ret[location].push({"date":syncDateObj.search_end,"재난문자 발생건수":todayData.data.rtnResult.totCnt});

    return;
}

module.exports = {montlyDataRequest,todayDataRequest};