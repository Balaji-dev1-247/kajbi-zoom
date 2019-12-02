<?php
    include("constants.php");
    session_start();

   // print_r($_SESSION);
    if(isset($_GET['Type'])){
         
        $curl = curl_init();

        $authToken = isset($_SESSION['token']) && $_SESSION['token'] !="" ? $_SESSION['token'] : "";

        if( $authToken == "" ){
          
            getAutorizationCode();    
            $authToken = $_SESSION['token'];
        }

        $userId = USER_ID;
        curl_setopt_array($curl, array(
        CURLOPT_URL => "https://api.zoom.us/v2/users/?page_number=1&page_size=100&status=active",
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
        
        if (isset(json_decode($response)->code)) {
            unset($_SESSION["token"]);
            session_destroy();
        }

        $err = curl_error($curl);
        curl_close($curl);
        if ($err) {
            
            echo "cURL Error #:" . $err;
        } else {
            echo $response;
        }
    }

    function getAutorizationCode()
    {
        $request="";
        $appKey= APP_KEY;
        $appSecret = APP_SECRET;
        $authentication = base64_encode("$appKey:$appSecret");
        $authCode = $_SESSION['auth_code'];
        $redirectUrl = REDIRECT_URL;
        $url = "https://zoom.us/oauth/token?grant_type=authorization_code&code=".$authCode."&redirect_uri=$redirectUrl";
        $ch = curl_init($url);
        $options = array(
                CURLOPT_RETURNTRANSFER => true,         // return web page
                CURLOPT_HEADER         => false,        // don't return headers
                CURLOPT_FOLLOWLOCATION => false,         // follow redirects
               // CURLOPT_ENCODING       => "utf-8",           // handle all encodings
                CURLOPT_AUTOREFERER    => true,         // set referer on redirect
                CURLOPT_CONNECTTIMEOUT => 20,          // timeout on connect
                CURLOPT_TIMEOUT        => 20,          // timeout on response
                CURLOPT_POST            => 1,            // i am sending post data
                CURLOPT_POSTFIELDS     => $request,    // this are my post vars
                CURLOPT_SSL_VERIFYHOST => 0,            // don't verify ssl
                CURLOPT_SSL_VERIFYPEER => false,        //
                CURLOPT_VERBOSE        => 1,
                CURLOPT_HTTPHEADER     => array(
                    "Authorization: Basic $authentication",
                    "Content-Type: application/json"
                )

        );

        curl_setopt_array($ch,$options);
        $data = curl_exec($ch);
       // print_r($data);
        $_SESSION['token'] = json_decode($data)->access_token;
        $curl_errno = curl_errno($ch);
        $curl_error = curl_error($ch);
        //echo $curl_errno;
        //echo $curl_error;
        curl_close($ch);
        
        //return json_decode($data)->access_token;
    }

?>

