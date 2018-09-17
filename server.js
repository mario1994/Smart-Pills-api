const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session')
const cors = require('cors');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
const debug = require('debug')('my-namespace')


const app = express();

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 3600000,secure: false, httpOnly: true }
}))

app.use(cookieParser()); // read cookies (needed for auth)
app.use(flash());
app.use(bodyParser.json())
app.use(cors());

require('./app/endpoints.js')(app);

app.listen(3100,() => {
	console.log('app is running on port 3100');
});