<?php
//POST error to table
	include_once('db_conn.php');
	if($_SERVER['REQUEST_METHOD'] == "POST"){
		// Get data from the REST client
		$task = isset($_POST['task']) ? mysqli_real_escape_string($conn, $_POST['task']) : "";
		$date = isset($_POST['date']) ? mysqli_real_escape_string($conn, $_POST['date']) : "";
		$priority = isset($_POST['priority']) ? mysqli_real_escape_string($conn, $_POST['priority']) : "";
        
        $id;
        $device_id;
        $device_code = 50;
		$description = 'Floater is blocked';


		//Get values from another table
        $sql1 = "SELECT * FROM device_status ORDER BY id DESC LIMIT 1";
		$get_data_query = mysqli_query($conn, $sql1) or die(mysqli_error($conn));
			if(mysqli_num_rows($get_data_query)!=0){
			
			if (mysqli_num_rows($get_data_query) > 0) {
              while($row = mysqli_fetch_assoc($get_data_query)) {
               $id = $row["id"];
               $device_id =  $row["device_id"];     
              }
			}
		}

		// Insert data into database
		$sql = "INSERT INTO `device_error`(`status_id`, `device_id`, `device_code`, `description`, `date`) VALUES ('.$id.','$device_id',50,'Floater is blocked',now())";


		$post_data_query = mysqli_query($conn, $sql);
		if($post_data_query){
			$json = array("status" => 1, "Success" => "To-Do has been added successfully!");
		}
		else{
			$json = array("status" => 0, "Error" => "Error adding To-Do! Please try again!");
		}
	}
	else{
		$json = array("status" => 0, "Info" => "Request method not accepted!");
	}
	@mysqli_close($conn);
	// Set Content-type to JSON
	header('Content-type: application/json');
	echo json_encode($json);

	//http://localhost/ptixiaki%20v1/APIs/postErrorFloater.php (POST API)

?>