angular.module('MapsApplication', []).controller("adminController", function ($scope, $http) {
    $scope.countries = [
        {
            name: "Nepal"
            , district: ['Gulmi', "Palpa"]
        }
        , {
            name: "Nepal"
            , district: ['Gulmi', "Palpa"]
        }
        , {
            name: "India"
            , district: ['Gulmi', "Palpa"]
        }
    ];




    //name of terminal
    $scope.busTerminal = "";
    //Add terminal, going to be locationXY in parameter
    $scope.pointX = 0;
    $scope.pointY = 0;
    $scope.addTerminal = function () {
        $scope.busTerminal = "THis has been updated by click";
    };
    $scope.insertRoute = function () {
        console.log('Hola Yorbi');
    };
    $scope.changeView = function (view) {
        if (view == 'maps') {
            $location.path('../map/map.html');
        }
        if (view == 'home') {
            $location.path('../home/home.html');
        }
        if (view == 'about') {
            $location.path('../about/about.html');
        }
    };
    $scope.moveMap = function (direction) {
        if (direction == 'up') {
            console.log('On move up');
        }
        if (direction == 'down') {
            console.log('On move down');
        }
        if (direction == 'left') {
            console.log('On move left');
        }
        if (direction == 'right') {
            console.log('On move right');
        }
    };
    $scope.zoom = function (zoom) {
        if (zoom == 'in') {
            console.log('On Zoom In');
        }
        if (zoom == 'out') {
            console.log('On Zoom Out');
        }
    };
    $scope.select = {
        value: "Option1"
        , choices: ["Option1", "I'm an option", "This is materialize", "No, this is Patrick."]
    };
    $scope.showDialog = function () {
        console.log("Going to change attribute");
        $scope.showDialog = true;
    };

    function load() {
        //Get all terminals
        $http({
            method: 'GET'
            , url: '../php/terminal.php?action=get'
        }).
        then(
            function (response) {
                $scope.terminals = response;
                console.log($scope.terminals);

            }
            , function () {
                console.log("Error loading the terminals");
            });
    }
    //Database actions for admin views
    $scope.databaseAction = function (view, action) {
        //Get terminals
        //if (view == "terminal" && action == "get") {

            //http://localhost:8080//BusTravelCR/php/newTerminal.php?action=get
        //}
        if (view.equals("terminal") && action.equals("insert")) { //Insert Terminal
            /*$http({method: 'GET', url: '../php/terminal.php?action=get'}).
                then(
                        function (response)
                        {
                            $scope.terminals = response;
                            console.log(response);

                        },
                        function ()
                        {
                            console.log("Error loading the terminals");
                        });*/
            //http://localhost:8080//BusTravelCR/php/newTerminal.php?action=insert&name=Prueba1&locationXY=asdf
        }
    };
    load();
});
