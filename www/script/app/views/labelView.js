define([
	'backbone',
	'doT',
	'app/discogs',
	'app/collections/releases',
	'text!templates/label.html',
],
function(Backbone, doT, discogs, ReleasesCollection, LabelTemplate){

	return Backbone.View.extend({
		labelId: '',
		page: '1',
		tagName: 'div',

		attributes: {
			id: 'label'
		},

		events: {
			'click a': 'goToRelease'
		},

		initialize: function(){
			console.log('label view init');
			this.getLabelReleases(this.options.labelId, this.options.page);
		},

		getLabelReleases: function(labelId, page){
			$.ajax({
				url: discogs.baseUrl + '/labels/' + labelId + '/releases',
				dataType: 'jsonp',
				data: {
					page: page,
					per_page: 20,
					token: discogs.authToken
				},
				success: _.bind(function(response){
					console.log(response);
					this.collection = new ReleasesCollection(response.data.releases);
					this.render();
				}, this)
			});
		},

		render: function(){
			console.log(this.collection.toJSON());
			console.log(this.collection.labelList());
			var templateFnc = doT.template(LabelTemplate)
				html = templateFnc({releases: this.collection.labelList()});

			this.$el.append(html);
			$('#main').html(this.$el);
			$('#loadingMsg').hide();
		},

		goToRelease: function(e){
			e.preventDefault();
			Backbone.history.navigate(e.target.pathname, {trigger: true});
		}
	});
});
