const schedule = require('node-schedule');
const redis = require('redis');
const {montlyDataProxy,todayDataProxy} = require('./proxy');

///////////////////////////////////////////////////////////////////////////////////JOB
const montlyDataJob = schedule.scheduleJob({ hour: 0, minute: 0 }, async () => {

    const client = redis.createClient({
        port: process.env.REDIS_PORT,
        host: process.env.REDIS_HOST,
        password: process.env.REDIS_PASSWORD
    });
    await montlyDataProxy(client);
    client.quit();
});
const updaeGraphJob = schedule.scheduleJob({ hour: 23, minute: 59 }, async () => {

    const client = redis.createClient({
        port: process.env.REDIS_PORT,
        host: process.env.REDIS_HOST,
        password: process.env.REDIS_PASSWORD
    });
    await todayDataProxy(client);
    client.quit();
});

module.exports = {montlyDataJob,updaeGraphJob};


// client.flushdb(function (err, succeeded) {
//     console.log(succeeded); // will be true if successfull
// });
// client.get('curMap', function (err, value) {
//     if (err) throw err;
//     console.log(JSON.parse(value));
// });