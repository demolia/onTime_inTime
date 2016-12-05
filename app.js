// Import necessary modules
const express    = require( 'express' )
const app        = express( )
const bodyParser = require( 'body-parser' )
const session    = require( 'express-session' )
const sequelize  = require( 'sequelize' )
const helper = require('sendgrid').mail
// const bcrypt 	 = require( 'bcrypt' )
// NEW 	!!!!
const flash 	 = require( 'connect-flash' )
// const passport 	 = require( 'passport' ) 
// const FacebookStrategy = require( 'passport-facebook' ).Strategy
// const FacebookTokenStrategy = require( 'passport-facebook-token' )



//static will become default and overwrite /home
app.use( express.static( 'static' ) )


// Need this to use the middleware & sessions
app.use( bodyParser.urlencoded({ extended: true }))


app.use(session({
    secret: 'oh wow very secret much security',
    resave: true,
    saveUninitialized: false
}));


// NEW !!!!!
// app.use(passport.initialize())

// app.use(passport.session()) // persistent login sessions

app.use(flash()) // use connect-flash for flash messages stored in session 

// passport.use(new FacebookStrategy({
// 	// 'clientID' : FACEBOOK_APP_ID,
// 	'clientSecret' : FACEBOOK_APP_SE CRET,
// 	'callbackURL' : 'http://localhost:8000/auth/facebook/callback',
// 	'profileFields': ['id', 'displayName', 'email', 'picture.width(800).height(800)']
// },
//   	// facebook will send back the tokens and profile
//   	function(access_token, refresh_token, profile, done) {
//     // asynchronous
//     process.nextTick(function() {

//       // find the user in the database based on their facebook id
//       User.findOne({ 'id' : profile.id }, function(err, user) {

//         // if there is an error, stop everything and return that
//         // ie an error connecting to the database
//         if (err)
//         	return done(err)

//           // if the user is found, then log them in
//           if (user) {
//             return done(null, user); // user found, return that user
//         } else {
//             // if there is no user found with that facebook id, create them
//             var newUser = new User()

//             // set all of the facebook information in our user model
//             newUser.fb.id    = profile.id; // set the users facebook id                 
//             newUser.fb.access_token = access_token; // we will save the token that facebook provides to the user                    
//             newUser.fb.firstName  = profile.name.givenName;
//             newUser.fb.lastName = profile.name.familyName; // look at the passport user profile to see how names are returned
//             newUser.fb.email = profile.emails[0].value; // facebook can return multiple emails so we'll take the first

//             // save our user to the database
//             newUser.save(function(err) {
//             	if (err)
//             		throw err;

//               // if successful, return the new user
//               return done(null, newUser);
//           });
//         } 
//     });
//   });
// }));




// which visual template you'll be using 
app.set( 'view engine', 'pug' )

app.set( 'views', __dirname + '/views' )


// defining the database 
let db = new sequelize ('ontimeintime', process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD, {
	server: 'localhost',
	dialect: 'postgres'
})


// Define database structure


// Define models
let User = db.define( 'user', {
	name: sequelize.STRING,
	email: { type: sequelize.STRING, unique: true},

	password: sequelize.STRING
} )

let SetTime = db.define('settime', {
  settime: sequelize.STRING,

	password: sequelize.STRING,
	number: sequelize.STRING
} )


// Define relations
User.hasMany( SetTime )
SetTime.belongsTo ( User )






// // NEW !!!
// passport.serializeUser(function(user, done) {
//   done(null, user.id);
// });

// passport.deserializeUser(function(id, done) {
//   User.findById(id, function(err, user) {
//     done(err, user);
//   });
// });





// Set express routes

// Index

app.get ('/', (req, res) => {
	console.log ('Index page loaded')
	res.render('index' , {
		message: req.query.message,
		user: req.session.user
	})
})



// Alarm clock
app.get( '/account', ( req, res ) => {

	console.log( 'pong' )
	res.render( 'account' )
		user: req.session.user
})




// // NEW !!!
// app.get('/auth/facebook',
//   passport.authenticate('facebook', { scope: ['user_friends', 'publish_actions'] }));

// app.get('/auth/facebook/callback',
//   passport.authenticate('facebook', { failureRedirect: '/login' }),
//   function(req, res) {
//     // Successful authentication, redirect home.
//     res.redirect('/');
//   });


// // NEW !!!
// app.post('/', passport.authenticate('local-login', {
// 	successRedirect: '/account',
// 	failureRedirect: '/',
// 	failureFlash: true
// }))

// app.post('/login',
//   passport.authenticate('local', { successRedirect: '/',
//                                    failureRedirect: '/login',
//                                    failureFlash: true })
// );

// get and render the main page, which is the log in page
app.get("/clock", (req, res) => {

  res.render("clock")
})


app.post("/clock", (req, res) => {

  console.log(typeof req.body.setTime)

  SetTime.create ({
    settime: req.body.time
    
  }).then( () => {
    console.log(req.body.time)
    res.redirect('clock')
  })


})

app.post("/currenttime", (req, res) => {

  console.log(typeof req.body.time)

  res.send("send me thousands of responses please")

  
  SetTime.findAll({
    where: {settime: req.body.time}
  }).then(cheese => {
    console.log(cheese.length)
    if (cheese.length !== 0) {
      from_email = new helper.Email("jimmyvoskuil@msn.com")
      to_email = new helper.Email("yarithjoseph@gmail.com")
      subject = "Sending with SendGrid is Fun"
      content = new helper.Content("text/plain", "and easy to do anywhere, even with Node.js")
      mail = new helper.Mail(from_email, subject, to_email, content)
      console.log(process.env.SENDGRID_API_KEY)
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
    }
    else {
      console.log("no time like this in the database")
    }
  })


})

// // NEW !!!
// // Change password
// app.get( '/settings', ( req, res ) => {
// 	console.log( 'changing password' )
// 	res.render( 'setting' )
// })


// // NEW!!!
// // Change passwordform
// app.post( '/settings', ( req, res ) => {
// 	User.findOne({
//         where: { id: req.session.user.id }
//     }).then( ( thisuser ) => {
//     	console.log( thisuser.password )
//     	console.log( req.body.password )
//         bcrypt.compare(req.body.password, thisuser.password, ( err, data ) => {
//         	if (err !== undefined) {
//     			console.log(err);
// 	    	} else {
// 			    // store it in the database
// 			    bcrypt.hash( req.body.new, 5, function ( err, hash ) {	
//     				thisuser.updateAttributes ({
// 			 	    	password: hash
// 			        })
// 			    }) 
// 			}
//         console.log( 'Password updated!' )
//         res.redirect( '/account' )
//     	})
//     })

// })



// // Getting a user logged in
// app.post('/login', bodyParser.urlencoded({extended: true}), function (request, response) {
// 	if(request.body.email.length === 0) {
// 		response.redirect('/?message=' + encodeURIComponent("Please fill out your email address."));
// 		return;
// 	}

// 	if(request.body.password.length === 0) {
// 		response.redirect('/?message=' + encodeURIComponent("Please fill out your password."));
// 		return;
// 	}
// 	// In the database we are looking for one-User which has the email that matches the email that was put in.
// 	User.findOne({
// 		where: {
// 			email: request.body.email
// 		}
// 	}).then(function (user) {
// 		if (user !== null) {
// 			bcrypt.compare(request.body.password, user.password, function(err, res) {
//     			if (res == true) {
//     				request.session.user = user;
// 					response.redirect('account');
// 				}
// 				// bcrypt is hashing the password and making sure it is saved secure in my database.
// 				// the compare must between the whole bracket to make sure the password can be compared.
// 				// this cant be done with only bcrypt compare the password.
// 			})
// 			// console.log ('Whoop Whoop') 
// 			// test if a user is created
// 		} else {
// 			response.redirect('/?message=' + encodeURIComponent("Invalid email or password."));
// 			// if the users is not null (not undifined) and the password is the same as password
// 			//then it will be logged in else it will be redirected to index and told invalid password or email.
// 		}
// 	}, function (error) {
// 		response.redirect('/?message=' + encodeURIComponent("Invalid email or password."));
// 		// When everything goed wrong between server and database, the user will be told his email or password is invalid
// 		// This will be told instead of telling the telling the user something terrible went wrong 
// 	}) 
// })


// // this function will log a person out by destriying the session with the database.
// app.get('/logout', function (request, response) {
// 	request.session.destroy(function(error) {
// 		if(error) {
// 			throw error;
// 		}
// 		response.redirect('/?message=' + encodeURIComponent("Successfully logged out."));
// 	})

// });


// // CREATING A NEW USER IN THE DATABASE. 
// app.post('/sign', bodyParser.urlencoded({extended: true}) , function (request, response) {
// 	if (request.body.name.length === 0) {
// 			response.send('sign-up/?message=' + encodeURIComponent("Please fill out your name."))
// 			return
// 	}
// 	if(request.body.email.length === 0) {
// 		response.send('sign-up/?message=' + encodeURIComponent("Please fill out your email address."))
// 		return
// 	}

// 	if(request.body.password.length === 0) {
// 		response.send('sign-up/?message=' + encodeURIComponent("Please fill out your password."))
// 		return
// 	}
// 	// console.log (request.body.password )
// 		bcrypt.hash(request.body.password , 5, function(err, hash) {
// 	    	User.create( {
// 	            name: request.body.name,
// 	            email: request.body.email,
// 	            password: hash		
// 	        }).then ( register => {
//         	// console.log (request.body.password )
//         	response.redirect('/?message=' + encodeURIComponent('Your sign up went succesfull!'))
//         })
// 	})
// })



// Sync database
db.sync ( {force: true} ).then( () => {
	console.log ( 'Synced')
	// bcrypt.hash('1234', 5, function(err, hash) {
	// 	User.create ({
	// 		name: 'Jimmy',
	// 		email: 'jimmyvoskuil@msn.com',
	// 		password: hash
	// 	}).then (user => {
	// 		user.createSetting( {
	// 			setting: 'FillTHISin'
	// 		})
	// 	})
	// })
	// bcrypt.hash('1234', 5, function(err, hash) {	
	// 	User.create ({
	// 		name: 'Mentor',
	// 		email: 'mentor@gmail.com',
	// 		password: hash

	// 	}).then (user => {
	// 		user.createSetting( {
	// 			setting: 'FillTHISin'
	// 		})
	// 	})
	// })
}) 



// App will listen on 8000
app.listen(8000, () => {
    console.log( 'Server running' )
})




