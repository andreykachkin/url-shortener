angular
    .module('app')
    .controller('AuthController', AuthController);

AuthController.$inject = ['$scope', '$http', '$location','$route'];

function AuthController($scope, $http, $location, $route) {
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
}

