define(['backbone', 'app/models/release'], function(Backbone, ReleaseModel){
	return Backbone.Collection.extend({
		model: ReleaseModel,

		vinyl: function(releases){
			releases = releases || this.toJSON();

			return _.filter(releases, function(release){
				return release.format.indexOf('LP') !== -1 || release.format.indexOf('12"') !== -1;
			});
		},

		searchList: function(){
			var urlParts = window.location.pathname.split('/'),
				path = '/' + urlParts[1] + '/' + urlParts[2] + '/';

			return {
				data: this.toJSON(),
				path: path,
				query: decodeURIComponent(urlParts[2])
			};
		},

		labelList: function(){
			var releases = this.toJSON();

			_.each(releases, function(release){
				release.uri = '/' + release.artist.replace(/[\/\s]/g, '-') + '-' + release.title.replace(/[\/\s]/g, '-') + '/release' + release.resource_url.split('releases')[1];
			});

			return this.vinyl(releases);
		}
	});
});
