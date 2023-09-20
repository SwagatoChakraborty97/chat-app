<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

$request_type = $_SERVER['REQUEST_METHOD'];
// print_r($request_type);
if ($request_type == "POST"){
    # STEP 1 - Collect Login Email and Login Password
    $data = json_decode(file_get_contents("php://input"));
    // print_r($data);

    $login_email = $data->login_email;
    $login_pswrd = $data->login_pswrd;

    # STEP 2 - Try to match the mail and password in hashmap(user_lists.json)

    // echo "<br>";    
    // STEP 1 - Read Existing Files From JSON and store them in jsonData(in form of string)
    $jsonFile = 'user_lists.json';
    $jsonData = file_get_contents($jsonFile);
    
    // STEP 2 - DECODE the data stored in jsonData to hashmap
    $userDetails_hm = json_decode($jsonData, true);
    // print_r($userDetails_hm);

    if (array_key_exists($login_email, $userDetails_hm)) {
        // echo "YES";
        $hashed_password = $userDetails_hm[$login_email];
        // echo $hashed_password;

        if (password_verify($login_pswrd, $hashed_password)){
            // echo "Password matched";
            // $response = 1;
            $response = array("message" => "Password matched");
        }
        else{
            // echo "Password did not match";
            // $response = 0;
            $response = array("message" => "Wrong Password");
        }

    } else {
        // echo "NO";
        // $response = -1;
        $response = array("message" => "Invalid Email");
    }
    echo json_encode($response);
}
else{
    echo "Failed";
}

