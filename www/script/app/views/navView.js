define([
	'backbone',
	'doT',
	'text!templates/nav.html',
],
function(Backbone, doT, NavTemplate){

	return Backbone.View.extend({

		el: document.getElementsByTagName('nav')[0],

		isOpen: false,

		events: {
			'click button': 'toggleMenu',
			'click a': 'closeMenu'
		},

		initialize: function(){
			this.$navList = this.$('ul');

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

			this.$navList.empty().append(html);
		},

		toggleMenu: function(){
			this.isOpen ? this.closeMenu() : this.openMenu();
		},

		openMenu: function(){
			$('#app').addClass('nav-open');
			//this.$navList.slideDown(250);
			this.isOpen = true;
		},

		closeMenu: function(e){
			if(e && e.currentTarget.classList.contains('external')){
				return;
			}
			$('#app').removeClass('nav-open');

			//this.$navList.slideUp(250);
			this.isOpen = false;
		}

	});

});
