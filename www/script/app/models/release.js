define(['backbone', 'underscore'], function(Backbone, _){
	return Backbone.Model.extend({

		releaseData: function(){
			var json = this.toJSON();

			_.each(json.labels, function(label){
				label.uri = '/' + label.name.replace(/[\/\s]/g, "-") + label.resource_url.split("api.discogs.com")[1];
			});

			_.each(json.images, function(image, index){
				if(index === 0){
					image.cssClass = 'front';
					json.imagesCssClass = '';
				}
				else if(index === 1){
					image.cssClass = 'back';
					json.imagesCssClass = 'flipContainer';
				}
			});

			json.artistName = this.getArtistName();

			json.tracklist = _.filter(json.tracklist, function(track){
				if(track.artists){
					track.artistName = this.getArtistName(track.artists)
				}

				return !!track.duration || !!track.position;
			}, this);

			return json;
		},

		getTrack: function(index){
			var tracklist = _.filter(this.toJSON().tracklist, function(track){
				return !!track.duration || !!track.position;
			});

			return tracklist[index];
		},

		getTrackName: function(index){
			var tracklist = _.filter(this.toJSON().tracklist, function(track){
				return !!track.duration || !!track.position;
			});

			return tracklist[index].title;
		},

		getArtistName: function(artists){
			var artists = artists || this.toJSON().artists;

			if(artists.length === 1){
				return artists[0].name;
			}
			else{
				var artistName = '';
				_.each(artists, function(artist){
					artistName += artist.name;
					if(!!artist.join){
						artistName += ' ' + artist.join + ' ';
					}
				});
				return artistName;
			}
		}

	});
});
