function route(handlers, pathname, response, postData, querystring){
	if(typeof handlers[pathname] === 'function'){
		return handlers[pathname](pathname, response, postData, querystring);
	}
	else{
		return handlers['/*'](pathname, response, postData, querystring);
	}
}

exports.route = route;