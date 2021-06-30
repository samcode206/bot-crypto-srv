const insertMsg = require("./db/insertLogs.js");
const subscribe = require("./sub/subscriber.js");
const notify = require("./lib/notify.js");


subscribe((channel, message) => {
    notify(channel, message); 
    insertMsg(message); 
});


