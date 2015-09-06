define([
	'jquery',
	'backbone',
	'doT',
	'text!templates/signup.html'
], 
function($, Backbone, doT, SignUpTemplate){
	return Backbone.View.extend({
		tagName: 'div',
		attributes: {
			id: 'signUp'
		},
		events: {
			'submit #signUpForm': 'submit'
		},
		initialize: function(){
			console.log('sign up view init');
			this.render();
		},
		render: function(){
			var templateFnc = doT.template(SignUpTemplate)
				html = templateFnc();

			this.$el.append(html);
			$('#main').html(this.$el);
			$('#loadingMsg').hide();
		},
		submit: function(e){
			e.preventDefault();
			if(this.validate()){
				$.ajax({
					url: '/api/signup',
					type: 'POST',
					data: {
						username: this.$('#username')[0].value,
						password: this.$('#password')[0].value
					}
				});
			};
		},
		validate: function(){
			return !!this.$('#username')[0].value.length && !!this.$('#password')[0].value.length;
		}
	});
});
