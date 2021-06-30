const publishHandler = require("../publisher.js");
const redisPub = require("../redisPub.js");

it("should return null when null argument is provided (report returns null if nothing is out of bounds)",async ()=>{
  
    const res = await publishHandler(null);

    expect(res).toEqual(null);

    // jest.spyOn(redisPub, "publish").mockImplementation((chan, val, cb) =>{
    //     console.log(chan);
    // })

   
}); 


it("shoud call publish when given a non null value", async ()=>{

    jest.spyOn(redisPub, "publish").mockImplementation((chan, val, cb) =>{
        console.log("i was called");
    })
    const res = await publishHandler({hello: "world"});

    expect(redisPub.publish).toHaveBeenCalled();
}); 