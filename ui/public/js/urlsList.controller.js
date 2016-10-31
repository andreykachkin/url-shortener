angular
    .module('app')
    .controller('UrlsListController', UrlsListController);

UrlsListController.$inject = ['$scope', '$http'];

function UrlsListController($scope, $http) {
    $http.get('/urls').success(function(data){
        $scope.sortParam = '-_id';
        $scope.urls = data;

    }).error(function(){

    });
}

