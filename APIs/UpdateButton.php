<?php
	include_once('db_conn.php');
	$task = isset($_GET['task']) ? mysqli_real_escape_string($conn, $_GET['task']) :  "";
	$sql = "SELECT UpdateButton FROM device_status ORDER BY id DESC LIMIT 1";
	$get_data_query = mysqli_query($conn, $sql) or die(mysqli_error($conn));
		if(mysqli_num_rows($get_data_query)!=0){
		$result = array();
		
		while($r = mysqli_fetch_array($get_data_query)){
			extract($r);
			$result = $UpdateButton;
		}
		$json =  $result;
	}
	else{
		$json = array("status" => 0, "error" => "To-Do not found!");
	}
@mysqli_close($conn);
// Set Content-type to JSON
header('Content-type: application/json');
echo json_encode($json);
?>