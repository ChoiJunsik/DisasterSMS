const print = console.log;
const fs = require('fs');

const sortDB = async ()=>{
    await fs.readFile('./smsDB.json', 'utf8', function readFileCallback(err, data){
        if (err){
            print(err);
        } else {
        obj = JSON.parse(data); //now it an object
        obj.sort((a,b)=>{
            if(a.date===b.date){
                return (a.detailDate < b.detailDate == true ? -1 : 1);
            }
            return (a.date < b.date == true ? -1 : 1);
        })
        json = JSON.stringify(obj); //convert it back to json
        fs.writeFile('./smsDB.json', json, function(err,data){
        }); // write it back 
    }});
}

const updateDB = async (updatedDataArray)=>{
    await fs.readFile('./smsDB.json', 'utf8', function readFileCallback(err, data){
        if (err){
            print(err);
        } else {
        obj = JSON.parse(data); //now it an object
        const objIndex = new Map()
        obj.forEach((e)=>{
            objIndex.set(e.bbs_ordr,true);
        })
        updatedDataArray.forEach((updatedData)=>{
            if(objIndex.get(updatedData.bbs_ordr)===undefined){
                obj.push(updatedData);
            }
        })
        json = JSON.stringify(obj); //convert it back to json
        fs.writeFile('./smsDB.json', json, function(err,data){
            console.log(`The data was appended to file!`);
          }); // write it back 
    }});
    // sortDB();
}


module.exports = {updateDB,sortDB};