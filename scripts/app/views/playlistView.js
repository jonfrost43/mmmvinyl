define([
	'backbone',
	'underscore',
	'doT',
	'app/models/playlist',
	'app/collections/playlists',
	'text!templates/playlist.html',
], 
function(Backbone, _, doT, PlaylistModel, PlaylistsCollection, PlaylistTemplate){
	return Backbone.View.extend({
		playlistId: '',
		tagName: 'div',
		attributes: {
			id: 'playlist'
		},
		events: {
		},
		initialize: function(){
			console.log('playlist view init');
			this.collection = new PlaylistsCollection();
			this.getPlaylist(this.options.playlistId);
		},
		getPlaylist: function(playlistId){
			this.collection.fetch({
				success: _.bind(function(response){
					this.model = response.get(playlistId);
					this.render();
				}, this)
			});
		},
		render: function(){
			console.log(this.model.toJSON());

			var templateFnc = doT.template(PlaylistTemplate),
				html = templateFnc(this.model.toJSON());

			this.$el.append(html);
			$('#main').html(this.$el);
			$('#loadingMsg').hide();
		}
	});
});