const pgClient = require("./pool.js");
const parseMsg = require("../lib/parseMsg.js"); 

const insertMsg = (message) => {
    const insert = "INSERT INTO logs (direction, percentage, alertdate, currency_one, currency_two, type) VALUES ($1, $2, $3, $4, $5, $6)";

    // max of two values will be inserted based on wether both ask and bid exceeded osiclation limiy
    const values = parseMsg(message);

    if (values === null) return; 

    values.forEach(vals => {
        pgClient.query(insert, vals)
        .then(() =>{
            console.log("db save succeeded!");
        })
        .catch(err =>{
            console.error("something went wrong", err); 
        })
    });

    
};

module.exports = insertMsg; 