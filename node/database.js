var mongoose = require('mongoose'),
	db,
	userSchema,
	User;

var init = function(){
	db = mongoose.createConnection('mongodb://localhost/test');

	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function callback(){
		console.log('db open');
		
		userSchema = new mongoose.Schema({
			username: String,
			discogsId: Number
		});
		
		User = db.model('User', userSchema);
	});
}

var addUser = function(opts){
	console.log('add user to db');
	
	User.find({username: opts.username}, function(err, users){
		if(!users.length){
			var user = new User({
				username: opts.username, 
				discogsId: opts.discogsId
			});
			
			user.save(function (err, user) {
				if(!err && typeof opts.success === 'function'){
					opts.success();
				}
			});
		}
		else{
			if(typeof opts.error === 'function'){
				opts.error();
			}
		}
	});
}

exports.init = init;
exports.addUser = addUser;
