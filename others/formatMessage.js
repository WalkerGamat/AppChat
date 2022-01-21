const moment = require('moment');

function formatMessage(user,text){
    return {
        text,
        user,
        time: moment().format('h:mm a')
    }
}

module.exports = formatMessage;