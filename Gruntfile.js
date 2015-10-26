module.exports = function(grunt) {
  	grunt.initConfig({
    	pkg: grunt.file.readJSON('package.json'),

    	copy: {
			main: {
				files: [
					{src: 'bower_components/angular/angular.min.js', dest: 'public/js/libs/angular.min.js'},
					{src: 'bower_components/angular/angular-moment.min.js', dest: 'public/js/libs/angular-moment.min.js'},
					{src: 'bower_components/angular/angular-resource.min.js', dest: 'public/js/libs/angular-resource.min.js'},
					{src: 'bower_components/moment/min/moment.min.js', dest: 'public/js/libs/moment.min.js'},
					{src: 'bower_components/ngInfiniteScroll/build/ng-infinite-scroll.min.js', dest: 'public/js/libs/ng-infinite-scroll.min.js'},
					{src: 'bower_components/underscore/underscore.min.js', dest: 'public/js/libs/underscore.min.js'}
				],
			},
		}

	});

	grunt.loadNpmTasks('grunt-contrib-copy');

	grunt.registerTask('default', ['copy']);
};