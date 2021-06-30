const axios = require("axios"); 
const fetchCurrency = require("../fetcher.js");

jest.mock("axios"); 




it('returns the response when request is initated', async () => {
    axios.get.mockResolvedValue({
      data: {
        "ask": "36069.12458",
        "bid": "35947.73938",
        "currency": "should be mocked",
      },
    });
  
    const res = await fetchCurrency("USD", "BTC");

    expect(typeof res.ask).toEqual("string");
    expect(typeof res.ask).toEqual("string");

    
    expect(res.currency).toEqual("should be mocked");
  });


  it("should return an object with the error from the server and an added property called status with a value of -1", async () => {

    axios.get.mockRejectedValue({
        response: {
            status: 404,
            statusText: 'Not Found'
        }
      });

      const res = await fetchCurrency("USD", "BTC");
      
      expect(res.status).toBeDefined();

      expect(res.status).toEqual(-1);
  }); 
  
  