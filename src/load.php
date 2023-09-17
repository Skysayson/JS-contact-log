<?php
include 'db-connect.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $query = "SELECT lastName, firstName, email, contact FROM `contact-info`";
    $result = $dbcon->query($query);

    if ($result) {
        $contacts = [];
        while ($row = $result->fetch_assoc()) {
            $contacts[] = $row;
        }

        // Close the result set
        $result->close();

        header('Content-Type: application/json');

        // Send the contacts as JSON response
        echo json_encode($contacts);
    } else {
        // Handle the query error here
        echo json_encode(['error' => 'Failed to fetch contacts']);
    }
}
?>
