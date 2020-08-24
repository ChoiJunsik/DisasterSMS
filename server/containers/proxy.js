const {locationTable,redisData} = require('./data');
const {montlyDataRequest,todayDataRequest} = require('./request');

///////////////////////////////////////////////////////////////PROXY
const montlyDataProxy = async (client) => {

    for (let location in locationTable) {
        await montlyDataRequest(location);
    }
    client.set('curMap', JSON.stringify(redisData));
}

const todayDataProxy = async (client) => {
    const ret = await new Promise((res,rej)=>{ client.get('weeklyGraph', function (err, value) {
        if (err) throw err;
        res(JSON.parse(value));
    })});
    for (let location in locationTable) {
        ret[location].shift();
        await todayDataRequest(location,ret);
    }
    client.set('weeklyGraph', JSON.stringify(ret));
}

module.exports = {montlyDataProxy,todayDataProxy};