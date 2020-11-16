<?php
    //values for connection to DB
    $dbusername = "root";
    $dbpwd = "";
    $server = "localhost";
    $My_db = "test;
    //connection to DB
    $dbconnect = mysql_pconnect($server,$dbusername, $dbpwd);
    //prepare sql statement
    $sql = "INSERT INTO `device_status`(`id`, `device_id`, `ultrasonicSensor`, `waterSensor`, `FloaterSensor`, `isFloated`, `date`) VALUES ('".$_GET["data1"]."','".$_GET["data2"]."','".$_GET["data3"]."','".$_GET["data4"]."','".$_GET["data5"]."','".$_GET["data6"]."','".$_GET["data7"]."')";
    //execute SQL query
    mysql_query($sql);
