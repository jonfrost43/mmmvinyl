define([
	'backbone',
	'app/collections/releases',
	'text!templates/label.html',
], 
function(Backbone, ReleasesCollection, LabelTemplate){
	return Backbone.View.extend({
		labelId: '',
		tagName: 'div',
		attributes: {
			id: 'label'
		},
		events: {
			'click a': 'goToRelease'
		},
		initialize: function(){
			console.log('label view init');
			this.getLabelReleases(this.options.labelId);
		},
		getLabelReleases: function(labelId){
			$.ajax({
				url: 'http://api.discogs.com/labels/' + labelId + '/releases',
				dataType: 'jsonp',
				success: _.bind(function(response){
				console.log(response);
					this.collection = new ReleasesCollection(response.data.releases);
					this.render();
				}, this)
			});
		},
		render: function(){
			console.log(this.collection.vinylOnly());
			var compiledTemplate = _.template(LabelTemplate, {releases: this.collection.vinylOnly()});
			this.$el.append(compiledTemplate);
			$('#main').html(this.$el);
			$('#loadingMsg').hide();
		},
		goToRelease: function(e){
			e.preventDefault();
			Backbone.history.navigate(e.target.pathname, {trigger: true});
		}
	});
});