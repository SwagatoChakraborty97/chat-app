<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");


$request_type = $_SERVER['REQUEST_METHOD'];
// print_r($request_type);
// print_r(gettype($request_type));
switch($request_type){
    case "POST":
        $post = true;
        break;
    case "GET":
        $post = false;
        break;
}

if ($post){
    // print_r("THIS IS A POST REQUEST");
    // echo "<br>";
    $data = json_decode(file_get_contents("php://input"));
    // print_r($data);
    
    $first_name = $data->first_name;
    $last_name = $data->last_name;
    $email = $data->email;
    // $check_pswrd = $data->pswrd;
    $pswrd_1 = password_hash($data->pswrd, PASSWORD_DEFAULT);
    $pswrd_2 = password_hash($data->confirm_pswrd, PASSWORD_DEFAULT);
    if (property_exists($data,'user_image')) # Since Optional
    {
        $image = $data->user_image;
        print_r($_FILES);
        print_r(isset($_FILES['user_image']));
    }

    // echo "<br>";
    // echo $first_name;
    // echo "<br>";
    // echo $last_name;
    // echo "<br>";
    // echo $email;
    // echo "<br>";
    // echo $pswrd_1;
    // echo "<br>";
    // echo $pswrd_2;

    # STORE IMAGE 
    // echo $data->email;
    // echo $image;
    // $file_name = basename($image);
    // echo $file_name;
    // $upload_image = 'images/'.$file_name;
    // move_uploaded_file($image, $upload_image);

    # VALIDATE EMAIL
    $email_validated = false;
    if (filter_var($email, FILTER_VALIDATE_EMAIL))
    {
        $response = array("message" => "Valid Mail Address");
        $email_validated = true;
    }
    else
    {
        $response = array("message" => "Invalid Mail Address");
    }

    // echo json_encode($response);

    # CHECK PASSWORD STRENGTH
    $pswrd_validated = false;
    // Use shell_exec to execute the Python script and capture its output
    $output = shell_exec("python pswrd_strength.py \"$data->pswrd\"");
    $newResponse = array(
        "pswrd_strength" => $output
    );
    $response = array_merge($response, $newResponse);
    if ($output == "strong"){
        $pswrd_validated = true;
    }

    echo json_encode($response);

    if ($email_validated && $pswrd_validated){

    $server = "localhost"; # IP addr of mysql db server wants to connect to. In could be localhost if db is hosted on same machine or could be the ip addr of the domain name of remote server
    $username = "root"; # authorised user
    $password = ""; # password
    // echo $server;
    
    # Making connection between server and host using mysqli_connect
    $connection = mysqli_connect($server, $username, $password);
    mysqli_select_db($connection, 'chat_app');
    $sql = "INSERT INTO `chat_app`.`user_sign_up_db`(`first_name`, `last_name`, `email`, `pswrd_1`, `pswrd_2`, `image`) VALUES ('$first_name','$last_name','$email','$pswrd_1','$pswrd_2','image')";
    // echo "<br>";
    // print_r($sql);
    mysqli_query($connection, $sql); # To execute the react query

    # NOW WE NEED TO CREATE A JSON WHICH CONTAINS
    # EMAIL -> HASHED PASSWORD

    // STEP 1 - Read Existing Files From JSON and store them in jsonData(in form of string)
    $jsonFile = 'user_lists.json';
    $jsonData = file_get_contents($jsonFile);
    
    // STEP 2 - DECODE the data stored in jsonData to hashmap
    $userDetails_hm = json_decode($jsonData, true);

    // STEP 3 - APPEND NEW USER EMAIL AND HASHED PASSWORD AND STORE THEM IN JSON FILE (Over-write)
    $newUser = array(
        $email => $pswrd_1
    );
    $userDetails_hm = array_merge($userDetails_hm, $newUser);

    // STEP 4 - Encode the updated array back to JSON
    $userDetails_hm = json_encode($userDetails_hm);

    // STEP 5 - Write the JSON data back to the file
    file_put_contents($jsonFile, $userDetails_hm);

    // print_r($userDetails_hm);
}
}


elseif (!$post){
    // print_r("THIS IS A GET REQUEST");
    // echo "<br>";
    $server = "localhost"; # IP addr of mysql db server wants to connect to. In could be localhost if db is hosted on same machine or could be the ip addr of the domain name of remote server
    $username = "root"; # authorised user
    $password = ""; # password
    $connection = mysqli_connect($server, $username, $password);
    mysqli_select_db($connection, 'react-crud');
    $sql = "SELECT * FROM `react-crud-table`";
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
}

