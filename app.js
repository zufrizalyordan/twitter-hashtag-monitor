var twitter = require('ntwitter'),
  	credentials = require('./credentials.js'),
  	express = require('express'),
  	app = express(),
  	server = require('http').createServer(app),
  	io = require('socket.io').listen(server);

var t = new twitter({
	consumer_key: credentials.consumer_key,
	consumer_secret: credentials.consumer_secret,
	access_token_key: credentials.access_token_key,
	access_token_secret: credentials.access_token_secret
});

app.get('/', function (req, res) {
	res.sendfile(__dirname + '/index.html');
});

server.listen(3000);

io.sockets.on('connection', function (socket) {

	console.log('SOCKET CONNECTED\n');
	var track_item = '#zy';
	t.stream(
		'statuses/filter',
		{ track: [track_item] },
		function(stream) {
			stream.on('data', function(tweet) {
				if(tweet.text.match(track_item)) {
					socket.emit('tweets', { detail: tweet });
				}
			});
		}
	);

});