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

app.listen(app.get("port"), () => {
  const { BASE_URL } = process.env;
  const colonIndex = BASE_URL.lastIndexOf(":");
  const port = parseInt(BASE_URL.slice(colonIndex + 1), 10);

  if (!BASE_URL.startsWith("http://localhost")) {
    console.log(
      `The BASE_URL env variable is set to ${BASE_URL}. If you directly test the application through http://localhost:${app.get(
        "port"
      )} instead of the BASE_URL, it may cause a CSRF mismatch or an Oauth authentication failur. To avoid the issues, change the BASE_URL or configure your proxy to match it.\n`
    );
  } else if (app.get("port") !== port) {
    console.warn(
      `WARNING: The BASE_URL environment variable and the App have a port mismatch. If you plan to view the app in your browser using the localhost address, you may need to adjust one of the ports to make them match. BASE_URL: ${BASE_URL}\n`
    );
  }

  console.log(
    `App is running on http://localhost:${app.get("port")} in ${app.get(
      "env"
    )} mode.`
  );
  console.log("Press CTRL-C to stop.");
  });
});

module.exports = app;
