const opts = require("../../config/options.js");
const measureOscillation = require("../oscillation.js");
const report = require("../report.js"); 

opts.notifyAt = 0.01; 
opts.currencyOne = "USD";
opts.currencyTwo = "BTC"; 

it("returns a report of the oscilation is greater than given for one if one is greter", async () =>{
    const feed = {
        ask: 200,
        bid: 200,
        }; 
    
      await measureOscillation(feed); 
        // 5% decrease 
        feed.ask = feed.ask - 10; 

        const res = await measureOscillation(feed); 
    
        reportRes = await report(res); 

        expect(reportRes.askReport).toBeDefined();

        // since nothing has changed for the bid we are not expecting it to be reported 
        expect(reportRes.bidReport).not.toBeDefined();
        
        expect(reportRes.askReport.direction).toEqual("down"); 

        expect(reportRes.askReport.percentage).toEqual(5);

        expect(reportRes.askReport.currency[0]).toEqual("USD");
        expect(reportRes.askReport.currency[1]).toEqual("BTC");

        expect(reportRes.askReport.alertDate).toBeInstanceOf(Date);
}); 


it("returns a report of the oscilation for both if both are greater", async () =>{
    const feed = {
        ask: 200,
        bid: 200,
        }; 
    
      await measureOscillation(feed); 
        // 5% decrease 
        feed.ask = feed.ask - 10; 
        feed.bid = feed.bid + 100; 
        const res = await measureOscillation(feed); 
    
        reportRes = await report(res); 

        expect(reportRes.askReport).toBeDefined();

        // since nothing has changed for the bid we are not expecting it to be reported 
        expect(reportRes.bidReport).toBeDefined();
        
        expect(reportRes.askReport.direction).toEqual("down"); 
        expect(reportRes.bidReport.direction).toEqual("up"); 
        expect(reportRes.askReport.percentage).toEqual(5);
        expect(reportRes.bidReport.percentage).toEqual(50);

        expect(reportRes.askReport.alertDate).toBeInstanceOf(Date);
}); 


it("returns a report of the oscilation is greater than given", async () =>{
    const feed = {
        ask: 200,
        bid: 200,
        }; 
    
      await measureOscillation(feed); 
      
        const res = await measureOscillation(feed); 
    
        reportRes = await report(res); 

        expect(reportRes).toEqual(null);
     
}); 

