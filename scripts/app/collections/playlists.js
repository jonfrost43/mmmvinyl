define([
	'backbone',
	'app/models/playlist',
	'localstorage'
], 
function(Backbone, PlaylistModel){
	return Backbone.Collection.extend({
		model: PlaylistModel,
		localStorage: new Backbone.LocalStorage('playlist')
	});
});