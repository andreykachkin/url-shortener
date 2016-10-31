angular
    .module('app')
    .config(config);

config.$inject = ['$routeProvider', '$locationProvider'];

function config($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: '/template/home',
            controller: 'UrlsListController'
        })
        .when('/template/personal_info', {
            templateUrl: '/template/personal_info',
            controller: 'UrlAuthListController'
        })
        .when('/template/login', {
            templateUrl: '/template/login',
            controller: 'AuthController'
        })
        .when('/template/registration', {
            templateUrl: '/template/registration',
            controller: 'RegController'
        })
        .when('/url/:url_id', {
            templateUrl: '/template/url_detail',
            controller: 'UrlDetailController'
        })
        .when('/tags/:tag_id', {
            templateUrl: '/template/tags',
            controller: 'TagListController'
        })
        .otherwise({
            redirectTo: '/'
        });

    $locationProvider.html5Mode(true);
}


