<?php
/**
 * Test de conectividad para el backend
 */

// Headers CORS
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Accept, Origin');
header('Access-Control-Max-Age: 86400');

// Manejar OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$response = [
    'status' => 'success',
    'message' => '✅ Backend funcionando correctamente',
    'timestamp' => date('Y-m-d H:i:s'),
    'server_info' => [
        'php_version' => phpversion(),
        'server' => $_SERVER['HTTP_HOST'] ?? 'N/A',
        'request_method' => $_SERVER['REQUEST_METHOD'],
        'script_name' => $_SERVER['SCRIPT_NAME'] ?? 'N/A'
    ],
    'headers' => getallheaders() ?: []
];

echo json_encode($response, JSON_PRETTY_PRINT);
?>
