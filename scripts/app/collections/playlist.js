define(['backbone', 'app/models/track'], function(Backbone, TrackModel){
	return Backbone.Collection.extend({
		model: TrackModel
	});
});