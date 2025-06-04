<?php
/**
 * Test simple para verificar que PHP funciona
 */

// Headers CORS
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Responder a preflight OPTIONS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Test de conectividad
$response = [
    'success' => true,
    'message' => '¡Conectividad OK! El servidor PHP está funcionando.',
    'timestamp' => date('Y-m-d H:i:s'),
    'server_info' => [
        'php_version' => phpversion(),
        'server_time' => date('Y-m-d H:i:s'),
        'request_method' => $_SERVER['REQUEST_METHOD']
    ]
];

echo json_encode($response, JSON_PRETTY_PRINT);
?>
