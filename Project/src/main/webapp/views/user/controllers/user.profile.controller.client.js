(function() {
	angular.module("BookMyShow").controller("userProfileController", userProfileController);

	function userProfileController($location, UserService, $routeParams, ReviewService) {
		var vm = this;
		var userId = $routeParams['userId'];
		vm.userId = userId;
        vm.reviews=null;
        vm.getReviews=getReviews;
        vm.deleteReview= deleteReview;
        vm.getUsersFollowed = getUsersFollowed;
		
		function init() {
			getUserDetails();
			getReviews(userId);
			getUsersFollowed(userId);
			getTickets(userId);
		}
		init();

		function getUserDetails(user) {
			var promise = UserService.findUserById(userId);
			promise.success(function(user) {
				vm.user = user;
			}).error(function(err) {
				vm.error = 'user not found';
			});
		}

        function getReviews(userId) {
            var promise=UserService
                .getReviews(userId);
            promise.success(function (response) {
                vm.reviews=response;
            },function (error) {

            });
        }

        function getUsersFollowed(userId) {
            var promise=UserService
                .getUsersFollowed(userId).success(function (response) {
                vm.following=response;
            },function (error) {

            });
        }

        function deleteReview(reviewId) {
            var promise=ReviewService.deleteUserReview(reviewId);
            promise.success(function (response) {
                getReviews(userId);
            },function (error) {
            });


        function getTickets(userId) {
            var promise=UserService
                .getTickets(userId);
            promise.success(function (response) {
                vm.tickets=response;
            },function (error) {

            });

        }
	}
})();