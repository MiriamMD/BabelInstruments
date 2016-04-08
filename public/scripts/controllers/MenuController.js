angular.module("babelInstruments").controller("MenuController", ["$scope", "$location", "$rootScope", "paths","logService","authService","buyService",
    function($scope, $location, $rootScope, paths, logService, authService,buyService) {

        //Scope init
        $scope.model = {
            selectedItem: paths.instruments,
        };

        $scope.userState = "no-logged";
        $scope.paths = paths;
        $scope.buy = "no-buy";

        //Scope methods


        $scope.getClassForItem = function(item) {
            if ($scope.model.selectedItem == item) {
                return "active";
            } else {
                return "";
            }
        };

         $scope.refresh = function() {
            $scope.userAuth = authService.getUserAuth();
            //console.log("Por aqui");

        };


        //Scope Watchers


        $scope.$on("$locationChangeSuccess", function(evt, currentRoute) { //.$on capturar evento 
            $scope.model.selectedItem = $location.path();
        });

       logService.subscribeLogin($scope, function somethingChanged() {
        console.log('rocio',authService.getUserAuth());
            $scope.userAuth = authService.getUserAuth();
            $scope.userState = "logged";

        });

        logService.subscribeLogout($scope, function somethingChanged() {
            $scope.userState = "no-logged";
        });

        buyService.subscribeShop($scope, function somethingChanged(){
            $scope.buy = "buy";
        });

        $scope.refresh();
    }
]);
