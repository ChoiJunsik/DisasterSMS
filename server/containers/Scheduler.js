const schedule = require('node-schedule');
const redis = require('redis');
const syncDate = require('./SyncDate');
const axios = require('axios');

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
const redisData = {
    'seoul': 0,
    'gygg': 0,
    'incheon': 0,
    'gangwon': 0,
    'chungnam': 0,
    'chungbuk': 0,
    'daejeon': 0,
    'jeonbuk': 0,
    'jeonnam': 0,
    'gwangju': 0,
    'jeju': 0,
    'gyeongbuk': 0,
    'gyeongnam': 0,
    'daegu': 0,
    'ulsan': 0,
    'busan': 0,
};
const syncRedis = async (location) => {
    const syncDateObj = syncDate();
    const postObj = {
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

    const rawData = await axios.post("https://www.safekorea.go.kr/idsiSFK/bbs/user/selectBbsList.do", postObj);

    redisData[location] = rawData.data.rtnResult.totCnt;

    return;
}
const main = async (client) => {
    for (let location in locationTable) {
        await syncRedis(location);
    }
    client.set('curMap', JSON.stringify(redisData));
}

const job = schedule.scheduleJob({ hour: 0, minute: 0 }, async () => {

    const client = redis.createClient({
        port: process.env.REDIS_PORT,
        host: process.env.REDIS_HOST,
        password: process.env.REDIS_PASSWORD
    });
    await main(client);
    client.quit();
});

// client.flushdb(function (err, succeeded) {
//     console.log(succeeded); // will be true if successfull
// });
// client.get('curMap', function (err, value) {
//     if (err) throw err;
//     console.log(JSON.parse(value));
// });

module.exports = job;