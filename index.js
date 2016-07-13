/* eslint-env node, mocha */
var HEROKU_TIMEOUT = 2000;
var HEROKU_URL = 'http://prod-kapgel-manager.herokuapp.com/ping';
var HEROKU_TEST_PERIOD = 10000;

var request = require('request');
var exec = require('exec');
var options = {
  url: HEROKU_URL,
  timeout: HEROKU_TIMEOUT
};

function ping() {
  request(options, function handler(err, resp, body) { // eslint-disable-line no-unused-vars
    console.log(err); // eslint-disable-line no-console
    if (err) {
      exec([
        'heroku',
        'ps:restart',
        '-a',
        'HEROKU_APP_NAME'
      ],
          function execHandler(errExec, out, code) {
            if (errExec instanceof Error) {
              throw errExec;
            }
            process.stderr.write(err);
            process.stdout.write(out);
            process.exit(code);
          });
    }
    setTimeout(ping, HEROKU_TEST_PERIOD);
  });
}

ping();
