var request = require('request');
var options = {
url:  'http://HEROKU_APP_URL/ping',
    timeout: 2000
};
var exec = require('exec');

var ping = function (){
request(options, function(err, resp, body) { 
console.log(err); 
setTimeout(ping, 10000);
if(err) {
exec(['heroku', 'ps:restart', '-a', 'HEROKU_APP_NAME'], function(err, out, code) {
  if (err instanceof Error)
    console.log(err);
  process.stderr.write(err);
  process.stdout.write(out);
});
}
});
}

ping();
