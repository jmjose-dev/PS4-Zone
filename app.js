var ex = require("express");
var ej = require("ejs");
var app = ex();
var port = process.env.PORT || 3000;
const request = require('request');
const superagent = require('superagent');
app.use(ex.static("public"));
const api_key="84d9e51a8db0b60ce9df31d13eb17a24e5ead7f4";
const mainURL = "http://www.giantbomb.com/api/";
const urlGames = 'https://www.giantbomb.com/api/games/?api_key=' + api_key + "'";
const resType = 'games';
const resIDPS4 = '146';
const resPlatform = 'platform=' + resIDPS4;
const resID = '';
const resFormat = 'json';
const param1 = 'limit=1';
const resLimit = 10;
var parsedBody;

//format of URL for GiantBomb
//http://www.giantbomb.com/api/[RESOURCE-TYPE]/[RESOURCE-ID]/?api_key=[YOUR-KEY]&format=[RESPONSE-DATA-FORMAT]&field_list=[COMMA-SEPARATED-LIST-OF-RESOURCE-FIELDS]
const reqPattern = mainURL + resType + "/?api_key=" + api_key + "&format=" + resFormat + "&platform=" + resIDPS4+ "&limit=1";
const options = {
    api_key: api_key,
    format: resFormat,
    platforms: resIDPS4,
    limit: resLimit,
    sort: 'name:asc'
};




app.get("/", function (req, res) {
  superagent
  .get(mainURL+"games/")
  .query(options)
  .then(respo => {
    //console.log(respo.body.url);
    //console.log(respo.body.results[0].platforms);
    res.render("index.ejs",{parsedBody:respo.body.results});
  });




});
app.listen(port, function () {
    console.log("Server is running");
    //console.log(reqPattern);
  });