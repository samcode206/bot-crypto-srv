const parseResponse = require("../reqParser.js");

// req parser relies on the request being successful of it is not then there will be a status code -1 to let it know there is no data to parse 
it("should null if the provided object has status property and status is -1", ()=>{
    expect(parseResponse({status: - 1})).toEqual(null);
}); 


it("should return the provided object that has strings converted to numbers", () =>{
    const obj = {
        ask: "0.7141551",
        bid: "11.41",
    }; 

    const res = parseResponse(obj);
    console.log(res);

    expect(res.ask).toEqual(0.7141551)
    expect(res.bid).toEqual(11.41)
    
    expect(res.dateRecieved).toBeInstanceOf(Date);
}); 