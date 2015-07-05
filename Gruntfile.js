module.exports = function(grunt){

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		plato: {
			mmm: {
				files: {
					'reports': ['scripts/main.js', 'scripts/router.js', 'scripts/app/**/*.js']
				}
			}
		},

		watch: {
			sass: {
				files: ['sass/**/*.{scss,sass}','sass/_partials/**/*.{scss,sass}'],
				tasks: ['sass:dist']
			}
		},

		sass: {
			dist: {
				options: {
					style: 'expanded'
				},
				files: {
					'style/main.css': 'sass/main.scss'
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-plato');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-sass');

	grunt.registerTask('default', ['sass:dist', 'watch']);

};
