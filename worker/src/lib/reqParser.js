const opts = require("../config/options.js");

// converts the fetched data to proper format 
const parseResponse = (exchange) =>{
    if (exchange.status && exchange.status === -1) return null; 
    console.log("fetched new prices at: " + new Date()); 
    const ask = parseFloat(exchange.ask)
    const bid = parseFloat(exchange.bid)
    return {
        ask,
        bid,
        dateRecieved: new Date(),
        exchangeType: [opts.currencyOne, opts.currencyTwo],
    };
};

module.exports = parseResponse;
