<?php
//API: GET INFO FOR FREATIO
	include_once('db_conn.php');
	$task = isset($_GET['task']) ? mysqli_real_escape_string($conn, $_GET['task']) :  "";
	$sql = "SELECT * FROM device_status ORDER BY id DESC LIMIT 1"; //SELECT * FROM `device_error`order by id DESC LIMIT 10
	$get_data_query = mysqli_query($conn, $sql) or die(mysqli_error($conn));
		if(mysqli_num_rows($get_data_query)!=0){
		$result = array();
		
		while($r = mysqli_fetch_array($get_data_query)){
			extract($r);
			$result[] = array("id" => $id, "device_id" => $device_id, 'humidity' => $humidity,'waterSensor' => $waterSensor,'FloaterSensor' => $FloaterSensor,"isFloated" => $isFloated, "date" => $date, "RainingBool" => $RainingBool, "weatherStatus" => $weatherStatus );
		}
		$json = array("info" => $result);
	}
	else{
		$json = array("status" => 0, "error" => "To-Do not found!");
	}
@mysqli_close($conn);
// Set Content-type to JSON
header('Content-type: application/json');
echo json_encode($json);
?>
