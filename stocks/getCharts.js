// var unirest = require("unirest");

// var req = unirest("GET", "https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/get-charts");

// req.query({
// 	"comparisons": "^GDAXI,^FCHI",
// 	"region": "US",
// 	"lang": "en",
// 	"symbol": "HYDR.ME",
// 	"interval": "5m",
// 	"range": "1d"
// });

// req.headers({
// 	"x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
// 	"x-rapidapi-key": "286817a66emsh28a4e95f2ce95ddp178e23jsn582bf9bb6287"
// });


// req.end(function (res) {
// 	if (res.error) throw new Error(res.error);

// 	console.log(res.body);
// });

// var unirest = require("unirest");

// var req = unirest("GET", "https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/get-movers");

// req.query({
// 	"region": "US",
// 	"lang": "en"
// });

// req.headers({
// 	"x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
// 	"x-rapidapi-key": "286817a66emsh28a4e95f2ce95ddp178e23jsn582bf9bb6287"
// });


// req.end(function (res) {
// 	if (res.error) throw new Error(res.error);

// 	console.log(res.body);
// });

// var unirest = require("unirest");

// var req = unirest("GET", "https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-chart");

// req.query({
// 	"interval": "5m",
// 	"region": "US",
// 	"symbol": "AMRN",
// 	"lang": "en",
// 	"range": "1d"
// });

// req.headers({
// 	"x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
// 	"x-rapidapi-key": "286817a66emsh28a4e95f2ce95ddp178e23jsn582bf9bb6287"
// });

// req.end(function (res) {
// 	if (res.error) throw new Error(res.error);

// 	console.log(res.body.chart);
// });

// var unirest = require("unirest");

// var req = unirest("GET", "https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/get-quotes");

// req.query({
// 	"region": "US",
// 	"lang": "en",
// 	"symbols": "DJIA,SPY,RUT"
// });

// req.headers({
// 	"x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
// 	"x-rapidapi-key": "286817a66emsh28a4e95f2ce95ddp178e23jsn582bf9bb6287"
// });


// req.end(function (res) {
// 	if (res.error) throw new Error(res.error);

// 	console.log(res.body.quoteResponse.result);
// });

// var unirest = require("unirest");

// var req = unirest("GET", "https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/get-movers");

// req.query({
// 	"region": "US",
// 	"lang": "en"
// });

// req.headers({
// 	"x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
// 	"x-rapidapi-key": "286817a66emsh28a4e95f2ce95ddp178e23jsn582bf9bb6287"
// });

// req.end(function (res) {
// 	if (res.error) throw new Error(res.error);

// 	console.log(res.body.finance.result[0].quotes);
// });

var unirest = require("unirest");

var req = unirest("GET", "https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/get-movers");

req.query({
	"region": "US",
	"lang": "en"
});

req.headers({
	"x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
	"x-rapidapi-key": "286817a66emsh28a4e95f2ce95ddp178e23jsn582bf9bb6287"
});


req.end(function (res) {
	if (res.error) throw new Error(res.error);

	console.log(res.body.finance.result[1].criteriaMeta.criteria);
});