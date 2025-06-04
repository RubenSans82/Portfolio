<?php
// Test ultra-simple sin palabras que puedan ser filtradas
header('Content-Type: text/plain; charset=UTF-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Accept, Origin');

echo "OK - Sistema funcionando";
echo "\nFecha: " . date('Y-m-d H:i:s');
echo "\nPHP: " . phpversion();
echo "\nServidor: " . ($_SERVER['HTTP_HOST'] ?? 'unknown');
?>
