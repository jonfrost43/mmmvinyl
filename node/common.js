module.exports = {

	development: {
		baseUrl: 'http://localhost:3000',
		mongoConnectionString: 'mongodb://localhost/mmmvinyl'
	},

	production: {
		baseUrl: 'https://mmmvinyl.herokuapp.com',
		mongoConnectionString: 'mongodb://mmmvinyl:MogwaiFear5atan@ds053080.mongolab.com:53080/heroku_rkqf49t7'
	}

};
