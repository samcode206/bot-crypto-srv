require("dotenv").config();
const fetchCurrency = require("./lib/fetcher.js");
const parseResponse = require("./lib/reqParser.js");
const measureOscillation = require("./lib/oscillation.js");
const report = require("./lib/report.js");
const timeBetween = require("./config/timeBetween.js");
const publishHandler = require("./pub/publisher.js");

// initates requests cycle 
setInterval(async ()=> {
    const response = await fetchCurrency();
    const osc = await measureOscillation(parseResponse(response));
    const rep = await report(osc);

    publishHandler(rep);
}, timeBetween);