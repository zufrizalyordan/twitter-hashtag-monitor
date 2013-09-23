var twitter = require('ntwitter'),
    credentials = require('./credentials.js'),
    express = require('express'),
    app = express(),
    server = require('http').createServer(app);

var t = new twitter({
    consumer_key: credentials.consumer_key,
    consumer_secret: credentials.consumer_secret,
    access_token_key: credentials.access_token_key,
    access_token_secret: credentials.access_token_secret
});

app.get('/', function (req, res) {
  res.send('Express running.');
});

server.listen(3000);

var track_item = '#android';
t.stream(
  'statuses/filter',
  { track: [track_item] },
  function(stream) {
    stream.on('data', function(tweet) {
        //if #hashtag is in the tweet text, emit via socket io
        if(tweet.text.match(track_item)) {
            console.log(tweet.text);
        }
    });
  }
);