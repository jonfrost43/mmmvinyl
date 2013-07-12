define([
	'backbone', 
	'app/views/searchResultsView',
	'app/views/releaseView',
	'app/views/labelView',
	'app/views/collectionView'
], 
function(Backbone, SearchResultsView, ReleaseView, LabelView, CollectionView){
	return Backbone.Router.extend({
		routes: {
			':title/release/:id': 'release',
			':name/labels/:id': 'label',
			'search/:term/:page': 'search',
			'playlist/:id': 'playlist',
			'collection': 'collection',
			'*actions': 'defaultRoute'
		},
		defaultRoute: function(){
			console.log('default route');
		},
		release: function(title, id){
			console.log('release route', id);
			$('#loadingMsg').show();
			new ReleaseView({
				releaseId: id
			});
		},
		label: function(name, id){
			console.log('label route', id);
			$('#loadingMsg').show();
			new LabelView({
				labelId: id
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
		}
	});
});