const axios = require("axios");
const print = console.log;
//
const syncDate = require('./SyncDate');
//search_date_limit : 한계
//search_end/start : 끝 시작
//pageIndex : cur , pageSize : 총 페이지 수
const getMonthlyBoardData = async () => {
    const {search_date_limit,search_end} = syncDate();
    print(`limit data : ${search_date_limit}, ${search_end}`);

    const initData = {
        "bbs_searchInfo": {
            "pageIndex": "1", "pageUnit": "1", "pageSize": 10, "firstIndex": "1", "lastIndex": "1", "recordCountPerPage": "10",
            "bbs_no": "63", "bbs_ordr": "", "use": "", "opCode": "", "search_type_v": "1", "search_val_v": "", "search_key_n": "", "search_notice": "", "search_use": "", "search_permits": "", "search_disaster_a": "", "search_disaster_b": "", "search_amendment": "",
            "search_start": search_date_limit, "search_end": search_end, "search_date_limit": search_date_limit
        }
    };

    let res = await axios.post("https://www.safekorea.go.kr/idsiSFK/bbs/user/selectBbsList.do",
        initData);
    // print(res.data.bbsList);
    // res.data.bbsList.map((val) => { return print(val.SJ) });
    initData.bbs_searchInfo.pageUnit = String(res.data.rtnResult.pageSize);
    res = await axios.post("https://www.safekorea.go.kr/idsiSFK/bbs/user/selectBbsList.do",
    initData);
    
    monthlyData = [];
    res.data.bbsList.forEach((val) => {
        const boardData = {
            bbs_ordr : val.BBS_ORDR,
            date : val.FRST_REGIST_DT,
            detailDate : val.LAST_MODF_DT,
            content : val.SJ
        };
        monthlyData.push(boardData);
     });
    
    return monthlyData;
}
const getRecentlyBoardData = async (pageUnit)=>{
    
    const {search_date_limit,search_end} = syncDate();
    print(`limit data : ${search_date_limit}, ${search_end}`);
    const initData = {
        "bbs_searchInfo": {
            "pageIndex": "1", "pageUnit": pageUnit, "pageSize": 10, "firstIndex": "1", "lastIndex": "1", "recordCountPerPage": "10",
            "bbs_no": "63", "bbs_ordr": "", "use": "", "opCode": "", "search_type_v": "1", "search_val_v": "", "search_key_n": "", "search_notice": "", "search_use": "", "search_permits": "", "search_disaster_a": "", "search_disaster_b": "", "search_amendment": "",
            "search_start": search_date_limit, "search_end": search_end, "search_date_limit": search_date_limit
        }
    };
    res = await axios.post("https://www.safekorea.go.kr/idsiSFK/bbs/user/selectBbsList.do",
    initData);
    
    updatedDataArray = [];

    res.data.bbsList.forEach((val) => {
        const boardData = {
            bbs_ordr : val.BBS_ORDR,
            date : val.FRST_REGIST_DT,
            detailDate : val.LAST_MODF_DT,
            content : val.SJ
        };
        updatedDataArray.push(boardData);
    });

    return updatedDataArray;
}

module.exports = {getMonthlyBoardData,getRecentlyBoardData};