var Nexmo = require('nexmo');
var nexmo = new Nexmo({
  	apiKey: API_KEY,
  	apiSecret: API_SECRET,
  	applicationId: appId,
    privateKey: __dirname + '/private.key',
});

nexmo.calls.create(
      {
        to: [{
          type: 'phone',
          number: ''
        }],
        from: {
          type: 'phone',
          number: '+31630738105'
        },
        answer_url: ['https://nexmo-community.github.io/ncco-examples/first_call_talk.json']
      },
      function(err, res) {
        if(err) { console.error(err); }
        else { console.log(res); }
      }
);