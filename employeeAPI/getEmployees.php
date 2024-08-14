<?php
require 'connect.php';
header('Content-Type: application/json');
error_reporting(E_ERROR);

function getEmployees($connect, $id = null) {
    $employees = [];

    try {
        // Prepare SQL query based on the presence of $id
        if ($id !== null) {
            $sqlQuery = "SELECT * FROM employees WHERE id = ?";
            $stmt = $connect->prepare($sqlQuery);
            $stmt->bind_param("i", $id);
        } else {
            $sqlQuery = "SELECT * FROM employees";
            $stmt = $connect->prepare($sqlQuery);
        }

        // Execute the query
        if (!$stmt->execute()) {
            throw new Exception('Query execution failed: ' . $stmt->error);
        }

        $result = $stmt->get_result();
        
        // Fetch data
        while ($row = $result->fetch_assoc()) {
            $employees[] = [
                'id' => $row['id'],
                'firstName' => $row['firstName'],
                'lastName' => $row['lastName'],
                'email' => $row['email'],
                'phoneNumber' => $row['phoneNumber'],
                'message' => $row['message'],
                'lastUpdated' => $row['lastUpdated'],
                'created' => $row['created']
            ];
        }

        // Output JSON
        echo json_encode($employees);

    } catch (Exception $e) {
        // Handle errors
        http_response_code(500);
        echo json_encode(['error' => $e->getMessage()]);
    } finally {
        // Close the statement
        if (isset($stmt)) {
            $stmt->close();
        }
    }
}

// Get ID from request parameters
$id = isset($_GET['id']) ? intval($_GET['id']) : null;

// Call the function to get employees
getEmployees($connect, $id);
?>