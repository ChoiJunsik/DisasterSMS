const { getMonthlyBoardData, getRecentlyBoardData } = require('./smsGetApi');
const { updateDB, sortDB } = require('../DB/dbAPI');
const redis = require('redis');
const client = redis.createClient({
    host: 'redis-17988.c1.asia-northeast1-1.gce.cloud.redislabs.com',
    port: '17988',
    password: 'y16kzWgBwyM4f1XQ9iv2it4EKslj7EbR'
});
client.on('error', function (err) {
    console.log('Error ' + err);
});
const main = () => {
    // const monthlyData = await getMonthlyBoardData();
    // const finalData = await getDetailMonthlyData(ret);
    // fs.writeFileSync('./smsDB.json', JSON.stringify(monthlyData), 'utf8');
    // const newData = await getRecentlyBoardData("10");
    // await updateDB(newData);
    // await sortDB();
    
    // client.get('hello', 'world', redis.print);
    
    // client.get('hello', function(err, value){
    //     if(err) throw err;
    //     console.log(value);
    
    // });

    //     client.flushdb( function (err, succeeded) {
//         console.log(succeeded); // will be true if successfull
//  });
    client.quit();
    return ;
}
main();