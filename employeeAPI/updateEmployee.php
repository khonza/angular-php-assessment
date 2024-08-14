<?php
    require 'connect.php';

    // Set content type to JSON
    header('Content-Type: application/json');

    // Retrieve and decode POST data
    $postData = file_get_contents("php://input");

    // Check if POST data is received
    if (isset($postData) && !empty($postData)) {
        $request = json_decode($postData);

        // Validate required fields
        if (!isset($request->id, $request->firstName, $request->lastName, $request->email, $request->phoneNumber, $request->message)) {
            http_response_code(400); // Bad Request
            echo json_encode(["error" => "Missing required fields"]);
            exit;
        }

        // Sanitize inputs
        $id = trim($request->id);
        $firstName = trim($request->firstName);
        $lastName = trim($request->lastName);
        $email = trim($request->email);
        $phoneNumber = trim($request->phoneNumber);
        $message = trim($request->message);

        // Prepare SQL query
        $sqlQuery = "UPDATE `employees`
            SET 
                `firstName` = ?,
                `lastName` = ?,
                `email` = ?,
                `phoneNumber` = ?,
                `message` = ?,
                `lastUpdated` = CURRENT_TIMESTAMP
            WHERE `id` = ?;";

        if ($stmt = mysqli_prepare($connect, $sqlQuery)) {
            // Bind parameters
            mysqli_stmt_bind_param($stmt, 'sssssi', $firstName, $lastName, $email, $phoneNumber, $message, $id);

            // Execute statement
            if (mysqli_stmt_execute($stmt)) {
                // Check if any rows were affected
                if (mysqli_stmt_affected_rows($stmt) > 0) {
                    http_response_code(204); // No Content
                    echo json_encode(["success" => "Record updated successfully"]);
                } else {
                    // No rows affected (possibly no record with the given ID)
                    http_response_code(404); // Not Found
                    echo json_encode(["error" => "Record not found"]);
                }
            } else {
                // Log error message
                error_log("Error executing query: " . mysqli_stmt_error($stmt), 3, '/var/log/my_php_errors.log');
                http_response_code(500); // Internal Server Error
                echo json_encode(["error" => "Failed to update record"]);
            }

            // Close statement
            mysqli_stmt_close($stmt);
        } else {
            // Log error message
            error_log("Error preparing query: " . mysqli_error($connect), 3, 'php_errors.log');
            http_response_code(500); // Internal Server Error
            echo json_encode(["error" => "Failed to prepare query"]);
        }
    } else {
        http_response_code(400); // Bad Request
        echo json_encode(["error" => "No input data received"]);
    }

    // Close connection
    mysqli_close($connect);
?>
