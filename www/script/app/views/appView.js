define(['backbone'], function(Backbone){
	return Backbone.View.extend({
		el: document.getElementById('app'),
		events: {
			'submit #search': 'search'
		},
		search: function(e){
			e.preventDefault();
			Backbone.history.navigate('search/' + this.$('#searchBox').val() + '/1', {trigger: true});
		}
	});
});