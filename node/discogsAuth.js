var OAuth = require('oauth').OAuth,
	env = require('./env')/*,
	database = require('./database')*/;

var baseUrl = 'https://api.discogs.com',
	consumerKey = 'yXcHeGpsInupapEgdmBG',
	consumerSecret = 'lKEQkcWxJpnfvUrivvYdrzExZfzNReZQ',
	appBaseUrl = env.host,
	oa = new OAuth(
		baseUrl + '/oauth/request_token',
		baseUrl + '/oauth/access_token',
		consumerKey,
		consumerSecret,
		'1.0',
		appBaseUrl + '/oauth/callback',
		'HMAC-SHA1'
	);

exports.signin = function(args){
	oa.getOAuthRequestToken(function(error, oauthToken, oauthTokenSecret, results){
		if(error){
			args.error();
		}
		else{
			args.success(oauthToken, oauthTokenSecret);
		}
	});
}

exports.signout = function(args){
	//clear session
}

exports.signinCallback = function(args){
	oa.getOAuthAccessToken(args.session.oauthToken, args.session.oauthTokenSecret, args.oauthVerifier,
		function(error, oauthAccessToken, oauthAccessTokenSecret, results){
			if(error){
				args.error();
			}
			else{
				getIdentity({
					oauthAccessToken: oauthAccessToken,
					oauthAccessTokenSecret: oauthAccessTokenSecret,
					success: function(data){
						data = JSON.parse(data);

						args.success(oauthAccessToken, oauthAccessTokenSecret, data.username, data.id);

/*						database.addUser({
							username: data.username,
							discogsId: data.id
						});
*/					}
				});

			}
		}
	);
}

function getIdentity(args){
	oa.get(baseUrl + '/oauth/identity', args.oauthAccessToken, args.oauthAccessTokenSecret, function(error, data, response){
		if(error){
			if(typeof args.error === 'function'){
				args.error(error);
			}
		}
		else{
			if(typeof args.success === 'function'){
				args.success(data);
			}
		}
	});
}
function getCollection(args){
	oa.get(baseUrl + '/users/' + args.username + '/collection/folders/0/releases?sort=added&sort_order=desc', args.oauthAccessToken, args.oauthAccessTokenSecret, function(error, data, response){
		if(error){
			if(typeof args.error === 'function'){
				args.error(error);
			}
		}
		else{
			if(typeof args.success === 'function'){
				args.success(data);
			}
		}
	});
}

exports.getIdentity = getIdentity;
exports.getCollection = getCollection;
