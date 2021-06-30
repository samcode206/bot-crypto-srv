const redis = require("redis"); 
const options = require("../config/options.js"); 


// configure redis dev mode 
const redisClient = redis.createClient({
    host: options.redisHost,
    port: options.redisPort, 
    retry_strategy: () => 1000,
});

redisClient.on("error", function(error) {
    console.error(error, "redis-error");
});

const redisPub = redisClient.duplicate();


module.exports = redisPub; 