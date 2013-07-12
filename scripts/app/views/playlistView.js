define([
	'backbone',
	'app/collections/playlist',
	'text!templates/playlist.html',
], 
function(Backbone, PlaylistCollection, PlaylistTemplate){
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
			this.getPlaylist(this.options.playlistId);
		},
		getPlaylist: function(playlistId){
			$.ajax({
				url: '/api/playlist/' + playlistId,
				dataType: 'json',
				success: _.bind(function(response){
					this.model = new PlaylistCollection(response.data);
					this.render();
				}, this)
			});
		},
		render: function(){
			console.log(this.collection.toJSON());
			var compiledTemplate = _.template(PlaylistTemplate, this.collection.toJSON());
			this.$el.append(compiledTemplate);
			$('#main').html(this.$el);
			$('#loadingMsg').hide();
		}
	});
});