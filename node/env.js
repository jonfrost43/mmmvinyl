var environments = {

	local: {
		host: 'http://localhost:3000',
		mongoConnectionString: 'mongodb://localhost/mmmvinyl'
	},

	production: {
		host: 'https://mmmvinyl.herokuapp.com',
		mongoConnectionString: 'mongodb://mmmvinyl:MogwaiFear5atan@ds053080.mongolab.com:53080/heroku_rkqf49t7'
	}

};

module.exports = environments[process.env.NODE_ENV || 'local'];
