// Import necessary modules
const express    = require( 'express' )

const app        = express( )

const bodyParser = require( 'body-parser' )

const session    = require( 'express-session' )

const sequelize  = require( 'sequelize' )

const db         = new sequelize( 'postgres://' + process.env.POSTGRES_USER + '@localhost/nest' );


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