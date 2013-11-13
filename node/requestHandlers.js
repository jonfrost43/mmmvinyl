var fs = require('fs'),
	path = require('path'),
	database = require('./database'),
	discogsAuth = require('./discogsAuth');

exports.staticFile = function(pathname, response, postData){
	var filePath = '..' + pathname;
	if(filePath === '../'){
		filePath = '../index.html';
	}
	
	var extName = path.extname(filePath),
		contentType = 'text/html';
		
	switch(extName){
		case '.css':
			contentType = 'text/css';
			break;
		case '.js':
			contentType = 'text/javascript';
			break;
	}
	
	fs.exists(filePath, function(exists){
		if(!exists){
			filePath = '../index.html';
		}
		
		console.log('Request handler "staticFile" was called for ' + filePath);
		
		fs.readFile(filePath, function(error, content){
			if(error){
				console.log(filePath, error);
				response.writeHead(500);
				response.end();
			}
			else{
				response.writeHead(200, {'Content-Type': contentType+'; charset=utf-8'});
				response.end(content);
			}
		});
	});
}

exports.signin = function(pathname, response, postData){
	console.log('Request handler "signin" was called.');
	
	discogsAuth.signin({
		success: function(oauthToken){
			console.log('Success on getOAuthRequestToken');
			
			response.writeHead(302, {'Location': 'http://www.discogs.com/oauth/authorize?oauth_token='+oauthToken});
			response.end();
		},
		error: function(){
			console.log('An error happened on getOAuthRequestToken:');
			console.log(error);
			
			response.writeHead(200, {'Content-Type': 'text/plain'});
			response.end('There was an error trying to request a token on Discogs.com');
		}
	});
}

exports.signout = function(pathname, response, postData){
	console.log('Request handler "signout" was called.');
	discogsAuth.signout();
	discogsAuth.session = {};
	console.log(discogsAuth.session);
	response.writeHead(302, {'Location': '/'});
	response.end();
}

exports.signup = function(pathname, response, postData, querystring){
	console.log('Request handler "signup" was called.');
	var postObj = {},
		postArr = postData.split('&');

	for(var i=0, len=postArr.length; i<len; i++){
		postObj[postArr[i].split('=')[0]] = postArr[i].split('=')[1]
	};

	database.signup({
		username: postObj.username,
		password: postObj.password,
		success: function(){
			response.writeHead(200, {'Content-Type': 'text/plain'});
			response.end('signup successful');
		},
		error: function(){
			response.writeHead(200, {'Content-Type': 'text/plain'});
			response.end('signup failed');
		}
	});
}

exports.oauthCallback = function(pathname, response, postData, querystring){
	console.log('Request handler "oauthCallback" was called.');
	console.log(querystring);
	
	discogsAuth.signinCallback({
		oauthVerifier: querystring.oauth_verifier,
		success: function(){
			response.writeHead(302, {'Location': '/'});
			response.end();
		},
		error: function(){
			console.log('Error while getting the Access Token');

			response.writeHead(302, {'Location': '/'});
			response.end();
		}
	});
}

exports.identity = function(pathname, response, postData, querystring){
	console.log('Request handler "identity" was called.');
	console.log(discogsAuth.session);
	
	discogsAuth.getIdentity({
		oauthAccessToken: discogsAuth.session.accessToken, 
		oauthAccessTokenSecret: discogsAuth.session.accessTokenSecret,
		error: function(error){
			response.writeHead(error.statusCode, {'Content-Type': 'application/json'});
			response.end(error.data);
		},
		success: function(data){
			response.writeHead(200, {'Content-Type': 'application/json'});
			response.end(data);
		}
	});
	
}

exports.collection = function(pathname, response, postData, querystring){
	console.log('Request handler "collection" was called.');
	console.log(discogsAuth.session);
	
	discogsAuth.getCollection({
		username: discogsAuth.session.username,
		oauthAccessToken: discogsAuth.session.accessToken, 
		oauthAccessTokenSecret: discogsAuth.session.accessTokenSecret,
		error: function(error){
			response.writeHead(error.statusCode, {'Content-Type': 'application/json'});
			response.end(error.data);
		},
		success: function(data){
			response.writeHead(200, {'Content-Type': 'application/json'});
			response.end(data);
		}
	});
	
}
