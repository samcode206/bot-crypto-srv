
// returns an array of arrays or null 
const parseMsg = (message) => {
    // order in the same way as db inserts

   const msg = JSON.parse(message); 


   if (msg.hasOwnProperty("askReport") && msg.hasOwnProperty("bidReport")){
    
    return [
        flattenMsg(msg.askReport, "ask"),
        flattenMsg(msg.bidReport, "bid"),
    ];

   } else if (msg.hasOwnProperty("askReport")){

    return [flattenMsg(msg.askReport, "ask")];

   } else if (msg.hasOwnProperty("bidReport")){

    return [flattenMsg(msg.bidReport, "bid")];

   } else {
       return null;
   }
}; 


/* takes and object and flattens it according to query insert order
 direction, percentage, alertdate, currency_one, currency_two, type) */
const flattenMsg = (msg, type) => [msg.direction, msg.percentage, msg.alertDate, msg.currency[0], msg.currency[1], type];


module.exports = parseMsg; 