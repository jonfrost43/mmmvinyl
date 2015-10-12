define(['backbone'], function(Backbone){

	return Backbone.View.extend({

		el: document.getElementById('app'),

		events: {
			'click a.internal': 'goToLink',
			'submit #search': 'search'
		},

		goToLink: function(e){
			e.preventDefault();
			Backbone.history.navigate(e.target.pathname, {trigger: true});
		},

		search: function(e){
			e.preventDefault();
			Backbone.history.navigate('search/' + this.$('#searchBox').val() + '/1', {trigger: true});
		}

	});

});
