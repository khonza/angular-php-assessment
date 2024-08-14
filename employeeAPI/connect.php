<?php
header("Access-Control-Allow-Origin: *"); 
header('Access-Control-Allow-Origin: http://localhost', false);
// db credentials
define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_NAME', 'employee_data');

// connect to database
$connect = mysqli_connect(DB_HOST, DB_USER, DB_PASS, DB_NAME);

if(mysqli_connect_errno()) {
    die("Failed to connect to database" . mysqli_connect_error());
}

mysqli_set_charset($connect, 'utf8');

return $connect;
?>