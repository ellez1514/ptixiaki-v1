<?php
    include_once('db_conn.php');
    //prepare sql statement

  //if(!empty($_POST['sensor1']) || !empty($_POST['sensor2']))
    if($_SERVER['REQUEST_METHOD'] == "POST")
    //if (isset($_GET['sensor1']) || isset($_GET['sensor2']) ) 
    {
    // Get data from the REST client
        $task = isset($_POST['task']) ? mysqli_real_escape_string($conn, $_POST['task']) : "";
        $date = isset($_POST['date']) ? mysqli_real_escape_string($conn, $_POST['date']) : "";
        $priority = isset($_POST['priority']) ? mysqli_real_escape_string($conn, $_POST['priority']) : "";

        $dateAfterTimer = $_GET['timer'];



        //na pernei tin proigoumeni timi twn dateAfter30 and rainingbool
        $sql = "UPDATE `device_status` SET `dateAfterWater`='".$dateAfterTimer."' ORDER BY id DESC LIMIT 1";
        /*if ($conn->query($sql) === TRUE) {
            echo "OK";
        } else {
            echo "Error: " . $sql . "<br>" . $conn->error;
        }*/
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

    //$conn->close();
?>