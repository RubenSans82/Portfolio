<?php
/**
 * Chat IA Backend - Portfolio Rubén Sans Acevedo
 * API Endpoint para comunicación con Google Gemini
 */

// Configuración de headers CORS y JSON
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Manejar preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Solo permitir POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Método no permitido']);
    exit();
}

// Cargar configuración
$config = require_once 'config.php';

try {
    // Leer y validar input
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (!$input || !isset($input['message'])) {
        throw new Exception('Mensaje requerido');
    }
    
    $message = trim($input['message']);
    
    // Validar longitud del mensaje
    if (empty($message)) {
        throw new Exception('El mensaje no puede estar vacío');
    }
    
    if (strlen($message) > $config['max_message_length']) {
        throw new Exception('El mensaje es demasiado largo');
    }
    
    // Preparar prompt con contexto
    $systemPrompt = $config['system_prompt'];
    $userMessage = $message;
    
    // Construir el prompt completo
    $fullPrompt = $systemPrompt . "\n\nUsuario: " . $userMessage . "\n\nAsistente:";
    
    // Preparar datos para la API de Google Gemini
    $postData = [
        'contents' => [
            [
                'parts' => [
                    [
                        'text' => $fullPrompt
                    ]
                ]
            ]
        ],
        'generationConfig' => [
            'temperature' => $config['temperature'],
            'maxOutputTokens' => $config['max_tokens']
        ]
    ];
    
    // URL de la API de Google Gemini
    $apiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/' . $config['model'] . ':generateContent?key=' . $config['api_key'];
    
    // Configurar cURL
    $ch = curl_init();
    curl_setopt_array($ch, [
        CURLOPT_URL => $apiUrl,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => json_encode($postData),
        CURLOPT_HTTPHEADER => [
            'Content-Type: application/json',
        ],
        CURLOPT_TIMEOUT => 30,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_SSL_VERIFYPEER => false
    ]);
    
    // Ejecutar petición
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $curlError = curl_error($ch);
    curl_close($ch);
    
    // Verificar errores de cURL
    if ($curlError) {
        throw new Exception('Error de conexión: ' . $curlError);
    }
    
    // Verificar código de respuesta HTTP
    if ($httpCode !== 200) {
        throw new Exception('Error de API (HTTP ' . $httpCode . ')');
    }
    
    // Decodificar respuesta
    $responseData = json_decode($response, true);
    
    if (!$responseData) {
        throw new Exception('Respuesta inválida de la API');
    }
    
    // Extraer el mensaje de respuesta
    if (isset($responseData['candidates'][0]['content']['parts'][0]['text'])) {
        $aiResponse = trim($responseData['candidates'][0]['content']['parts'][0]['text']);
        
        // Respuesta exitosa
        echo json_encode([
            'success' => true,
            'message' => $aiResponse,
            'timestamp' => date('Y-m-d H:i:s')
        ]);
        
    } else {
        throw new Exception('Formato de respuesta inesperado');
    }
    
} catch (Exception $e) {
    // Manejo de errores
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage(),
        'timestamp' => date('Y-m-d H:i:s')
    ]);
}
?>
