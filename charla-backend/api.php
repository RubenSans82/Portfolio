<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Accept, Origin');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    $message = $input['message'] ?? '';
    
    // Respuesta simple sin IA
    $response = [
        'status' => 'ok',
        'reply' => 'Hola! Sistema funcionando correctamente. Tu mensaje: ' . $message,
        'timestamp' => date('Y-m-d H:i:s')
    ];
    
    echo json_encode($response);
} else {
    echo json_encode([
        'status' => 'ready',
        'message' => 'Sistema operativo',
        'timestamp' => date('Y-m-d H:i:s')
    ]);
}
?>
