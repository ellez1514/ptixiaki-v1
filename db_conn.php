<?php
$conn = mysqli_connect("localhost","root","","test",3306);

// Check connection
if ($conn -> connect_errno) {
  echo "Failed to connect to MySQL: " . $conn -> connect_error;
  exit();
}

?>

