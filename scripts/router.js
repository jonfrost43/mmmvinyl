define([
	'backbone',
	'app/views/searchResultsView',
	'app/views/releaseView',
	'app/views/labelView',
	'app/views/playlistView',
	'app/views/collectionView'
],
function(Backbone, SearchResultsView, ReleaseView, LabelView, PlaylistView, CollectionView){
	return Backbone.Router.extend({
		routes: {
			':title/release/:id': 'release',
			':name/labels/:id(/:page)': 'label',
			'search/:term/:page': 'search',
			'playlist/:id': 'playlist',
			'collection': 'collection',
			'signup': 'signup',
			'*actions': 'defaultRoute'
		},
		defaultRoute: function(){
			console.log('default route');
			$('#main').empty();
		},
		release: function(title, id){
			console.log('release route', id);
			$('#loadingMsg').show();
			new ReleaseView({
				releaseId: id
			});
		},
		label: function(name, id, page){
			console.log('label route', id);
			$('#loadingMsg').show();
			new LabelView({
				labelId: id,
				page: page
			});
		},
		search: function(term, page){
			console.log('search route');
			$('#loadingMsg').show();
			new SearchResultsView({
				term: decodeURIComponent(term),
				page: page
			});
		},
		playlist: function(id){
			console.log('playlist route');
			$('#loadingMsg').show();
			new PlaylistView({
				playlistId: id
			});
		},
		collection: function(id){
			console.log('collection route');
			$('#loadingMsg').show();
			new CollectionView();
		},
		signup: function(){
			console.log('signup route');
			$('#loadingMsg').show();
			require(['app/views/signUpView'], function(SignUpView){
				new SignUpView();
			});
		}
	});
});
