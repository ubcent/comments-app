(function(angular){
    'use strict';

    var myApp = angular.module('commentsApplication');

    myApp.controller('MainController',function($scope, Post){    
        $scope.comments = [];
        $scope.sortType = "date";
        $scope.skip = 0;
        $scope.canLoad = true;
        Post.query({skip: $scope.skip}, function(data) {
		    $scope.comments = _.toArray(angular.fromJson(data));
		    $scope.skip += 10;
  		});

	    $scope.btn_add = function() {
	        if($scope.txtcomment !=''){
	        	Post.save({name: $scope.author, text: $scope.txtcomment}, function(data) {
	        		var obj = angular.fromJson(data);
	        		$scope.comments.push(obj.comment);
	        		$scope.txtcomment = "";
	        	});
	        }
	    }

	    $scope.remItem = function($index) {
	    	Post.delete({id: $scope.comments[$index]._id}, function(data) {
	    		$scope.comments.splice($index, 1);
	    	});
	    }

	    $scope.likeComment = function($index) {
	    	Post.update({id: $scope.comments[$index]._id, name: $scope.comments[$index].name, text: $scope.comments[$index].text, likes: $scope.comments[$index].likes+1}, function(data) {
	    		$scope.comments[$index].likes++;
	    	});
	    }

	    $scope.dislikeComment = function($index) {
	    	Post.update({id: $scope.comments[$index]._id, name: $scope.comments[$index].name, text: $scope.comments[$index].text, likes: $scope.comments[$index].likes-1}, function(data) {
	    		$scope.comments[$index].likes--;
	    	});
	    }

	    $scope.changeSort = function($index) {
	    	if($scope.sortType == "date") $scope.sortType = "likes";
	    	else $scope.sortType = "date";
	    }

	    $scope.loadMore = function($index) {
	    	Post.query({skip: $scope.skip}, function(data) {
			    $scope.comments = _.union($scope.comments, _.toArray(angular.fromJson(data)));
			    $scope.skip += 10;
	  		});
	    }
    });
})(window.angular);