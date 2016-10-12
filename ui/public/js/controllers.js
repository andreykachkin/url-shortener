var app = angular.module('app', ['ngRoute']);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){

    $routeProvider
        .when('/', {
            templateUrl: '/template/home',
            controller: 'UrlsListCtrl'
        })
        .when('/template/personal_info', {
            templateUrl: '/template/personal_info',
            controller: 'UrlAuthListCtrl'
        })
        .when('/template/login', {
            templateUrl: '/template/login',
            controller: 'AuthCtrl'
        })
        .when('/template/registration', {
            templateUrl: '/template/registration',
            controller: 'RegCtrl'
        })
        .when('/url/:url_id', {
            templateUrl: '/template/url_detail',
            controller: 'UrlDetailCtrl'
        })
        .when('/tags/:tag_id', {
            templateUrl: '/template/tags',
            controller: 'TagListCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });

    $locationProvider.html5Mode(true);

}]);

app.controller('RegCtrl',['$scope', '$http', '$location','$route', function($scope, $http, $location, $route){
    $scope.reg = function() {
        var data = {
            username: $scope.username,
            password: $scope.password
        };
        $http.post('/registration', data).success(function() {
            $route.reload();
            $location.path('/template/personal_info');
        }).error(function(){
            var regError = angular.element(document.querySelector('#error'));
            var error = angular.element('<p class="text-danger">Пользователь с таким именем уже существует.</p>');
            if (!regError.find('p')) {
                regError.append(error);
            } else {
                regError.find('p').remove();
                regError.append(error);
            }
        });

    };
}]);

app.controller('AuthCtrl',['$scope', '$http', '$location', '$route', function($scope, $http, $location, $route){
    $scope.checkAuth = function() {
        var data = {
            username: $scope.username,
            password: $scope.password
        };
        $http.post('/authentication', data).success(function() {
            $route.reload();
            $location.path('/template/personal_info');
        }).error(function(){
            var authError = angular.element(document.querySelector('#error'));
            var error = angular.element('<p class="text-danger">Неправильный логин или пароль</p>');
            if (!authError.find('p')) {
                authError.append(error);
            } else {
                authError.find('p').remove();
                authError.append(error);
            }
        });

    };
}]);

app.controller('UrlAuthListCtrl',[ '$scope', '$http', '$route', function($scope, $http, $route){

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
}]);

app.controller('UrlsListCtrl', ['$scope', '$http', function($scope, $http){

    $http.get('/urls').success(function(data){
        $scope.sortParam = '-_id';
        $scope.urls = data;

    }).error(function(){

    });
}]);


app.controller('UrlDetailCtrl',['$scope','$http', '$routeParams', '$route', function($scope, $http, $routeParams, $route) {
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
}]);

app.controller('TagListCtrl', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams){
    $scope.tag_id = $routeParams.tag_id;

    $http.get('/urls').success(function(data){
        $scope.urls = data;
    }).error(function(){

    });
}]);
