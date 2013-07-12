define([
	'backbone',
	'app/models/release',
	'text!templates/release.html',
], 
function(Backbone, ReleaseModel, ReleaseTemplate){
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
			console.log(this.model.toJSON());
			var compiledTemplate = _.template(ReleaseTemplate, this.model.toJSON());
			this.$el.append(compiledTemplate);
			$('#main').html(this.$el);
			$('#loadingMsg').hide();
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
			
			this.$('#trackOptionsDropdown').css({
				top: pos.top,
				left: pos.left + $(e.target).width()
			}).toggle(index !== this.selectedTrackIndex);
			
			this.selectedTrackIndex = this.selectedTrackIndex !== index ? index : -1;
		},
		createNewPlaylist: function(e){
			e.preventDefault();		
		}
	});
});