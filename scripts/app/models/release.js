define(['backbone', 'underscore'], function(Backbone, _){
	return Backbone.Model.extend({

		releaseData: function(){
			var json = this.toJSON();

			_.each(json.labels, function(label){
				label.uri = '/' + label.name.replace(/[\/\s]/g, "-") + label.resource_url.split("api.discogs.com")[1];
			});

			_.each(json.images, function(image, index){
				if(index === 0){
					image.cssClass = 'front';
					json.imagesCssClass = '';
				}
				else if(index === 1){
					image.cssClass = 'back';
					json.imagesCssClass = 'flipContainer';
				}
			});

			return json;
		}

	});
});