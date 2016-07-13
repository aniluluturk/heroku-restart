#!/bin/sh
echo "Start heroku client installation";
curl -s https://s3.amazonaws.com/assets.heroku.com/heroku-client/heroku-client.tgz | tar xz
mv heroku-client/* .
rmdir heroku-client
PATH="bin:$PATH"

heroku <<< $'HEROKU_USERNAME\nHEROKU_PASSWORD\n'
node index.js;
