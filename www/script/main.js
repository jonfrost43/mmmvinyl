requirejs.config({
    paths: {
		jquery: 'lib/jquery',
		underscore: 'lib/underscore',
		backbone: 'lib/backbone',
		localstorage: 'lib/backbone.localstorage',
		doT: 'lib/doT'
    },
	shim: {
		underscore: {
			exports: '_'
		},
		backbone: {
			deps: ['underscore', 'jquery'],
			exports: 'Backbone'
		}
	}
});

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

