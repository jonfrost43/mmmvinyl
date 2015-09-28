define([
	'backbone',
	'doT',
	'app/discogs',
	'app/collections/releases',
	'text!templates/searchResults.html'
],
function(Backbone, doT, discogs, ReleasesCollection, SearchResultsTemplate){

	var templateFnc = doT.template(SearchResultsTemplate);

	return Backbone.View.extend({
		query: '',
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
			this.getResults(this.options.query, this.options.page);
		},

		getResults: function(query, page){
			$.ajax({
				url: discogs.baseUrl + '/database/search',
				dataType: 'jsonp',
				data: {
					q: query + ' vinyl',
					type: 'release',
					page: page,
					per_page: 20,
					token: discogs.authToken
				},
				success: _.bind(function(response){
                    console.log(response);
					this.collection = new ReleasesCollection(response.data);
					this.render();
				}, this)
			});
		},

		render: function(){
			var searchData = this.collection.searchList(),
				html = templateFnc(searchData);

			this.$el.append(html);
			$('#main').html(this.$el);
			$('#loadingMsg').hide();
		},

		goToLink: function(e){
			e.preventDefault();
			Backbone.history.navigate(e.currentTarget.pathname, {trigger: true});
		}
	});
});
