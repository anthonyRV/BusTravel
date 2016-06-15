angular.module('MapsApplication',[]).controller("homeController", function ($scope,$location) {
    $scope.showModal = false;
    $scope.toggleModal = function(){
        $scope.showModal = !$scope.showModal;
    };
    $scope.credentials = {
            user: "admin",
            pass: "admin"
    };
    $scope.user = 'Username';
    $scope.pass = 'Password';
    $scope.goAdmin = function(view){
        if($scope.user == $scope.credentials.user && $scope.pass == $scope.credentials.pass){
            console.log("Credentials are equa, continue");
            $location.url('/admin/'+view);
        }else{
            console.log("Credentials are not equa, continue");
        }
    };
});
