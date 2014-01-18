var https = require('https')
  , hostname = 'www.googleapis.com'
  , path ='/geolocation/v1/geolocate?key='
  , port = 443;


function googleGeolocationAPI(key,body,cb) {
  var bodyString = JSON.stringify(body)
  var options = {
    hostname: hostname,
    port: port,
    path: path + key,
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Content-Length': bodyString.length }
  };

  var req = https.request(options, function (res) {
	  	var response = '';
	  	res.on('data', function (chunk) {
	  	    response += chunk;
	  	  })

	  	res.on('end', function () {
	        cb(false,response);
	      })
    })

  req.write(bodyString);
  req.on('error', function(e) {
  	cb(e);
  })
  req.end();
}

module.exports = googleGeolocationAPI;