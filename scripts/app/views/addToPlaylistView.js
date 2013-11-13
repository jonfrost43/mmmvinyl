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
		track: null,
		events: {
			'submit #createNewPlaylist': 'createNewPlaylist',
			'click a.playlist': 'addToPlaylist'
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
		},
		createNewPlaylist: function(e){
			e.preventDefault();
			var playlistName = $(e.target).find('input[type=text]').val();
			if(!!playlistName && !!this.track){
				this.collection.create({
					id: playlistName,
					name: playlistName,
					tracklist: [this.track]
				}, {
					success: function(){
						Backbone.history.navigate('/playlist/'+playlistName, {trigger: true});						
					}
				});
			}
		},
		addToPlaylist: function(e){
			e.preventDefault();

			var playlist = this.collection.get(e.target.innerHTML),
				tracklist = playlist.get('tracklist');

			tracklist.push(this.track);

			playlist.save({
				'tracklist': tracklist
			});
			
			Backbone.history.navigate(e.target.pathname, {trigger: true});
		}
	});
});
