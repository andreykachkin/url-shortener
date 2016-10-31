angular
    .module('app')
    .controller('UrlAuthListController', UrlAuthListController);

UrlAuthListController.$inject = ['$scope', '$http','$route'];

function UrlAuthListController($scope, $http, $route) {
    $http.get('/urlsAuth').success(function(data){
        $scope.sortParam = '-_id';
        $scope.urls = data;
        $scope.totalAuthCounter = function () {
            var authorCounter = 0;
            for (i = 0; i < $scope.urls.length; i++) {
                authorCounter += $scope.urls[i].counter;
            }
            return authorCounter;
        };
        $scope.tagsArr = function (tags) {
            return tags.join(' ');
        };
    }).error(function(){

    });

    $scope.createUrl = function() {
        var data = {
            url_long : $scope.url_long,
            description : $scope.description,
            tags : $scope.tags
        };
        $http.post('/createUrl', data).success(function() {
            $route.reload();
        }).error(function() {

        })
    };
}

