define([
	'backbone',
	'doT',
	'app/collections/releases',
	'text!templates/searchResults.html'
], 
function(Backbone, doT, ReleasesCollection, SearchResultsTemplate){
	return Backbone.View.extend({
		term: '',
		page: '1',
		tagName: 'div',
		attributes: {
			id: 'searchResults'
		},
		events: {
			'click a': 'goToLink'
		},
		initialize: function(){
			console.log('search results view init');
			this.getResults(this.options.term, this.options.page);
		},
		getResults: function(term, page){
			$.ajax({
				url: 'http://api.discogs.com/database/search',
				dataType: 'jsonp',
				data: {
					q: term + ' vinyl',
					type: 'release',
					page: page,
					per_page: 20
				},
				success: _.bind(function(response){
                    console.log(response);
					this.collection = new ReleasesCollection(response.data);
					this.render();
				}, this)
			});
		},
		render: function(){
			console.log('search data: ', this.collection.toJSON());
			var templateFnc = doT.template(SearchResultsTemplate),
				html = templateFnc(this.collection.searchList());

			this.$el.append(html);
			$('#main').html(this.$el);
			$('#loadingMsg').hide();
		},
		goToLink: function(e){
			e.preventDefault();
			Backbone.history.navigate(e.target.pathname, {trigger: true});
		}
	});
});