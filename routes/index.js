exports.index = function(req, res){
  res.render('index',{});
};

exports.locate = function(req, res) {
  var g = require('../googlegeolocationapi')
  var googleAPIKey = 'AIzaSyDzcv8DIbbeGBaONSq2kXh7g9AZbgsiUC8' //AIzaSyBCN3M5g7tbBGaFGAUoulKRLshA6_McArY';
  
  var body = { wifiAccessPoints: req.body }

  g(googleAPIKey,body,function (e,data) {
    res.json(data);
    res.end();
  });
}