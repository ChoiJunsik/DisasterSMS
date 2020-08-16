const schedule = require('node-schedule');
const redis = require('redis');
const syncDate = require('./SyncDate');
const locationTable = require('./data');
const axios = require('axios');

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