
(function () {
    angular.module("BookMyShow").controller("addTheatreController", addTheatreController);

    function addTheatreController($location, $scope, $routeParams, UserService, TheatreOwnerService, TheatreService ,$rootScope, MovieShowService) {

        var vm = this;
        var theatreOwnerId = $routeParams['toid'];
        var theatreId = $routeParams['tid'];
        vm.theatreId = theatreId;
        vm.addTheatre= addTheatre;
        vm.updateTheatre = updateTheatre;
        vm.deleteTheatre = deleteTheatre;
        vm.addMovie = addMovie;
        vm.getMovies = getMovies;
        vm.deleteMovie = deleteMovie;

        function init() {
            if (theatreId !=null) {
                renderTheatreInfo(theatreId);
                getMovies();
            }
        }

        init();
        
        function deleteMovie(movieId, theatreId){
        	MovieShowService.deleteMoviesForTheatre(movieId, theatreId)
            .success(function (response) {
            	getMovies();
            })
            .error(function () {
                vm.error = "Couldn't delete this movie";
            });
        }

        function getMovies(){
        	MovieShowService.findMoviesForTheatre(theatreId)
            .success(function (response) {

                vm.movies = response;
            })
            .error(function () {
                vm.error = "Couldn't find any movies";
            });
        }
        
        function renderTheatreInfo(theatreId) {
            var promise=TheatreService.findTheatreById(theatreId);
            promise.success(function (response) {
                vm.theatre = response;
            })
                .error(function () {
                    vm.error = "unable to load theatre";
                });
        }

        function updateTheatre(newtheatre) {

            vm.message="";
            vm.error="";
            TheatreService.updateTheatre(theatreId, newtheatre)
                .success(function (response) {

                    vm.message = "theatre successfully updated";
                })
                .error(function () {
                    vm.error = "unable to update theatre";
                });
        }


        function addTheatre(newtheatre) {

            vm.message="";
            vm.error="";
            TheatreService
                .createTheatre(newtheatre, theatreOwnerId)
                .success(function (response) {

                    vm.message = "theatre added successfully";
                })
                .error(function () {
                    vm.error = "unable to add theatre";
                });
        }

        function deleteTheatre(theatreId) {
            TheatreService.deleteTheatre(theatreId);
            $location.url("/theatreOwner/"+theatreOwnerId+"/profile");
        }
        
        function addMovie() {
            $location.url("/theatreOwner/"+theatreOwnerId+"/theatre/"+theatreId+"/addMovie");
        }

    }
})();
