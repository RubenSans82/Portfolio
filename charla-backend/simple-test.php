<?php
/**
 * Test simple para verificar que PHP funciona
 */

// Headers CORS
header('Content-Type: text/html; charset=UTF-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Accept, Origin');

// Manejar OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

echo "✅ PHP funcionando correctamente!\n";
echo "📅 Fecha: " . date('Y-m-d H:i:s') . "\n";
echo "🔧 Versión PHP: " . phpversion() . "\n";
echo "🌐 Servidor: " . $_SERVER['HTTP_HOST'] . "\n";
echo "📂 Script: " . $_SERVER['SCRIPT_NAME'] . "\n";
?>
