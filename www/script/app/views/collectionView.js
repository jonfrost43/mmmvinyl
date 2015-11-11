define([
	'backbone',
	'doT',
	'app/collections/releases',
	'text!templates/collection.html'
],
function(Backbone, doT, ReleasesCollection, templateStr){

	return Backbone.View.extend({
		tagName: 'div',

		attributes: {
			id: 'collection'
		},

		initialize: function(){
			console.log('collection view init');
			this.getCollection().then(_.bind(this._onSuccess, this), _.bind(this._onError, this));
		},

		getCollection: function(){
			return $.ajax({
				url: '/api/collection',
				dataType: 'json'
			});
		},

		_onSuccess: function(response){
			this.collection = new ReleasesCollection(response);
			this.render();
		},

		_onError: function(response){
			Backbone.history.navigate('/', {trigger: true});
		},

		render: function(){
			console.log(this.collection.toJSON()[0]);
			var templateFnc = doT.template(templateStr),
				html = templateFnc(this.collection.toJSON()[0]);

			this.$el.append(html);
			$('#main').html(this.$el);
			$('#loadingMsg').hide();
		}
	});
});
