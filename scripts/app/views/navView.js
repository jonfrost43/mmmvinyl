define([
	'backbone',
	'doT',
	'text!templates/nav.html',
], 
function(Backbone, doT, NavTemplate){
	return Backbone.View.extend({
		tagName: 'ul',
		events: {
		},
		initialize: function(){
			console.log('app view init');
			
			$.ajax({
				url: '/api/identity',
				dataType: 'json',
				error: _.bind(function(jqXHR){
					this.render({username: null});
				}, this),
				success: _.bind(function(data){
					this.render({username: data.username});
				}, this)
			});
		},
		render: function(userData){
			var templateFnc = doT.template(NavTemplate),
				html = templateFnc(userData);
				
			this.$el.append(html);
			$('nav').html(this.$el);
		}
	});
});