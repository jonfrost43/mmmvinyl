define([
	'backbone',
	'doT',
	'app/collections/releases',
	'text!templates/collection.html'
],
function(Backbone, doT, ReleasesCollection, CollectionTemplate){

	return Backbone.View.extend({
		tagName: 'div',

		attributes: {
			id: 'collection'
		},

		events: {
			'click a': 'goToLink'
		},

		initialize: function(){
			console.log('collection view init');
			this.getCollection();
		},

		getCollection: function(){
			$.ajax({
				url: '/api/collection',
				dataType: 'json',
				success: _.bind(function(response){
					this.collection = new ReleasesCollection(response);
					this.render();
				}, this)
			});
		},

		render: function(){
			console.log(this.collection.toJSON()[0]);
			var templateFnc = doT.template(CollectionTemplate),
				html = templateFnc(this.collection.toJSON()[0]);

			this.$el.append(html);
			$('#main').html(this.$el);
			$('#loadingMsg').hide();
		},

		goToLink: function(e){
			e.preventDefault();
			Backbone.history.navigate(e.target.pathname, {trigger: true});
		}
	});
});
