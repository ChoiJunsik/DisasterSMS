const axios = require("axios");
const fs = require('fs');
//
const syncDate = require('./SyncDate');
//
//search_date_limit : 한계
//search_end/start : 끝 시작
//pageIndex : cur , pageSize : 총 페이지 수
const getMonthlyBoardData = async () => {
    const {search_date_limit,search_end} = syncDate();
    console.log(`limit data : ${search_date_limit}, ${search_end}`);

    const initData = {
        "bbs_searchInfo": {
            "pageIndex": "1", "pageUnit": "1", "pageSize": 10, "firstIndex": "1", "lastIndex": "1", "recordCountPerPage": "10",
            "bbs_no": "63", "bbs_ordr": "", "use": "", "opCode": "", "search_type_v": "1", "search_val_v": "", "search_key_n": "", "search_notice": "", "search_use": "", "search_permits": "", "search_disaster_a": "", "search_disaster_b": "", "search_amendment": "",
            "search_start": search_date_limit, "search_end": search_end, "search_date_limit": search_date_limit
        }
    };

    let res = await axios.post("https://www.safekorea.go.kr/idsiSFK/bbs/user/selectBbsList.do",
        initData);
    // console.log(res.data.bbsList);
    // res.data.bbsList.map((val) => { return console.log(val.SJ) });
    initData.bbs_searchInfo.pageUnit = String(res.data.rtnResult.pageSize);
    res = await axios.post("https://www.safekorea.go.kr/idsiSFK/bbs/user/selectBbsList.do",
    initData);
    
    monthlyData = [];
    res.data.bbsList.map((val) => {
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

//미친 코드, 국민재난안전포털 다운 시킴
// const getDetailMonthlyData = async (initData) => {
//     const res = await axios.post("https://www.safekorea.go.kr/idsiSFK/bbs/user/selectBbsList.do",
//         initData);
//     // console.log(res.data);
//     // console.log("================")
//     // console.log("================")
//     // console.log("================")
//     const detailSelect = {
//         "bbs_searchInfo":{
//             "pageIndex":"1","pageUnit":"10","pageSize":"10","firstIndex":"1","lastIndex":"1","recordCountPerPage":"10",
//             "bbs_no":"63","bbs_ordr":"","use":"","opCode":"2",
//             "search_type_v":"","search_val_v":"","search_key_n":"","search_notice":"","search_use":"","search_permits":"","search_disaster_a":"","search_disaster_b":"","search_amendment":"","search_start":"","search_end":""}};
//     const detailArray = [];
//     const list = [];
//     res.data.bbsList.map((val) => { list.push({bbs_searchInfo:{...detailSelect.bbs_searchInfo,bbs_ordr:val.BBS_ORDR}})});
//     list.map(async (postObj)=>{
//         // console.log(postObj);
//         const res = await axios.post("https://www.safekorea.go.kr/idsiSFK/bbs/user/selectBbsView.do",
//         postObj);
//         detailArray.push({date:res.data.bbsMap.sj,content:res.data.bbsMap.cn});
//     });

//     return detailArray;
// }

const main = async()=>{
    const monthlyData = await getMonthlyBoardData();
    // const finalData = await getDetailMonthlyData(ret);
    fs.writeFileSync('./smsDB.json', JSON.stringify(monthlyData), 'utf8');
}
main();