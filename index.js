/* eslint-env node, mocha */
var request = require('request');
var exec = require('exec');
var process = require('process');
var HEROKU_TIMEOUT = 2000;
var HEROKU_APP_NAME = process.env.HEROKU_APP_NAME;
var HEROKU_URL = 'http://'+ HEROKU_APP_NAME + '.herokuapp.com/ping';
console.log(HEROKU_URL); //eslint-disable-line no-console
var HEROKU_TEST_PERIOD = 10000;

var options = {
  url: HEROKU_URL,
  timeout: HEROKU_TIMEOUT
};

function ping() {
  request(options, function handler(err, resp, body) { //eslint-disable-line no-unused-vars
    console.log(err); //eslint-disable-line no-console
    if (err) {
      exec([
        'heroku',
        'ps:restart',
        '-a',
        HEROKU_APP_NAME
      ],
          function execHandler(errExec, out, code) {
            if (errExec instanceof Error) {
              throw errExec;
            }
            process.stderr.write(errExec);
            process.stdout.write(out);
          });
    }
    setTimeout(ping, HEROKU_TEST_PERIOD);
  });
}

ping();
var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, res) {
    res.send('Hello World!');
});

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});

