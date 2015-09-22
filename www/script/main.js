requirejs([
	'jquery',
	'underscore',
	'backbone',
	'router',
	'app/views/appView',
	'app/views/navView'
],
function($, _, Backbone, Router, AppView, NavView){
	console.log('app init');
	new Router();
	Backbone.history.start({pushState: true});
	new AppView();
	new NavView();
});
