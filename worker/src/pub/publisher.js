const opts = require("../config/options.js");
const redisPub = require("./redisPub.js");

// takes either report or null and publishes event back to master
const publishHandler = async (rep) =>{
    if (!rep) return null; 
    redisPub.publish(opts.currencyOne + "-" + opts.currencyTwo, JSON.stringify(rep));
};

module.exports = publishHandler; 