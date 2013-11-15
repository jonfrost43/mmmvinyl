module.exports = function(grunt){

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		plato: {
			mmm: {
				files: {
					'reports': ['scripts/main.js', 'scripts/router.js', 'scripts/app/**/*.js']
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-plato');
	
};