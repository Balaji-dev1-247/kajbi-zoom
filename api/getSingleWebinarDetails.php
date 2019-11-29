<?php
    //include("getauthcode.php");
    session_start();

    if(isset($_GET['webinarId'])){
         
        $curl = curl_init();

        $webinarId = $_GET['webinarId'];


        $authToken = $_SESSION['token'];

        curl_setopt_array($curl, array(
        CURLOPT_URL => "https://api.zoom.us/v2/webinars/".$webinarId,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => "",
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 30,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => "GET",
        CURLOPT_HTTPHEADER => array(
            "authorization: Bearer".$authToken),
        ));
        $response = curl_exec($curl);
        
        if (isset(json_decode($data)->code)) {
            unset($_SESSION["token"]);
        }

        $err = curl_error($curl);
        curl_close($curl);
        if ($err) {
            echo "cURL Error #:" . $err;
        } else {
            echo $response;
        }
    }

?>

