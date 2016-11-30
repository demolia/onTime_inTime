// using SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
var helper = require('sendgrid').mail
  
from_email = new helper.Email("test@example.com")
to_email = new helper.Email("test@example.com")
subject = "Sending with SendGrid is Fun"
content = new helper.Content("text/plain", "and easy to do anywhere, even with Node.js")
mail = new helper.Mail(from_email, subject, to_email, content)

var sg = require('sendgrid')(process.env.SENDGRID_API_KEY);
var request = sg.emptyRequest({
  method: 'POST',
  path: '/v3/mail/send',
  body: mail.toJSON()
});

sg.API(request, function(error, response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})