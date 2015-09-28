var discogsAuth = require('./discogsAuth');

exports.identity = function(request, response){
	console.log('Request handler "identity" was called.');
	console.log(request.session);

	discogsAuth.getIdentity({
		oauthAccessToken: request.session.accessToken,
		oauthAccessTokenSecret: request.session.accessTokenSecret,
		error: function(error){
            response.status(error.statusCode || 500).send(error.data || 'Server error');
		},
		success: function(data){
			response.send(data);
		}
	});
}

exports.signin = function(request, response){
	console.log('Request handler "signin" was called.');

	discogsAuth.signin({
		success: function(oauthToken, oauthTokenSecret){
			console.log('Success on getOAuthRequestToken');

			request.session.oauthToken = oauthToken;
			request.session.oauthTokenSecret = oauthTokenSecret;

			response.redirect(302, 'http://www.discogs.com/oauth/authorize?oauth_token='+oauthToken);
		},
		error: function(error){
			console.log('An error happened on getOAuthRequestToken:');
			console.log(error);
			response.status(500).send('There was an error trying to request a token on Discogs.com');
		}
	});
}

exports.oauthCallback = function(request, response){
	console.log('Request handler "oauthCallback" was called.');
	console.log(request.query);

	discogsAuth.signinCallback({
		session: request.session,
		oauthVerifier: request.query.oauth_verifier,
		success: function(accessToken, accessTokenSecret, username, userId){
			request.session.accessToken = accessToken;
			request.session.accessTokenSecret = accessTokenSecret;
			request.session.username = username;
			request.session.userId = userId;

			response.redirect(302, '/');
		},
		error: function(error){
			console.log('Error while getting the Access Token');
			console.log(error);
			response.redirect(302, '/');
		}
	});
}

exports.signout = function(request, response){
	console.log('Request handler "signout" was called.');
	discogsAuth.signout();
	console.log(request.session);
	response.redirect(302, '/');
}

exports.collection = function(request, response){
	console.log('Request handler "collection" was called.');
	console.log(request.session);

	discogsAuth.getCollection({
		username: request.session.username,
		oauthAccessToken: request.session.accessToken,
		oauthAccessTokenSecret: request.session.accessTokenSecret,
		error: function(error){
			response.status(error.statusCode).json(error.data);
		},
		success: function(data){
			response.send(data);
		}
	});

}
