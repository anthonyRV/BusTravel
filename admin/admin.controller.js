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

    //MAP section
    //<<------------------------------------------------>>//
    $scope.distritos = new Object();
    $scope.nombresDistritos = [];
    $scope.selectedDistrict = "";

    //Dimensiones del visor
    $scope.canvasX = 680;
    $scope.canvasY = 600;

    //Minimos
    $scope.xmin = 0;
    $scope.ymin = 0;

    //Factor proporcional con respecto a las dimensiones
    $scope.factorProporcional = 0;

    //Zoom del visor
    $scope.zoom = 0;
    $scope.zoomType = 1;

    $scope.getMins = function () {
        $scope.xmin = $scope.distritos.data.Dimensiones.xmin;
        $scope.ymin = $scope.distritos.data.Dimensiones.ymin;
    };

    //Consulta para obtener el objeto distritos
    $scope.obtenerDistritos = function ()
    {
        $http({method: 'GET', url: '../php/getDistritos.php'}).
                then(
                        function (response)
                        {
                            $scope.distritos = response;
                            console.log(response);
                            $scope.factorProporcional = ($scope.distritos.data.Dimensiones.ymax - $scope.distritos.data.Dimensiones.ymin) / $scope.canvasY;
                            $scope.getMins();
                            $scope.dibujaDistritos();
                        },
                        function ()
                        {
                            console.log("Error cargando los distritos");
                        });
    };
//Dibuja los datos en el canvas
    $scope.dibujaDistritos = function ()
    {

        var canvas = document.getElementById('canvasDistritos');
        var context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
        $scope.distritos.data.objs.forEach(function (value)
        {
            $scope.nombresDistritos.push(value.distrito);
            var size = value.coordenada.coordinates[0][0].length;
            for (i = 0; i < (size - 2); i++)
            {
                var x = value.coordenada.coordinates[0][0][i][0];
                var y = value.coordenada.coordinates[0][0][i][1];


                x = Math.round((x - $scope.xmin ) / $scope.factorProporcional);
                y = Math.round((y - $scope.ymin) / $scope.factorProporcional);

                y = $scope.canvasY - y;



                if ($scope.zoomType === 1) {
                    x = x + (x * $scope.zoom);
                    y = y + (y * $scope.zoom);
                } else
                {
                    x = x - (x * $scope.zoom);
                    y = y - (y * $scope.zoom);
                }


                if (i === 0) {
                    context.beginPath();
                    context.moveTo(x, y);
                } else {
                    context.lineTo(x, y);
                }

            }
            context.closePath();
            context.fillStyle = "rgb(240,221,123)";
            context.stroke();
            context.fill();
        });
    };
    $scope.obtenerDistritos();

});
