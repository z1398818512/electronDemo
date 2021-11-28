const dayjs = require('dayjs')
const path = require('path');
const fs = require('fs');



fs.mkdir(path.join(__dirname, '../printLog'), (err) => {

})


function writePrintLog(text) {
    const date = dayjs().format("YYYY-MM-DD")
    const dateTime = dayjs().format("YYYY-MM-DD HH:mm:ss")

    fs.writeFile(path.join(__dirname, '../printLog', date + '.txt'), `\n${dateTime}   ${text}`, { 'flag': 'a' }, function (err) {

    })
}


module.exports = {
    writePrintLog
}