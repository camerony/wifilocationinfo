exports.index = function(req, res){
  res.render('index',{});
};

exports.locate = function(req, res) {
  var g = require('../googlegeolocationapi')
  var googleAPIKey = 'AIzaSyBCN3M5g7tbBGaFGAUoulKRLshA6_McArY';
  
  var body = { wifiAccessPoints: req.body }

  g(googleAPIKey,body,function (e,data) {
    res.json(data);
    res.end();
  });
}