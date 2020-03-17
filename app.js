/*eslint-env node*/

//------------------------------------------------------------------------------
// node.js sso sample code
// 
//   
//------------------------------------------------------------------------------

// This application uses express as its web server
// for more info, see: http://expressjs.com
var express = require('express');

// START OF CHANGE

var session = require('express-session');
var passport = require('passport');
var cookieParser = require('cookie-parser');
var fs = require('fs');
var https = require('https');
// END OF CHANGE

//timestamp to get the timestamp of the login
var timestamp = require('time-stamp');
//path to determine the dirname
var path = require('path');
//for getting ratings

//pg --postgresql
//var db = require('pg')

// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');

// read settings.js
var settings = require('./settings.js');

// work around intermediate CA issue
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"

// create a new express server
var app = express();
var firstname;
var id;
var time;
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// Uncomment the following section if running locally
https.createServer({
        key: fs.readFileSync('key.pem'),
        cert: fs.readFileSync('certificate.pem')
}, app).listen(9000);

// START OF CHANGE
app.use(cookieParser());
app.use(session({resave: 'true', saveUninitialized: 'true' , secret: 'keyboard cat'}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
	done(null, user);
});

passport.deserializeUser(function(obj, done) {
	done(null, obj);
});

var OpenIDConnectStrategy = require('passport-idaas-openidconnect').IDaaSOIDCStrategy;
var Strategy = new OpenIDConnectStrategy({
        authorizationURL : settings.authorization_url,
        tokenURL : settings.token_url,
        clientID : settings.client_id,
        scope: 'openid',
        response_type: 'code',
        clientSecret : settings.client_secret,
        skipUserProfile: true,
        issuer: settings.issuer_id,
        addCACert: true,
        callbackURL: settings.callback_url,
        CACertPathList: [
        '/oidc_w3id_staging.cer',
        '/DigiCertGlobalRootCA.crt',
        '/DigiCertSHA2SecureServerCA.crt']
        },
        function(iss, sub, profile, accessToken, refreshToken, params, done)  {
                process.nextTick(function() {
                        profile.accessToken = accessToken;
                        profile.refreshToken = refreshToken;
                        done(null, profile);
                })
        }
)

passport.use(Strategy);

//var dbConnection = "postgressql://postgres:sherinte_2020@localhost:5432/weather-admin";
const {Client} = require("pg");
const connectionString = 'postgressql://postgres:Afrid@Fayaz1@localhost:5432/postgres'
const client=new Client({
    connectionString:connectionString
     })
    client.connect()


app.get('/', function(req, res) {
        res.send('<head><link rel="stylesheet" href="font/Rimouski.css"><link rel="stylesheet" href="style2.css" id="style2"></head><div class="login"><center><h2>WELCOME TO THE WEATHER APPLICATION</h2><p></p><a href="/hello"><button type="submit"><img src="assets/w3logo.png" alt="IBM w3ID logo" style="float:left;width:30px;height:30px;"></img>Sign in with your IBM w3ID</button></a><br/></div>');
});
//<h2>Welcome</h2><br/><a href="/hello"><button type="submit">Login using your W3 Id</button></a><br/>'+'<a href="/">home</a>');
app.get('/login', passport.authenticate('openidconnect', {}));

function ensureAuthenticated(req, res, next) {
	if (!req.isAuthenticated()) {
	        req.session.originalUrl = req.originalUrl;
		res.redirect('/login');
	} else {
		return next();
	}
}

// handle callback, if authentication succeeds redirect to
// original requested url, otherwise go to /failure
app.get('/oidc_callback',function(req, res, next) {
	var redirect_url = req.session.originalUrl;
	passport.authenticate('openidconnect', {
		successRedirect: redirect_url,
		failureRedirect: '/failure',
	})(req,res,next);
});

// failure page
app.get('/failure', function(req, res) {
	res.send('login failed'); });
app.get('/hello', ensureAuthenticated, function(req, res) {
        claims = req.user['_json'];
        //console.log(claims);
        //Get the username,timestamp and the employee id
        firstname=claims.firstName.replace(/%20/g, " ");
        time=timestamp('YYYY-MM-DD HH:mm:ss');
       // console.log(time);
        id=claims.uid.replace('744','');
        if(claims.emailAddress==='haiinte@in.ibm.com')
        {
                
                console.log("From the if part");
                //console.log(claims.emailAddress);
                client.query('select * from feedback',(err,result)=>{
                        res.render('dashboard.ejs',{ users:result});
                         
                     })
        }
        else{
                   
                               res.redirect("../index.html");
                
        }
        /*var html ="<p>Hello " + claims.emailAddress.replace("%20", " ") + ": </p>";
        html += "<pre>" + JSON.stringify(req.user, null, 4) + "</pre>";
        html += "<hr> <a href=\"/\">home</a>";        
        res.send(html);
        console.log(claims);*/
});

app.post('/weather.html', function (req, res) {
        // Prepare output in JSON format
        var feed=req.body.feedbar;
        var star1=req.body.starbar;
        
        if(feed!='' & star1!=0)
        {
                
                        client.query ("insert into feedback values($1,$2,$3,$4,$5);",[firstname,feed,star1,id,time])
                        
              
        }
        res.redirect("../index.html");
     })

// END OF CHANGE

// serve the files out of ./public as our main files

app.use(express.static(path.join(__dirname,'/afrid')));


//app.use(express.static(__dirname + '/www'));


// get the app environment from Cloud Foundry
// Comment out following line if running locally
// var appEnv = cfenv.getAppEnv();

// start server on the specified port and binding host
// Comment out following line if running locally
// app.listen(appEnv.port, function() {

// // print a message when the server starts listening
//   console.log("server starting on " + appEnv.url);
// });
