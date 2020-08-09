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
const resLimit = 1;
var parsedBody, ps4Details;
//format of URL for GiantBomb
//http://www.giantbomb.com/api/[RESOURCE-TYPE]/[RESOURCE-ID]/?api_key=[YOUR-KEY]&format=[RESPONSE-DATA-FORMAT]&field_list=[COMMA-SEPARATED-LIST-OF-RESOURCE-FIELDS]
const reqPattern = mainURL + resType + "/?api_key=" + api_key + "&format=" + resFormat + "&platform=" + resIDPS4+ "&limit=1";
const options = {
    api_key: api_key,
    format: resFormat,
    platforms: resIDPS4,
    limit: resLimit,
    //sort: 'original_release_date:desc'
};
const platOptions = {
  api_key: api_key,
  format: resFormat,
  id: resIDPS4
};

app.get("/", function (req, res) {
  superagent.get(mainURL+"games/").query(options)
  .then(gamesResp => {console.log(gamesResp.request.url)})
  .then(superagent.get(mainURL+"platform/"+resIDPS4).query(platOptions))
  .then(setTimeout(ps4Resp => {console.log(ps4Resp)},30000))
  //.then(res.render("index.ejs",{parsedBody:respo.body.results, ps4Details: ps4Details}));
});
app.listen(port, function () {
    console.log("Server is running");
  });