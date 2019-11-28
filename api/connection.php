<?php
$servername = "localhost";
$username = "xoyal";
$password = "xoyal";
$database = "db_crm";

// Create connection
$conn = mysqli_connect($servername, $username, $password,$database);

// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

?>