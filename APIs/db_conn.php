<?php
$conn = mysqli_connect("localhost","root","","test",3306);

// Check connection
if ($conn -> connect_errno) {
  echo "Failed to connect to MySQL: " . $conn -> connect_error;
  exit();
}

// Print host information
//echo "Connect Successfully. Host info: " . mysqli_get_host_info($link);

//$sql = "SELECT device_id, ultrasonicSensor, waterSensor, FloaterSensor FROM device_status ORDER BY id DESC";
//$result = $conn->query($sql);


//if ($result->num_rows > 0) {
    // output data of each row
    //while($row = $result->fetch_assoc()) {
        
   //}
//} else {
    //echo "0 results";
//}

?>

