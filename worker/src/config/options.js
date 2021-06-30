module.exports = {
    baseUrl: process.env.BASE_URL,
    // time to rest between each request 
    timeBetween: process.env.TIME_BETWEEN,
    // % representing the notification threshhold 
    notifyAt: parseFloat(process.env.NOTIFY_AT),
    // represents the currency to check 
    currencyOne: process.env.CURR_ONE,
    // represents the currency to convert to 
    currencyTwo: process.env.CUR_TWO,

    redisHost: process.env.REDIS_HOST,

    redisPort: process.env.REDIS_PORT,
}; 
