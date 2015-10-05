define([
	'backbone',
	'doT',
    'app/collections/playlists',
	'text!templates/playlists.html'
],
function(Backbone, doT, PlaylistsCollection, templateStr){

	return Backbone.View.extend({
		tagName: 'div',

		attributes: {
			id: 'playlists'
		},

        events: {
			'click a': 'goToLink'
		},

		initialize: function(){
			console.log('playlists view init');
            this.collection = new PlaylistsCollection();
            this.collection.fetch({
				success: _.bind(function(response){
					this.render();
				}, this)
			});
		},

		render: function(){
            console.log(this.collection.toJSON());
			var templateFnc = doT.template(templateStr),
				html = templateFnc(this.collection.toJSON());

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
