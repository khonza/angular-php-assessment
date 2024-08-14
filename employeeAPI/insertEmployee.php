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
        if (!isset($request->firstName, $request->lastName, $request->email, $request->phoneNumber, $request->message)) {
            http_response_code(400); // Bad Request
            echo json_encode(["error" => "Missing required fields"]);
            exit;
        }

        // Sanitize inputs
        $firstName = trim($request->firstName);
        $lastName = trim($request->lastName);
        $email = trim($request->email);
        $phoneNumber = trim($request->phoneNumber);
        $message = trim($request->message);

        // Prepare SQL query
        $sqlQuery = "INSERT INTO `employees` (
            `firstName`, 
            `lastName`, 
            `email`, 
            `phoneNumber`, 
            `message`, 
            `created`, 
            `lastUpdated`
        ) VALUES (
            ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
        );";

        if ($stmt = mysqli_prepare($connect, $sqlQuery)) {
            // Bind parameters
            mysqli_stmt_bind_param($stmt, 'sssss', $firstName, $lastName, $email, $phoneNumber, $message);

            // Execute statement
            if (mysqli_stmt_execute($stmt)) {
                http_response_code(204); // No Content
                echo json_encode(["success" => "Record inserted successfully"]);
            } else {
                // Log error message
                error_log("Error executing query: " . mysqli_stmt_error($stmt), 3, 'php_errors.log');
                http_response_code(500); // Internal Server Error
                echo json_encode(["error" => "Failed to insert record"]);
            }

            // Close statement
            mysqli_stmt_close($stmt);
        } else {
            // Log error message
            error_log("Error preparing query: " . mysqli_error($connect), 3, '/var/log/my_php_errors.log');
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
