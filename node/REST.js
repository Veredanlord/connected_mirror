var bcrypt = require('bcrypt');
var request = require('request-promise');

function REST_ROUTER(router, change) {
    var self = this;
    self.handleRoutes(router);
}

REST_ROUTER.prototype.convert = function(currency, value, targetCurrency)
{
  var self = this;
  var changeValues = self.getChange();
  var dollarValueOfCurrency;
  if(currency === changeValues.base){
    dollarValueOfCurrency = changeValues.rates[currency];
  }else{
    dollarValueOfCurrency = 1 / changeValues.rates[currency];
  }
  var dollarValueOfTargetCurrency;
  if (targetCurrency === changeValues.base) {
    dollarValueOfTargetCurrency = 1 / changeValues.rates[targetCurrency];
  }else{
    dollarValueOfTargetCurrency = changeValues.rates[targetCurrency];
  }
  var dollar = dollarValueOfCurrency * value;
  return dollar * dollarValueOfTargetCurrency;
};

REST_ROUTER.prototype.handleRoutes = function(router) {
    var self = this;
    router.get("/weather/:lat/:lon", function(req,res){
      var self = this;
      request("http://api.openweathermap.org/data/2.5/weather?lat=" + req.params.lat + "&lon=" + req.params.lon + "&mode=html&APPID=9341dfa7fc06f5af2fb53fac204cfd8b", function(error, response, body) {
        console.log("response: " + body + " error: " + error);
        res.json({"error" : false, "body" : body});
      });
    });
    router.get("/convert/:currency1/:value1/:currency2", function(req,res){
        var data = {
            "currencyToConvert": req.params.currency1,
            "valueToConvert": req.params.value1,
            "currencyToGet": req.params.currency2
        };
        var result = self.convert(data.currencyToConvert, data.valueToConvert, data.currencyToGet);
        if (result != null){
            res.json({
                "Error" : false,
                "Value" : result
            });
        }else{
            res.json({"Error" : true, "Message" : "Failed to convert"});
        }
    });
};


module.exports = REST_ROUTER;
