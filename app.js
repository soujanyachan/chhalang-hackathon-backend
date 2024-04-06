/**
 * Module dependencies.
 */

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const errorHandler = require('errorhandler');

/**
 * Controllers (route handlers).
 */
const profile = require('./controllers/profile')
const user = require('./controllers/user')
const games = require('./controllers/games')
const friends = require('./controllers/friends')

/**
 * Create Express server.
 */
const app = express();
console.log(
  'Run this app using "npm start" to include sass/scss/css builds.\n'
);

/**
 * Express configuration.
 */

app.set('host', '0.0.0.0');
app.set('port', 3000);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

app.get('/health-check', function (req, res) {
  res.send('health')
})

app.use('/profile', profile)
app.use('/users', user)
app.use('/games', games)
app.use('/friends', friends)

/**
 * Error Handler.
 */
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  res.status(404).send("Page Not Found");
});

if (process.env.NODE_ENV === "development") {
  // only use in development
  app.use(errorHandler());
} else {
  app.use((err, req, res) => {
    console.error(err);
    res.status(500).send("Server Error");
  });
}

/**
 * Start Express server.
 */

app.listen(app.get('port'), () => {
  console.log(`App is running on http://localhost:${app.get('port')} in ${app.get('env')} mode.`);
  console.log('Press CTRL-C to stop.');

});
module.exports = app;
