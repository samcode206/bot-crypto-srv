const axios = require("axios");
const opts = require("../config/options.js");

const fetchCurrency = async (currencyOne = opts.currencyOne, currencyTwo = opts.currencyTwo) => {
    try {
      const {data} = await axios.get(opts.baseUrl + `${currencyOne}-${currencyTwo}`);
      return data;
    } 
    catch (err){
        console.error(err);
        return {
            status: -1, 
            err,
        };
    };
};

module.exports = fetchCurrency; 