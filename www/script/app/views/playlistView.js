define([
	'jquery',
	'backbone',
	'underscore',
	'doT',
	'app/models/playlist',
	'app/collections/playlists',
	'text!templates/playlist.html',
], 
function($, Backbone, _, doT, PlaylistModel, PlaylistsCollection, PlaylistTemplate){
	return Backbone.View.extend({
		playlistId: '',
		tagName: 'div',
		attributes: {
			id: 'playlist'
		},
		events: {
			'click button.remove': 'removeTrack',
			'click button.moveUp': 'moveTrackUp',
			'click button.moveDown': 'moveTrackDown'
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

			this.$el.html(html);
			$('#main').html(this.$el);
			$('#loadingMsg').hide();
			this.delegateEvents();
		},
		moveTrackUp: function(e){
			var newTracklist = this.model.get('tracklist'),
				trackIndex = $(e.target).parent().index(),
				track = newTracklist.splice(trackIndex, 1)[0];

			newTracklist.splice(trackIndex-1, 0, track);

			this.model.save({
				tracklist: newTracklist
			}, {
				success: _.bind(this.render, this)
			});
		},
		moveTrackDown: function(e){
			var newTracklist = this.model.get('tracklist'),
				trackIndex = $(e.target).parent().index(),
				track = newTracklist.splice(trackIndex, 1)[0];

			newTracklist.splice(trackIndex+1, 0, track);

			this.model.save({
				tracklist: newTracklist
			}, {
				success: _.bind(this.render, this)
			});
		},
		removeTrack: function(e){
			var newTracklist = this.model.get('tracklist'),
				trackIndex = $(e.target).parent().index();

			newTracklist.splice(trackIndex, 1);

			this.model.save({
				tracklist: newTracklist
			}, {
				success: _.bind(this.render, this)
			});
		}
	});
});