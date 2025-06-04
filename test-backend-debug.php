<?php
/**
 * Debug script para verificar qué datos recibe el backend
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Obtener todos los datos de entrada
$rawInput = file_get_contents('php://input');
$jsonInput = json_decode($rawInput, true);

$debug = [
    'method' => $_SERVER['REQUEST_METHOD'],
    'content_type' => $_SERVER['CONTENT_TYPE'] ?? 'No definido',
    'raw_input' => $rawInput,
    'json_decoded' => $jsonInput,
    'json_error' => json_last_error_msg(),
    'input_length' => strlen($rawInput),
    'post_data' => $_POST,
    'get_data' => $_GET
];

echo json_encode($debug, JSON_PRETTY_PRINT);
?>
