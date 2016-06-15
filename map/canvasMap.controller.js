angular.module('MapsApplication',[]).controller("canvasController", function ($scope, $http) {
    //Access to admin, credentials
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

    $scope.distritos = new Object();

    //Dimensiones del visor
    $scope.canvasX = 640;
    $scope.canvasY = 480;

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
                            console.log($scope.factorProporcional);
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
            var size = value.coordenada.coordinates[0][0].length;
            for (i = 0; i < (size - 2); i++)
            {
                var x = value.coordenada.coordinates[0][0][i][0];
                var y = value.coordenada.coordinates[0][0][i][1];
                
                
                x = Math.round((x - $scope.xmin) / $scope.factorProporcional);
                y = Math.round((y - $scope.ymin) / $scope.factorProporcional);
                
                console.log(x + " , "+ y);
                
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
            context.fill();
        });
    };
    $scope.obtenerDistritos();
    //Days
    $scope.days = ['Monday',"Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
});
