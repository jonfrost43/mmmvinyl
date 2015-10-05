define([
	'backbone',
	'doT',
	'text!templates/home.html'
],
function(Backbone, doT, HomeTemplate){

	return Backbone.View.extend({
		tagName: 'div',

		attributes: {
			id: 'home'
		},

		initialize: function(){
			console.log('home view init');
			this.render();
		},

		render: function(){
			var templateFnc = doT.template(HomeTemplate),
				html = templateFnc({});

			this.$el.append(html);
			$('#main').html(this.$el);
			$('#loadingMsg').hide();
		}
	});
});
