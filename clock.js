//require all the modules needed
const express = require ("express")
const bodyParser = require('body-parser');
const Sequelize = require('Sequelize');
const app = express()

//connecting to the database
const database = new Sequelize('timer', 'postgres', 'falafeldragon', {
	host: 'localhost',
	dialect: 'postgres'
})

//setting the view engine to read from views and read pug
app.set("view engine", "pug")
app.set("views", __dirname + "/views")

// tell express to use the static folder
app.use(express.static('static'))
app.use(bodyParser.urlencoded({ extended: true }))

// purely for test purposes
app.get("/ping", (req, res) => {
	
	res.send("I am the master of the Goat tower ")
})




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
			console.log( "time to say hello")
		}
		else {
			console.log("no time like this in the database")
		}
	})


})

///////////////////////////////////////////
/*THIS SECTION IS WHERE I DEFINE MY MODELS AND SYNC MY DATABASE */
///////////////////////////////////////////

// Defining a  model for the user this will create a table in the existing database
let User = database.define('user', {
	username: Sequelize.STRING,
	password: Sequelize.STRING
	
})

//defining a model for the user set time
let SetTime = database.define('settime', {
	settime: Sequelize.STRING

})

//syncing the database 
database.sync({force: true}).then( ( ) => {
	console.log("database synced and ready to go")

	User.create ({
		username: "NoMadBunny",
		password: "one",
		
	// }).then(user => {
	// 	user.createSetTime({
	// 		settime: "13:00"
	// 	})
	// })

})
})
//Make the server listen on part 1337
app.listen(1337, ( ) => {
	console.log("Server running on port 1377")
})