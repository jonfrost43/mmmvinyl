define(['backbone'], function(Backbone){
	return Backbone.Model.extend({
		defaults: {
			name: 'My new playlist',
			tracklist: []
		}
	});
});