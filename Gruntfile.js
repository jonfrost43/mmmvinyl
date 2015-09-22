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
				tasks: ['sass:dev']
			}
		},

		sass: {
			dev: {
				options: {
					style: 'expanded'
				},
				files: {
					'www/style/main.css': 'sass/main.scss'
				}
			},
			prod: {
				options: {
					style: 'compressed'
				},
				files: {
					'www/style/main.css': 'sass/main.scss'
				}
			},
		},

		requirejs: {
			options: {
				baseUrl: 'www/script',
				config: ['config.js'],
				name: 'main',
				require: 'lib/require',
				includeAlmond: false,
				out: 'www/script/default.js'
			},
			dev: {
				options: {
					build: false
				}
			},
			prod: {
				options: {
					build: true
				}
			}
	    }
	});

	grunt.loadNpmTasks('grunt-plato');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-require');
	grunt.loadNpmTasks('grunt-sass');

	grunt.registerTask('default', ['sass:prod', 'requirejs:prod']);

	grunt.registerTask('dev', ['sass:dev', 'watch']);

};
