module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    	concat: {
			vendor: {
				src: [
					'bower_components/angular/angular.min.js',
					'bower_components/angular-recourse/angular-recourse.min.js'
				],
				dest: 'js/build/vendor.js'
			},
			lib: {
				src: [
					'js/libs/*.js',
				],
				dest: 'js/build/jquery.jsonShedule.js'
			}
		},
    	
    	uglify: {
			build: {
				src: 'js/build/jquery.jsonShedule.js',
				dest: 'js/build/jquery.jsonShedule.min.js'
			}
		},

		sass: {
			dist: {
				options: {
					style: 'compressed'
				},
				files: {
					'css/build/jquery.jsonShedule.css': 'css/*.css'
				}
			}
		}

  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-sass');

  grunt.registerTask('default', ['concat', 'uglify', 'sass']);
};