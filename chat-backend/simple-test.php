<?php
// Test básico para InfinityFree
header('Content-Type: text/plain');
echo "PHP OK - " . date('Y-m-d H:i:s') . "\n";
echo "Server: " . $_SERVER['SERVER_NAME'] . "\n";
echo "PHP Version: " . phpversion() . "\n";
echo "Request Method: " . $_SERVER['REQUEST_METHOD'] . "\n";
?>
