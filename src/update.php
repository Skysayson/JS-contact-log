<?php
include 'db-connect.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $lastName = $_POST['updateLast'];
    $choice = $_POST['updateChoice'];
    $newField = $_POST['newUpdate'];

    $query = "SELECT * FROM `contact-info` WHERE lastName = ?";
    $queryPrep = $dbcon->prepare($query);
    $queryPrep->bind_param("s", $lastName);

    $queryPrep->execute();

    $result = $queryPrep->get_result();

    if ($result->num_rows > 0) {
        switch ($choice) {
            case 1:
                $updateLast = "UPDATE `contact-info` SET lastName = ?";
                $updateLastQuery = $dbcon->prepare($updateLast);
                $updateLastQuery->bind_param("s", $newField);
                if ($updateLastQuery->execute()) {
                    echo "Update successful";
                } else {
                    echo "Failed to update";
                }
                break;

            case 2:
                $updateFirst = "UPDATE `contact-info` SET firstName = ?";
                $updateFirstQuery = $dbcon->prepare($updateFirst);
                $updateFirstQuery->bind_param("s", $newField);
                if ($updateFirstQuery->execute()) {
                    echo "Update successful";
                } else {
                    echo "Failed to update";
                }
                break;

            case 3:
                $updateEmail = "UPDATE `contact-info` SET email = ?";
                $updateEmailQuery = $dbcon->prepare($updateEmail);
                $updateEmailQuery->bind_param("s", $newField);
                if ($updateEmailQuery->execute()) {
                    echo "Update successful";
                } else {
                    echo "Failed to update";
                }
                break;

            case 4:
                $updateContact = "UPDATE `contact-info` SET contact = ?";
                $updateContactQuery = $dbcon->prepare($updateContact);
                $updateContactQuery->bind_param("s", $newField);
                if ($updateContactQuery->execute()) {
                    echo "Update successful";
                } else {
                    echo "Failed to update";
                }
                break;

            default:
                echo "Invalid choice";
                break;
        }
    } else {
        echo "No records found for the given lastname";
    }
}
?>
