define([
	'backbone',
	'underscore',
	'doT',
	'app/collections/playlists',
	'text!templates/addToPlaylist.html'
], 
function(Backbone, _, doT, PlaylistsCollection, addToPlaylistTemplate){
	return Backbone.View.extend({
		tagName: 'div',
		attributes: {
			id: 'trackOptionsDropdown'
		},
		events: {
		},
		initialize: function(){
			this.collection = new PlaylistsCollection();
			this.collection.fetch({
				success: _.bind(function(response){
					this.render();
				}, this)
			});
		},
		render: function(){
			var templateFnc = doT.template(addToPlaylistTemplate),
				html = templateFnc({playlists: this.collection.toJSON()});

			this.$el.append(html);
			$('#release').append(this.$el);
		}
	});
});
