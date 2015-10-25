(function(angular){
    'use strict';
	var myApp = angular.module('commentsApplication', [ "ngResource", "angularMoment", "infinite-scroll" ]);

	myApp.factory("Post", function($resource) {
		return $resource("/api/comments/:id", { id: "@id" }, {
			'update': {
				method: 'PUT'
			}
		});
	});
})(window.angular);