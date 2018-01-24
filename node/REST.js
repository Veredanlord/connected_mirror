var bcrypt = require('bcrypt');
var request = require('request-promise');

var change = {};

function REST_ROUTER(router, change) {
    var self = this;
    self.getCurrenciesChange();
    self.handleRoutes(router);
}

REST_ROUTER.prototype.getChange = function()
{
  return change;
}

REST_ROUTER.prototype.setChange = function(value)
{
  change = value;
}

REST_ROUTER.prototype.getCurrenciesChange = function()
{
  var self = this;
  request("https://openexchangerates.org/api/latest.json?app_id=5063db9510d0407c9a823394f3b4487d", function(error, response, body) {
    console.log("response: " + body + " error: " + error);
    self.setChange(JSON.parse(body));
  });
};

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
    router.get("/currencies", function(req,res){
      if(self.getChange() !== undefined){
        var result = self.getChange();
        result = result.rates;
        res.json({"Error" : false, "rates" : Object.keys(result)});
      }else{s
        res.json({"Error" : true, "Message" : "Change could not be retrieved"});
      }
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
