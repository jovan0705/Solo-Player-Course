function convertDate (date) {
    let year = date.getFullYear();
    let month = date.getMonth()+1;
    if (month < 10) {
        month = `0${month}`
    }
    let day = date.getDate();
    if (day < 10) {
        day = `0${day}`
    }
    let newDate = `${day}-${month}-${year}`;
    return newDate
}

module.exports = convertDate