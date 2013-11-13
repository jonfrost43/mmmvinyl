var server = require('./server'),
	router = require('./router'),
	requestHandlers = require('./requestHandlers')/*,
	database = require('./database')*/;
	
var handlers = {
	'/*': requestHandlers.staticFile,
	'/api/identity': requestHandlers.identity,
	'/api/collection': requestHandlers.collection,
	'/api/signup': requestHandlers.signup,
	'/signin': requestHandlers.signin,
	'/signout': requestHandlers.signout,
	'/oauth/callback': requestHandlers.oauthCallback
};

server.init(router.route, handlers);
//database.init();