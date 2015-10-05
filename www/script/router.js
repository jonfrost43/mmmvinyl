define([
	'backbone',
	'app/views/homeView',
	'app/views/searchResultsView',
	'app/views/releaseView',
	'app/views/labelView',
	'app/views/playlistsView',
	'app/views/playlistView',
	'app/views/collectionView'
],
function(Backbone, HomeView, SearchResultsView, ReleaseView, LabelView, PlaylistsView, PlaylistView, CollectionView){
	return Backbone.Router.extend({
		routes: {
			':title/release/:id': 'release',
			':name/labels/:id(/:page)': 'label',
			'search/:query/:page': 'search',
			'playlists': 'playlists',
			'playlist/:id': 'playlist',
			'collection': 'collection',
			'signup': 'signup',
			'*actions': 'defaultRoute'
		},
		defaultRoute: function(){
			console.log('default route');
			$('#loadingMsg').show();
			new HomeView();
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
		search: function(query, page){
			console.log('search route');
			$('#loadingMsg').show();
			new SearchResultsView({
				query: decodeURIComponent(query),
				page: page
			});
		},
		playlists: function(id){
			console.log('playlists route');
			$('#loadingMsg').show();
			new PlaylistsView();
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
