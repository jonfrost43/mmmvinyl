define([
	'backbone',
	'doT',
	'text!templates/nav.html',
],
function(Backbone, doT, NavTemplate){

	return Backbone.View.extend({

		tagName: 'ul',

		events: {
			'click a.internal': 'goToLink'
		},

		initialize: function(){
			$.ajax({
				url: '/api/identity',
				dataType: 'json',
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
