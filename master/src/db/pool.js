const { Pool } = require("pg");
const options = require("../config/options.js"); 

// no orm needed for only one table 
const pgClient = new Pool({
    user: options.pgUser,
    host: options.pgHost,
    database: options.pgDatabase,
    password: options.pgPassword,
    port: options.pgPort,
    max: 250,
  });
  
pgClient.on("connect", client => {
    client
      .query(
        `     
        CREATE TABLE IF NOT EXISTS logs ( 
        direction varchar(4) NOT NULL,
        percentage double precision NOT NULL,
        alertdate timestamp NOT NULL,
        currency_one varchar(10) NOT NULL,
        currency_two varchar(10) NOT NULL,
        type varchar(3) NOT NULL
        );
      `
      )
      .then(fullfilled =>{ console.log("table created!")})
      .catch(err => { })
});




module.exports = pgClient; 

