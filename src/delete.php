<?php
include 'db-connect.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $lastName = $_POST['delLast'];

    $deleteDB = "DELETE FROM `contact-info` WHERE lastName = ?";
    $prepDel = $dbcon->prepare($deleteDB);
    $prepDel->bind_param("s", $lastName);

    if($prepDel->execute()) {
        echo "Deleted successful";
    }




    $prepDel->close();
    $dbcon->close();
}
