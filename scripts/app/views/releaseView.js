define([
	'backbone',
	'doT',
	'app/models/release',
	'text!templates/release.html',
	'app/collections/playlists',
	'app/views/addToPlaylistView'
], 
function(Backbone, doT, ReleaseModel, ReleaseTemplate, PlaylistsCollection, AddToPlaylistView){
	return Backbone.View.extend({
		releaseId: '',
		selectedTrackIndex: -1,
		tagName: 'div',
		attributes: {
			id: 'release'
		},
		events: {
			'click a.labelLink': 'goToLabel',
			'click a.addToPlaylist': 'togglePlaylistsDropdown',
			'submit #createNewPlaylist': 'createNewPlaylist',
			'touchend div.flipContainer': 'flipSleeve'
		},
		initialize: function(){
			console.log('release view init');
			this.getRelease(this.options.releaseId);
		},
		getRelease: function(releaseId){
			$.ajax({
				url: 'http://api.discogs.com/releases/' + releaseId,
				dataType: 'jsonp',
				success: _.bind(function(response){
					this.model = new ReleaseModel(response.data);
					this.render();
				}, this)
			});
		},
		render: function(){
			console.log(this.model.releaseData());
			var templateFnc = doT.template(ReleaseTemplate),
				html = templateFnc(this.model.releaseData());

			this.$el.append(html);
			$('#main').html(this.$el);
			$('#loadingMsg').hide();

			this.addToPlaylistView = new AddToPlaylistView();			
		},
		flipSleeve: function(e){
			this.$('.flipContainer').toggleClass('flipped');
		},
		goToLabel: function(e){
			e.preventDefault();
			Backbone.history.navigate(e.target.pathname, {trigger: true});
		},
		togglePlaylistsDropdown: function(e){
			e.preventDefault();
			
			var pos = $(e.target).position(),
				index = this.$('a.addToPlaylist').index(e.target);
			
			this.addToPlaylistView.$el.css({
				top: pos.top,
				left: pos.left + $(e.target).width()
			}).toggle(index !== this.selectedTrackIndex);
			
			this.selectedTrackIndex = this.selectedTrackIndex !== index ? index : -1;
		},
		createNewPlaylist: function(e){
			e.preventDefault();
			var playlistName = $(e.target).find('input[type=text]').val();
			if(!!playlistName){
				var playlists = new PlaylistsCollection();

				playlists.create({
					id: playlistName,
					name: playlistName,
					tracklist: [
						{
							artist: this.model.get('artists')[0].name,
							title: this.model.get('tracklist')[this.selectedTrackIndex].title							
						}
					]
				});
			}
		}
	});
});