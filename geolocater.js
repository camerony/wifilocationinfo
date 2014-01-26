var googleAPIKey = 'AIzaSyCqVvlF35gLvdXPlRZNJ2_hWd0KqzHTcNs' //AIzaSyBCN3M5g7tbBGaFGAUoulKRLshA6_McArY';

/****************
                            SSID BSSID             RSSI CHANNEL HT CC SECURITY (auth/unicast/group)
                             SWS 24:de:c6:8b:91:c2 -87  6       Y  -- WPA2(PSK/AES/AES) 
                           SWS-b 6c:f3:7f:3d:ae:13 -84  11      Y  -- WEP
         DIRECT-Ds[TV]UN32EH5300 5e:a3:9d:4c:05:26 -68  11,-1   Y  S WPA2(PSK/AES/AES) 
                       Evergreen 48:f8:b3:82:5f:0c -72  11      N  -- WPA2(PSK/AES/AES) 
                             SWS 00:21:29:73:16:2d -83  3       N  -- WPA2(PSK/AES/AES) 
                      2Evergreen 48:f8:b3:82:5f:0d -75  149,+1  Y  -- WPA2(PSK/AES/AES) 
****************/


var body = {
	wifiAccessPoints: [
    { macAddress: 'dc:9f:db:1c:f7:b1'},
    { macAddress: '00:21:29:73:16:2d'}
	]
}

var g = require('./googlegeolocationapi')

g(googleAPIKey,body,function (e,res) {
		if (e) {
			console.log('Error:',e); 
			return false;
		}

		console.log(res);
	})

/***************

{
  "macAddress": "01:23:45:67:89:AB",
  "signalStrength": -65,
  "age": 0,
  "channel": 11,
  "signalToNoiseRatio": 40
}

***************/