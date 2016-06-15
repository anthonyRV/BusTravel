<?php

$user = "postgres";
$password = "postgres";
$dbname = "postGIS";
$port = "5432";
$host = "localhost";
$strconn = "host=$host port=$port dbname=$dbname user=$user password=$password";
$conn = pg_connect($strconn) or die("Error de Conexion con la base de datos");
//return ($conn);

//$connection = new Connection();
//$conn = $connection.getConnection();
$query = "select ndistrito distrito, st_asgeojson(geom) coordenadas from distritos";
$result = pg_query($conn,$query) or die ('{"status":1, "error": "Error en la consulta"}');
$respuesta = array();
ini_set('memory_limit', '-1');
while($row = pg_fetch_row($result)){
    $array = array(
        "distrito"=> $row[0],
        "coordenada" => json_decode($row[1])
    );
    array_push($respuesta,$array);
}


$query="select 	min(ST_XMin(geom)) xmin,
	max(ST_XMax(geom)) xmax,
	min(ST_yMin(geom)) ymin,
	max(ST_yMax(geom)) ymax from distritos";

$result = pg_query($conn, $query) or die('{"status":1 , "error":"Error ern la consulta"}');
$row= pg_fetch_row($result);
$dimensiones= array 
( 
    "xmin" => $row[0] , 
    "xmax" => $row[1] , 
    "ymin" => $row[2] , 
    "ymax" => $row[3]
);

$query="select srid,type from geometry_Columns where \"f_table_name\"='distritos'";

$result = pg_query($conn, $query) or die('{"status":1 , "error":"Error en la consulta"}');
$row= pg_fetch_row($result);

echo json_encode(array( "SRID" => $row[0],
                        "Tipo" => $row[1] , 
                        "Dimensiones" => $dimensiones,
                        "objs"=>$respuesta));



