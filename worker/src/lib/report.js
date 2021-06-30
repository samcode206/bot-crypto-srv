const opts = require("../config/options.js");

// publishes a log if the percentages are higher than specified 
const report = async (diffs) => {
    const report = {}; 
    const bidDiff =  diffs.bidDiff;
    const askDiff = diffs.askDiff;

    if (askDiff === null || bidDiff === null) return;
    
    // checks if the prices is dropped since last fetch 
    const isAskDown = askDiff < 0 ? true : false; 
    const isBidDown = bidDiff < 0 ? true : false; 

    // gets the absolute value of the percentage 
    const absAskDiff = Math.abs(askDiff);
    const absBidDiff = Math.abs(bidDiff);

    // if either are aboce the limit then lets generate a report 
    if (absAskDiff > opts.notifyAt || absBidDiff > opts.notifyAt){
        if (absAskDiff > opts.notifyAt){
            report.askReport = {
                direction: isAskDown ? "down" : "up",
                percentage: absAskDiff,
                alertDate: new Date().toISOString(),
                currency:  [opts.currencyOne, opts.currencyTwo],
            }; 
        };
    
        if (absBidDiff > opts.notifyAt){
            report.bidReport = {
                direction: isBidDown? "down" : "up",
                percentage: absBidDiff,
                alertDate: new Date().toISOString(),
                currency: [opts.currencyOne, opts.currencyTwo],
            }; 
        };

        return report; 
    };
    
    // return null everything is within range still 
    return null; 
}; 


module.exports = report; 