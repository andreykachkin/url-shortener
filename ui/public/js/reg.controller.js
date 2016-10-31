angular
    .module('app')
    .controller('RegController', RegController);

RegController.$inject = ['$scope', '$http', '$location','$route'];

function RegController($scope, $http, $location, $route) {
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
}

