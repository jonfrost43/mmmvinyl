var OAuth = require('oauth').OAuth/*,
	database = require('./database')*/;

var oauthSession = {},
	consumerKey = 'yXcHeGpsInupapEgdmBG',
	consumerSecret = 'lKEQkcWxJpnfvUrivvYdrzExZfzNReZQ',
	oa = new OAuth(
		'http://api.discogs.com/oauth/request_token',
		'http://api.discogs.com/oauth/access_token',
		consumerKey,
		consumerSecret,
		'1.0',
		'http://localhost:8125/oauth/callback',
		'HMAC-SHA1'
	);

exports.signin = function(args){
	oa.getOAuthRequestToken(function(error, oauthToken, oauthTokenSecret, results){
		if(error){
			args.error();
		}
		else{
			oauthSession.token = oauthToken;
			oauthSession.tokenSecret = oauthTokenSecret;
			
			args.success(oauthToken);
		}
	});
}

exports.signout = function(args){
	oauthSession = {};
}

exports.signinCallback = function(args){
	oa.getOAuthAccessToken(oauthSession.token, oauthSession.tokenSecret, args.oauthVerifier, 
		function(error, oauthAccessToken, oauthAccessTokenSecret, results){
			if(error){
				oauthSession = {};
				args.error();
			}
			else{
				oauthSession.accessToken = oauthAccessToken;
				oauthSession.accessTokenSecret = oauthAccessTokenSecret;
				
				getIdentity({
					oauthAccessToken: oauthAccessToken,
					oauthAccessTokenSecret: oauthAccessTokenSecret,
					success: function(data){
						data = JSON.parse(data);
						
						oauthSession.username = data.username;
						oauthSession.discogsId = data.id;
						
/*						database.addUser({
							username: data.username,
							discogsId: data.id
						});					
*/					}
				});
				
				args.success();
			}
		}
	);
}

function getIdentity(args){
	oa.get('http://api.discogs.com/oauth/identity', args.oauthAccessToken, args.oauthAccessTokenSecret, function(error, data, response){
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
	oa.get('http://api.discogs.com/users/'+args.username+'/collection/folders/0/releases', args.oauthAccessToken, args.oauthAccessTokenSecret, function(error, data, response){
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

exports.session = oauthSession;
exports.getIdentity = getIdentity;
exports.getCollection = getCollection;
