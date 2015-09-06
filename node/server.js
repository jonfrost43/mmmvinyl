var http = require('http'),
	url = require('url'),
	port = process.env.port || 3000;

function init(route, handlers){

	var onRequest = function(request, response){
		var postData = '',
			pathname = url.parse(request.url).pathname,
			querystring = url.parse(request.url, true).query;

		//console.log('--Request for ' + pathname + ' received');

		request.setEncoding('utf8');

		request.addListener('data', function(postDataChunk){
			postData += postDataChunk;
			console.log("Received POST data chunk '" + postDataChunk + "'.");
		});

		request.addListener('end', function(){
			route(handlers, pathname, response, postData, querystring);
		});
	}

	http.createServer(onRequest).listen(port);
	console.log('server started at http://localhost:' + port);
}

exports.init = init;
