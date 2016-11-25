// Import necessary modules
const express    = require( 'express' )
const app        = express( )
const bodyParser = require( 'body-parser' )
const session    = require( 'express-session' )
const sequelize  = require( 'sequelize' )
const bcrypt 	 = require( 'bcrypt' )

//static will become default and overwrite /home
app.use( express.static( 'static' ) )

// Need this to use the middleware & sessions
app.use( bodyParser.urlencoded({ extended: true }))

app.use(session({
    secret: 'oh wow very secret much security',
    resave: true,
    saveUninitialized: false
}));


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

let Setting = db.define ( 'setting', {
	setting: sequelize.STRING
} )


// Define relations
User.hasMany( Setting )
Setting.belongsTo ( User )



// Set express routes
// Testing
app.get ('/', (req, res) => {
	console.log ('Index page loaded')
	res.render('index' , {
		message: req.query.message,
		user: req.session.user
	})
})


app.get( '/account', ( req, res ) => {
	console.log( 'pong' )
	res.render( 'account' )
		user: req.session.user
})


// NEW!!!
// Change password
app.get( '/settings', ( req, res ) => {
	console.log( 'changing password' )
	res.render( 'setting' )
})


// NEW!!!
// Change passwordform
app.post( '/settings', ( req, res ) => {
	User.findOne({
        where: { id: req.session.id }
    }).then( ( thisuser ) => {
        thisuser.bcrypt.compare(req.body.password, 5, (err, data) => {
        	if (err !== undefined) {
    			console.log(err);
	    	}   else {
			        // store it in the database
			        User.Update({
			 	        password: hash
			            })
		        }
    	})
        console.log( 'Password updated!' )
        res.redirect( '/settings' )
        })
})

// Send to backend
// Find user
// Check old password against db user 
// if match, update password (hash)


// Getting a user logged in
app.post('/login', bodyParser.urlencoded({extended: true}), function (request, response) {
	if(request.body.email.length === 0) {
		response.redirect('/?message=' + encodeURIComponent("Please fill out your email address."));
		return;
	}

	if(request.body.password.length === 0) {
		response.redirect('/?message=' + encodeURIComponent("Please fill out your password."));
		return;
	}
	// In the database we are looking for one-User which has the email that matches the email that was put in.
	User.findOne({
		where: {
			email: request.body.email
		}
	}).then(function (user) {
		if (user !== null) {
			bcrypt.compare(request.body.password, user.password, function(err, res) {
    			if (res == true) {
    				request.session.user = user;
					response.redirect('account');
				}
				// bcrypt is hashing the password and making sure it is saved secure in my database.
				// the compare must between the whole bracket to make sure the password can be compared.
				// this cant be done with only bcrypt compare the password.
			})
			// console.log ('Whoop Whoop') 
			// test if a user is created
		} else {
			response.redirect('/?message=' + encodeURIComponent("Invalid email or password."));
			// if the users is not null (not undifined) and the password is the same as password
			//then it will be logged in else it will be redirected to index and told invalid password or email.
		}
	}, function (error) {
		response.redirect('/?message=' + encodeURIComponent("Invalid email or password."));
		// When everything goed wrong between server and database, the user will be told his email or password is invalid
		// This will be told instead of telling the telling the user something terrible went wrong 
	}) 
})


// this function will log a person out by destriying the session with the database.
app.get('/logout', function (request, response) {
	request.session.destroy(function(error) {
		if(error) {
			throw error;
		}
		response.redirect('/?message=' + encodeURIComponent("Successfully logged out."));
	})

});


// CREATING A NEW USER IN THE DATABASE. 
app.post('/sign', bodyParser.urlencoded({extended: true}) , function (request, response) {
	if (request.body.name.length === 0) {
			response.send('sign-up/?message=' + encodeURIComponent("Please fill out your name."))
			return
	}
	if(request.body.email.length === 0) {
		response.send('sign-up/?message=' + encodeURIComponent("Please fill out your email address."))
		return
	}

	if(request.body.password.length === 0) {
		response.send('sign-up/?message=' + encodeURIComponent("Please fill out your password."))
		return
	}
	// console.log (request.body.password )
		bcrypt.hash(request.body.password , 5, function(err, hash) {
	    	User.create( {
	            name: request.body.name,
	            email: request.body.email,
	            password: hash		
	        }).then ( register => {
        	// console.log (request.body.password )
        	response.redirect('/?message=' + encodeURIComponent('Your sign up went succesfull!'))
        })
	})
})

// Sync database
db.sync ( {force: true} ).then( () => {
	console.log ( 'Synced')
	bcrypt.hash('1234', 5, function(err, hash) {
		User.create ({
			name: 'Jimmy',
			email: 'jimmyvoskuil@msn.com',
			password: hash
		}).then (user => {
			user.createSetting( {
				setting: 'FillTHISin'
			})
		})
	})
	bcrypt.hash('1234', 5, function(err, hash) {	
		User.create ({
			name: 'Mentor',
			email: 'mentor@gmail.com',
			password: hash

		}).then (user => {
			user.createSetting( {
				setting: 'FillTHISin'
			})
		})
	})
}) 


// Account


// App will listen on 8000
app.listen(8000, () => {
    console.log( 'Server running' )
})