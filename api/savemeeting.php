<?php
	//print_r($_POST);
	session_start();
	include('connection.php');

	$sql = "SELECT email FROM webinar_info WHERE email='".$_POST['email']."'";
	$result = mysqli_query($conn, $sql);

	if (mysqli_num_rows($result) > 0) {
	    $data['status'] = 409;
		$data['msg'] = "Meeting already exist for this email";
	    echo json_encode($data);

	} else {
	    $sql = "INSERT INTO `webinar_info`(`webinar_id`,`occurrence_ids`, `email`, `first_name`, `last_name`, `address`,`city`,`country`,`zip`,`state`, `phone`) VALUES ('".$_POST['webinar_id']."','".$_POST['occurrence_ids']."','".$_POST['email']."','".$_POST['fname']."','".$_POST['lname']."','".$_POST['address']."','".$_POST['city']."','".$_POST['country']."','".$_POST['zipcode']."','".$_POST['state']."','".$_POST['phone']."')";
		if (mysqli_query($conn, $sql)) {
			
			$params = $_POST;
			$zoom_response =  registerUser($params);
	
			$data['status'] = 200;
			$data['zoom_response'] = $zoom_response;
			$data['msg'] = "Meeting save successfully";
		    echo json_encode($data);

		} else {
		    $data['status'] = 201;
			$data['msg'] = mysqli_error($conn);
		    echo json_encode($data);
		}

	}
	
	mysqli_close($conn);



	function registerUser($post)
	{
	  
	    $authentication = base64_encode("qW8P5KYhTaWc5UgqN0EQFQ:Y21Z76rdMe77RXxymNGEr2OuiMUpcuGW");
	    $authCode = $_SESSION['auth_code'];
	   	$webinarId = $post['webinar_id'];
	   	$occurrence_ids = $post['occurrence_ids'];
	   	$authToken = $_SESSION['token'];

	   	$data =  array(
	   		'email' => $post['email'],
			'first_name' => $post['fname'],
			'last_name' => $post['lname'],
			'address' => $post['address'],
			'city' => $post['city'],
			'country' => $post['country'],
			'zip' => $post['zipcode'],
			'state' => $post['state'],
			'phone' => $post['phone'],
	   	);

	   	$data_string = json_encode($data);                                                                                   

	    $url = "https://api.zoom.us/v2/webinars/".$webinarId."/registrants?occurrence_ids".$occurrence_ids;
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
	            CURLOPT_POSTFIELDS     => $data_string,    // this are my post vars
	            CURLOPT_SSL_VERIFYHOST => 0,            // don't verify ssl
	            CURLOPT_SSL_VERIFYPEER => false,        //
	            CURLOPT_VERBOSE        => 1,
	            CURLOPT_HTTPHEADER     => array(
	                //"Authorization: Basic $authentication",
	                "authorization: Bearer ".$authToken,
	                "Content-Type: application/json"
	            )

	    );

	    curl_setopt_array($ch,$options);
	    $data = curl_exec($ch);
	  	
	    //$_SESSION['token'] = json_decode($data)->access_token;
	    $curl_errno = curl_errno($ch);
	    $curl_error = curl_error($ch);
	    //echo $curl_errno;
	    //echo $curl_error;
	    curl_close($ch);
	    
	    return json_decode($data);
	}


?>