const options = require("../config/options.js"); 
const redisClient = require("./redisSub.js");

const channels = JSON.parse(options.channels); 

const redisSub = redisClient.duplicate();

const subscribe = (cb) => {
    
    channels.forEach(chan => {
        redisSub.subscribe(chan[0] + "-" + chan[1]);
    });


    redisSub.on("message", cb); 

}; 


module.exports = subscribe; 