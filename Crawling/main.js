const {getMonthlyBoardData,getRecentlyBoardData} = require('./smsGetApi');
const {updateDB,sortDB} = require('../DB/dbAPI');

const main = async()=>{
    // const monthlyData = await getMonthlyBoardData();
    // const finalData = await getDetailMonthlyData(ret);
    // fs.writeFileSync('./smsDB.json', JSON.stringify(monthlyData), 'utf8');
    // const newData = await getRecentlyBoardData("10");
    // await updateDB(newData);
    // await sortDB();
}
main();