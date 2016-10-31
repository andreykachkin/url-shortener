angular
    .module('app')
    .controller('TagListController', TagListController);

TagListController.$inject = ['$scope', '$http', '$routeParams'];

function TagListController($scope, $http, $routeParams) {
    $scope.tag_id = $routeParams.tag_id;

    $http.get('/urls').success(function(data){
        $scope.urls = data;
    }).error(function(){

    });
}

