define(['backbone'], function(Backbone){

	return Backbone.View.extend({

		el: document.getElementById('app'),

		events: {
			'click a': 'goToLink',
			'submit #search': 'search'
		},

		goToLink: function(e){
			if(e.currentTarget.classList.contains('external')){
				return;
			}

			e.preventDefault();
			Backbone.history.navigate(e.currentTarget.pathname, {trigger: true});
		},

		search: function(e){
			e.preventDefault();
			Backbone.history.navigate('search/' + this.$('#searchBox').val() + '/1', {trigger: true});
		}

	});

});
