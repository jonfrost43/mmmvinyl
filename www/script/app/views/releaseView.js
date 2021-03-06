define([
	'backbone',
	'doT',
	'app/discogs',
	'app/models/release',
	'text!templates/release.html',
	'app/collections/playlists',
	'app/views/addToPlaylistView'
],
function(Backbone, doT, discogs, ReleaseModel, ReleaseTemplate, PlaylistsCollection, AddToPlaylistView){

	return Backbone.View.extend({
		releaseId: '',
		selectedTrackIndex: -1,
		tagName: 'div',

		attributes: {
			id: 'release'
		},

		events: {
			'click a.labelLink': 'goToLabel',
			'click button.addToPlaylist': 'togglePlaylistsDropdown',
			'touchend div.flipContainer': 'flipSleeve'
		},

		initialize: function(){
			console.log('release view init');
			this.getRelease(this.options.releaseId);
		},

		getRelease: function(releaseId){
			$.ajax({
				url: discogs.baseUrl + '/releases/' + releaseId,
				dataType: 'jsonp',
				data: {
					token: discogs.authToken
				},
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
			Backbone.history.navigate(e.currentTarget.pathname, {trigger: true});
		},

		togglePlaylistsDropdown: function(e){
			e.preventDefault();

			var $parent = $(e.target).parent(),
				index = this.$('button.addToPlaylist').index(e.target),
				track;

			this.addToPlaylistView.$el
				.appendTo($parent)
				.toggle(index !== this.selectedTrackIndex);

			this.selectedTrackIndex = this.selectedTrackIndex !== index ? index : -1;

			if(this.selectedTrackIndex !== -1){
				track = this.model.getTrack(this.selectedTrackIndex);

				this.addToPlaylistView.track = {
					artist: this.model.getArtistName(track.artists),
					title: this.model.getTrackName(this.selectedTrackIndex)
				}
			}
		}
	});
});
