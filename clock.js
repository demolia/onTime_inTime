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
app.get("/", (req, res) => {

	res.render("index")
})


app.post("/index", (req, res) => {

	console.log(typeof req.body.setTime)

	SetTime.create ({
		settime: req.body.time
		
	}).then( () => {
		console.log(req.body.time)
		res.redirect('/')
	})


})

app.post("/currenttime", (req, res) => {

	console.log(req.body.time)

	res.send("send me thousands of responses please")



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
		
	})

	SetTime.create ({
		settime: '12:00:00',
		userId: 1,
	})

})
//Make the server listen on part 1337
app.listen(1337, ( ) => {
	console.log("Server running on port 1377")
})