var https = require('https');

var data = JSON.stringify({
 api_key: 'NEX_API_KEY', //NEX_API_KEY 
 api_secret: 'NEX_API_SECRET', //EX_API_SECRET
 to: '441632960960',
 from: '441632960961',
 text: 'Hello from Nexmo'
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