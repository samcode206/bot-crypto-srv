const redis = require("redis");
const options = require("../config/options.js"); 

const redisClient = redis.createClient({
    host: options.redisHost,
    port: options.redisPort, 
    retry_strategy: () => 1000,
});

redisClient.on("error", function(error) {
    console.error(error, "redis-error");
});


module.exports = redisClient; 