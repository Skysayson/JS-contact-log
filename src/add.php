<?php

include 'db-connect.php';

if($_SERVER['REQUEST_METHOD'] === 'POST') {
    $lastName = $_POST['last_name'];
    $firstName = $_POST['first_name'];
    $email = $_POST['email'];
    $contactNum = $_POST['contact_num'];

    if($dbcon->connect_error) {
        echo 'bad connection';
    } else {
        echo 'successful connection';
    }

    $insertdb = "INSERT INTO `contact-info` (lastName, firstName, email, contact)
                VALUES(?, ?, ?, ?)";
    $prepInsert = $dbcon->prepare($insertdb);
    $prepInsert->bind_param("ssss",$lastName, $firstName, $email, $contactNum);

    if($prepInsert->execute()) {
        echo "Data entry successful";
    } else {
        echo "Entry failed";
    }

    $prepInsert->close();
    $dbcon->close();
}