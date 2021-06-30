const opts = require("../config/options.js");
// represents the last fetched data prices starts as null on start up 
const latestExhangeOffer = {
    ask: null,
    bid: null, 
    dateRecieved: new Date(),
    exchangeType: [opts.currencyOne, opts.currencyTwo], 
};


// compares two values and gets the percentage differnece 
const compare = (oldPrice, newPrice) => {
    const result = ((newPrice - oldPrice) / oldPrice) * 100;
    return result; 
  }; 

// measures the percentage up or down between the current feteched data and the one before it returns {askDiff: number || null , bidDiff: number || null }
const measureOscillation = async (newExgOfr) => {
    // means there was an error fetching data or parsing it 
    if (newExgOfr === null) return {askDiff: null, bidDiff: null}; 

    // cold starts have null value set them for the next fetched data 
    if (latestExhangeOffer.ask === null || latestExhangeOffer.bid === null){
        latestExhangeOffer.bid = newExgOfr.bid;
        latestExhangeOffer.ask = newExgOfr.ask;
        dateRecieved = new Date(); 
        return {askDiff: null, bidDiff: null}
    } 
    // destructuring values and renaming them on the fly to work with compare function 
    const {bid: oldBid, ask: oldAsk} = latestExhangeOffer; 
    const {bid: newBid, ask: newAsk} = newExgOfr;  

    // comparing old and new values returns float reperesenting percentage relative to older value 
    const bidDiff = compare(oldBid, newBid);
    const askDiff = compare(oldAsk, newAsk);

    latestExhangeOffer.bid = newExgOfr.bid;
    latestExhangeOffer.ask = newExgOfr.ask;
    dateRecieved = new Date(); 


    // represents the differenc in percentage between the bid and the ask returns them to be used by report 
    return {bidDiff, askDiff}; 
}; 


module.exports = measureOscillation;