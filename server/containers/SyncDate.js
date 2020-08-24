//
const syncDate = ()=>{
    let date = new Date();
    date = new Date(date.setMonth(date.getMonth() - 1));
    const year = String(date.getFullYear());
    let last_month = String(date.getMonth() + 1  > 12 ? date.getMonth() - 11 : date.getMonth() + 1);
    let cur_month = String(date.getMonth() + 2 > 12 ? date.getMonth() - 10 : date.getMonth() + 2);
    let day = String(date.getDate());
    day = (day.length == 1) ? "0" + day : day;
    last_month = (last_month.length == 1) ? "0" + last_month : last_month;
    cur_month = (cur_month.length == 1) ? "0" + cur_month : cur_month;
    //
    const search_date_limit = `${year}${last_month}${day}`;
    const search_end = `${year}${cur_month}${day}`;
    return {search_date_limit,search_end};
}

module.exports = syncDate;