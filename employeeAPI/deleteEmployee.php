<?php
// Include database connection
require 'connect.php';

// Set content type to JSON for API responses
header('Content-Type: application/json');

// Get ID from query parameters and validate it
$id = isset($_GET['id']) ? intval($_GET['id']) : 0;

// Check if ID is valid
if ($id <= 0) {
    http_response_code(400); // Bad Request
    echo json_encode(['error' => 'Invalid employee ID']);
    exit;
}

// Prepare SQL statement using prepared statements to prevent SQL injection
$sqlQuery = "DELETE FROM employees WHERE id = ? LIMIT 1";
$stmt = $connect->prepare($sqlQuery);

if ($stmt === false) {
    http_response_code(500); // Internal Server Error
    echo json_encode(['error' => 'Database error: ' . $connect->error]);
    exit;
}

// Bind the ID parameter to the prepared statement
$stmt->bind_param('i', $id);

// Execute the statement and check if it was successful
if ($stmt->execute()) {
    if ($stmt->affected_rows > 0) {
        http_response_code(204); // No Content
    } else {
        http_response_code(404); // Not Found, ID might not exist
        echo json_encode(['error' => 'Employee not found']);
    }
} else {
    http_response_code(500); // Internal Server Error
    echo json_encode(['error' => 'Failed to delete employee: ' . $stmt->error]);
}

// Close the statement and connection
$stmt->close();
$connect->close();
?>
