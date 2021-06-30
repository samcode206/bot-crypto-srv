const measureOscillation = require("../oscillation.js");



it("shoud return null on the first call for askDiff & bidDiff and update its values while returning the differency in % for other calls", async ()=> {
   const feed = {
    ask: 200,
    bid: 200,
    }; 

    const res = await measureOscillation(feed); 

    expect(res.askDiff).toEqual(null);
    expect(res.bidDiff).toEqual(null);


    const res2 = await measureOscillation(feed);
    expect(res2.askDiff).toEqual(0);
    expect(res2.bidDiff).toEqual(0);

    // 5% decrease 
    feed.ask = feed.ask - 10; 
    // 25% increase 
    feed.bid = feed.bid + 50; 

    const res3 = await measureOscillation(feed); 

    expect(res3.askDiff).toEqual(-5);
    expect(res3.bidDiff).toEqual(25);
}); 