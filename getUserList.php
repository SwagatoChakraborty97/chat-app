<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

    // print_r("THIS IS A GET REQUEST");
    // echo "<br>";
    $server = "localhost"; # IP addr of mysql db server wants to connect to. In could be localhost if db is hosted on same machine or could be the ip addr of the domain name of remote server
    $username = "root"; # authorised user
    $password = ""; # password
    $connection = mysqli_connect($server, $username, $password);
    mysqli_select_db($connection, 'chat_app');
    $sql = "SELECT * FROM `user_sign_up_db`";
    // echo "<br>";
    // print_r($sql);
    $response = mysqli_query($connection, $sql); # to execute sql queries
    // echo "<br>";
    // print_r($response);
    for ($i=0; $i < $response->num_rows; $i++) { 
        if ($i == 0){
            echo "[";
        }
        print_r(json_encode(mysqli_fetch_object($response)));
        if ($i != $response->num_rows - 1){
            echo ",";
        }
        // echo ",";
        if ($i == $response->num_rows - 1){
            echo "]";
        }
    }
?>
