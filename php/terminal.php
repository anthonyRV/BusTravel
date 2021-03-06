<?php



class Terminal{
    function getTerminals(){
        $user = "postgres";
        $password = "postgres";
        $dbname = "postGIS";
        $port = "5432";
        $host = "localhost";
        $strconn = "host=$host port=$port dbname=$dbname user=$user password=$password";
        $conn = pg_connect($strconn) or die("Error de Conexion con la base de datos");
        $query = "select * from terminal";
        $result = pg_query($conn,$query) or die ('{"status":1, "error": "Error en la consulta"}');
        $respuesta = array();
        while($row = pg_fetch_row($result)){
            $array = array(
                "id_terminal"=> $row[0],
                "nombre"=> $row[1]
                //"point" => json_decode($row[2])
            );
            array_push($respuesta,$array);
        }
        echo json_encode($respuesta);
    }

    function insertTerminal($name){
        $user = "postgres";
        $password = "postgres";
        $dbname = "postGIS";
        $port = "5432";
        $host = "localhost";
        $strconn = "host=$host port=$port dbname=$dbname user=$user password=$password";
        $conn = pg_connect($strconn) or die("Error de Conexion con la base de datos");
        $query = "insert into terminal(nombre,point) values ('$name','POINT(-71.060316 48.432044)')";
        $result = pg_query($conn,$query) or die ('{"status":1, "error": "Error en la consulta"}');
    }
}

$terminal = new Terminal();
if($_REQUEST['action']== 'get'){
    $terminal->getTerminals();
}
if($_REQUEST['action'] == 'insert'){
    $terminal->getTerminals();
    $terminal->insertTerminal($_REQUEST['name']);
}


