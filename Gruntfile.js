module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		config:{
			vendorsFilesToCopy : {src: 'bower_components/jquery/jquery.min.js', dest: 'www/scripts/jquery.min.js'},
			assetsFilesToCopy : {expand: true, cwd: 'assets/', src: ['**'], dest: 'www/'},
			filesToUglify : {'www/scripts/app.js': ['src/scripts/*.js']},
			folderToClean : ['build/*', 'www/*']
		},
		
		clean: {
			run: '<%= config.folderToClean %>'
		},

		compass: {
			dist: {
				options: {
					sassDir: 'src/sass',
					cssDir: 'build',
					http_fonts_path: '../fonts'
				}
			}
		},
		
		connect: {
			server: {
				options: {
					port: 3000,
					base: 'www',
					keepalive: true
		    }
		  }
		},
			
		copy: {
			assets: {
				expand: true,
				cwd: 'src/assets/',
				src: '**',
				dest: 'www/'
			},
			styles: {
				expand: true,
				files: [{
					expand: true,
					cwd: 'build/',
					src: 'gobbmovies.css',
					dest: 'www/css/'
				},
				{
					expand: true,
					cwd: 'bower_components/bootstrap/dist/css/',
					src: 'bootstrap.css',
					dest: 'www/css/'
				},
				{
					expand: true,
					cwd: 'bower_components/bootstrap/fonts',
					src: '*',
					dest: 'www/fonts/'
				}
				]
			}
		}
	});

	/**
	 * loading npm tasks
	 */
	grunt.loadNpmTasks('grunt-contrib-clean');;
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-connect');

	/**
   * register tasks
   */
	grunt.registerTask('default', ['run']);
	grunt.registerTask('build', ['compass']);
	grunt.registerTask('rebuild', ['clean', 'build']);
	grunt.registerTask('deploy', ['copy:assets', 'copy:styles']);
	grunt.registerTask('run', ['rebuild', 'deploy', 'connect']);
};