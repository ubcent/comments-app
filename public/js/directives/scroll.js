(function(angular){
    'use strict';

    var myApp = angular.module('commentsApplication');

	myApp.directive('infiniteScroll', [ "$window", function ($window) {
		console.log("2332432432");
        return {
            link:function (scope, element, attrs) {
                var offset = parseInt(attrs.threshold) || 0;
                var e = element[0];
                console.log("1111111");
                element.bind('scroll', function () {
                    if (scope.$eval(attrs.canLoad) && e.scrollTop + e.offsetHeight >= e.scrollHeight - offset) {
                        scope.$apply(attrs.infiniteScroll);
                    }
                });
            }
        };
    }]);

});