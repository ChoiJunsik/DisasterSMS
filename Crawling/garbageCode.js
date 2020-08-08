//미친 코드, 국민재난안전포털 다운 시킴
// const getDetailMonthlyData = async (initData) => {
//     const res = await axios.post("https://www.safekorea.go.kr/idsiSFK/bbs/user/selectBbsList.do",
//         initData);
//     // print(res.data);
//     // print("================")
//     // print("================")
//     // print("================")
//     const detailSelect = {
//         "bbs_searchInfo":{
//             "pageIndex":"1","pageUnit":"10","pageSize":"10","firstIndex":"1","lastIndex":"1","recordCountPerPage":"10",
//             "bbs_no":"63","bbs_ordr":"","use":"","opCode":"2",
//             "search_type_v":"","search_val_v":"","search_key_n":"","search_notice":"","search_use":"","search_permits":"","search_disaster_a":"","search_disaster_b":"","search_amendment":"","search_start":"","search_end":""}};
//     const detailArray = [];
//     const list = [];
//     res.data.bbsList.map((val) => { list.push({bbs_searchInfo:{...detailSelect.bbs_searchInfo,bbs_ordr:val.BBS_ORDR}})});
//     list.map(async (postObj)=>{
//         // print(postObj);
//         const res = await axios.post("https://www.safekorea.go.kr/idsiSFK/bbs/user/selectBbsView.do",
//         postObj);
//         detailArray.push({date:res.data.bbsMap.sj,content:res.data.bbsMap.cn});
//     });

//     return detailArray;
// }