<?php
include("constants.php");

$servername = SERVER_NAME;
$username =  USER_NAME;
$password = PASSWORD;
$database = DATABASE;

// Create connection
$conn = mysqli_connect($servername, $username, $password,$database);

// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

?>