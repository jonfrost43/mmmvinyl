define(['backbone', 'app/models/release'], function(Backbone, ReleaseModel){
	return Backbone.Collection.extend({
		model: ReleaseModel,
		vinylOnly: function(){
			return _.filter(this.toJSON(), function(release){
				return release.format.indexOf('LP') !== -1 || release.format.indexOf('12"') !== -1;
			});
		}
	});
});