var https = require('https');

var data = JSON.stringify({
<<<<<<< HEAD
 api_key: 
 api_secret:
 to: 
 from:
=======

 to: '0031630738105',
 from: '0031630738105',
>>>>>>> 057f1d1b48cfa9fb7a720d0f03fc6dab6e2cd6ce
 text: 'Hello from Nexmo, This is just a testietest'
});



var options = {
 host: 'rest.nexmo.com',
 path: '/sms/json',
 port: 443,
 method: 'POST',
 headers: {
   'Content-Type': 'application/json',
   'Content-Length': Buffer.byteLength(data)
 }
};

var req = https.request(options);

req.write(data);
req.end();

var responseData = '';
req.on('response', function(res){
 res.on('data', function(chunk){
   responseData += chunk;
 });

 res.on('end', function(){
   console.log(JSON.parse(responseData));
 });
});