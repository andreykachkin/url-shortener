angular
    .module('app')
    .controller('UrlDetailController', UrlDetailController);

UrlDetailController.$inject = ['$scope','$http', '$routeParams', '$route'];

function UrlDetailController($scope, $http, $routeParams, $route) {
    $scope.url_id = $routeParams.url_id;

    var url = '/url/' + $routeParams.url_id;

    $http.get(url).success(function(data) {
        $scope.url = data;
    });

    $scope.updateUrl = function() {
        var data = {
            _id : $scope.url_id,
            description : $scope.description,
            tags : $scope.tags
        };
        $http.post('/updateUrl', data).success(function() {
            $route.reload();
        }).error(function() {

        })
    };
}

