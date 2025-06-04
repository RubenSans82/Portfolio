/* ===== CHAT IA FLOTANTE - JavaScript ===== */

class ChatAI {
    constructor() {        // Configuración
        this.config = {
            // Para desarrollo local, usar backend local
            // Para producción desde GitHub Pages, cambiar a la URL de InfinityFree
            apiUrl: window.location.hostname === 'localhost' 
                ? 'http://localhost/MF0493_3/chat-backend/index.php'  // Backend local para desarrollo
                : 'https://phprubensans.wuaze.com/index.php',         // Backend producción
            welcomeMessage: '¡Hola! Soy el asistente virtual de Rubén. Puedo contarte sobre su experiencia, proyectos, habilidades técnicas y ayudarte con cualquier consulta sobre su perfil profesional. ¿En qué puedo ayudarte?',
            placeholder: 'Pregúntame sobre Rubén...',
            loadingMessage: 'Escribiendo...'
        };
        
        this.isOpen = false;
        this.isLoading = false;
        this.messageHistory = [];
        
        this.init();
    }
    
    init() {
        this.createChatElements();
        this.bindEvents();
        this.addWelcomeMessage();
    }
    
    createChatElements() {
        // Crear botón flotante
        this.floatButton = document.createElement('button');
        this.floatButton.className = 'chat-float-button';
        this.floatButton.innerHTML = '<i class="fas fa-comments"></i>';
        this.floatButton.setAttribute('aria-label', 'Abrir chat con IA');
        
        // Crear contenedor del chat
        this.chatContainer = document.createElement('div');
        this.chatContainer.className = 'chat-container';
        this.chatContainer.innerHTML = `
            <div class="chat-header">
                <h3>💬 Chat con Rubén</h3>
                <button class="chat-close" aria-label="Cerrar chat">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="chat-messages" id="chat-messages"></div>
            <div class="chat-input-area">
                <textarea 
                    class="chat-input" 
                    id="chat-input" 
                    placeholder="${this.config.placeholder}"
                    rows="1"
                ></textarea>
                <button class="chat-send" id="chat-send" aria-label="Enviar mensaje">
                    <i class="fas fa-paper-plane"></i>
                </button>
            </div>
        `;
        
        // Añadir al DOM
        document.body.appendChild(this.floatButton);
        document.body.appendChild(this.chatContainer);
        
        // Referencias a elementos
        this.messagesContainer = document.getElementById('chat-messages');
        this.chatInput = document.getElementById('chat-input');
        this.sendButton = document.getElementById('chat-send');
        this.closeButton = this.chatContainer.querySelector('.chat-close');
    }
    
    bindEvents() {
        // Botón flotante
        this.floatButton.addEventListener('click', () => this.toggleChat());
        
        // Botón cerrar
        this.closeButton.addEventListener('click', () => this.closeChat());
        
        // Enviar mensaje
        this.sendButton.addEventListener('click', () => this.sendMessage());
        
        // Enter para enviar (Shift+Enter para nueva línea)
        this.chatInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });
        
        // Auto-resize del textarea
        this.chatInput.addEventListener('input', () => this.autoResizeInput());
        
        // Cerrar con ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.closeChat();
            }
        });
        
        // Cerrar al hacer clic fuera
        document.addEventListener('click', (e) => {
            if (this.isOpen && 
                !this.chatContainer.contains(e.target) && 
                !this.floatButton.contains(e.target)) {
                this.closeChat();
            }
        });
    }
    
    toggleChat() {
        if (this.isOpen) {
            this.closeChat();
        } else {
            this.openChat();
        }
    }
    
    openChat() {
        this.isOpen = true;
        this.floatButton.classList.add('active');
        this.chatContainer.classList.add('active', 'fade-in');
        
        // Focus en input después de la animación
        setTimeout(() => {
            this.chatInput.focus();
        }, 300);
        
        // Scroll al último mensaje
        this.scrollToBottom();
    }
    
    closeChat() {
        this.isOpen = false;
        this.floatButton.classList.remove('active');
        this.chatContainer.classList.remove('active', 'fade-in');
    }
    
    addWelcomeMessage() {
        this.addMessage(this.config.welcomeMessage, 'welcome');
        // Agregar opción de test de conectividad
        this.addMessage('💡 Tip: Si tienes problemas de conexión, escribe "/test" para probar la conectividad del servidor.', 'info');
    }
    
    addMessage(content, type = 'ai', animate = true) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${type}`;
        
        if (type === 'loading') {
            messageDiv.innerHTML = `
                <div class="typing-indicator">
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                </div>
                <span>${content}</span>
            `;
        } else {
            messageDiv.textContent = content;
        }
        
        this.messagesContainer.appendChild(messageDiv);
        
        if (animate) {
            this.scrollToBottom();
        }
        
        return messageDiv;
    }
    
    async sendMessage() {
        const message = this.chatInput.value.trim();
        
        if (!message || this.isLoading) return;
          // Comando especial para test de conectividad
        if (message === '/test') {
            // Mostrar que se recibió el comando
            this.addMessage('/test', 'user');
            this.chatInput.value = '';
            this.testConnection();
            return;
        }
        
        // Añadir mensaje del usuario
        this.addMessage(message, 'user');
        this.chatInput.value = '';
        this.autoResizeInput();
        
        // Mostrar indicador de carga
        this.isLoading = true;
        this.sendButton.disabled = true;
        const loadingMessage = this.addMessage(this.config.loadingMessage, 'loading');
          try {
            // Debug: Mostrar información de la petición
            console.log('🔗 Intentando conectar con:', this.config.apiUrl);
            console.log('📤 Enviando mensaje:', message);
            
            // Llamar a la API
            const response = await fetch(this.config.apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: message })
            });
            
            console.log('📡 Respuesta del servidor:', response.status, response.statusText);
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            const data = await response.json();
            console.log('📥 Datos recibidos:', data);
            
            // Eliminar mensaje de carga
            loadingMessage.remove();
            
            if (data.success) {
                // Añadir respuesta de la IA
                this.addMessage(data.message, 'ai');
                
                // Guardar en historial
                this.messageHistory.push({
                    user: message,
                    ai: data.message,
                    timestamp: data.timestamp
                });
            } else {
                throw new Error(data.error || 'Error desconocido');
            }
              } catch (error) {
            console.error('❌ Error detallado en chat:', error);
            
            // Eliminar mensaje de carga
            loadingMessage.remove();
            
            // Mostrar mensaje de error más específico
            let errorMessage;
            
            if (error.name === 'TypeError' && error.message.includes('fetch')) {
                errorMessage = `🌐 Error de conexión con el servidor. Posibles causas:
                
• El backend no está subido a InfinityFree
• La URL del backend es incorrecta  
• Problemas de CORS en el servidor
• El servidor está temporalmente inactivo

URL intentada: ${this.config.apiUrl}`;
            } else if (error.message.includes('HTTP')) {
                errorMessage = `🔗 Error del servidor: ${error.message}
                
Verifica que los archivos PHP estén correctamente subidos a InfinityFree.`;
            } else {
                errorMessage = `⚠️ Error inesperado: ${error.message}`;
            }
                
            this.addMessage(errorMessage, 'error');
        } finally {
            this.isLoading = false;
            this.sendButton.disabled = false;
            this.chatInput.focus();
        }
    }
    
    autoResizeInput() {
        this.chatInput.style.height = 'auto';
        this.chatInput.style.height = Math.min(this.chatInput.scrollHeight, 100) + 'px';
    }
    
    scrollToBottom() {
        setTimeout(() => {
            this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
        }, 100);
    }
    
    // Método para cambiar la URL de la API (para producción)
    setApiUrl(url) {
        this.config.apiUrl = url;
    }
    
    // Método para obtener el historial de mensajes
    getMessageHistory() {
        return this.messageHistory;
    }
      // Método para limpiar el chat
    clearChat() {
        this.messagesContainer.innerHTML = '';
        this.messageHistory = [];
        this.addWelcomeMessage();
    }
      // Método para probar conectividad básica
    async testConnection() {
        const testUrl = this.config.apiUrl.replace('index.php', 'test.php');
        const environment = window.location.hostname === 'localhost' ? 'Local (XAMPP)' : 'Producción (InfinityFree)';
        
        this.addMessage(`🧪 Probando conectividad con el servidor ${environment}...`, 'info');
        console.log('🧪 Testing connection to:', testUrl);
        
        try {
            const response = await fetch(testUrl);
            console.log('📡 Response status:', response.status, response.statusText);
            
            if (response.ok) {
                const data = await response.json();
                console.log('📥 Response data:', data);
                
                if (data.success) {
                    this.addMessage(`✅ ¡Test de conectividad exitoso!
                    
• Entorno: ${environment}
• Servidor PHP: v${data.server_info.php_version}
• Hora del servidor: ${data.server_info.server_time}
• URL probada: ${testUrl}

El backend está funcionando correctamente. Ahora puedes hacer preguntas normales.`, 'success');
                } else {
                    this.addMessage(`⚠️ El servidor responde pero hay un error: ${data.error || 'Error desconocido'}`, 'error');
                }
            } else {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
        } catch (error) {
            console.error('❌ Connection test failed:', error);
            this.addMessage(`❌ Test de conectividad falló:

Error: ${error.message}
Entorno: ${environment}
URL probada: ${testUrl}

Posibles soluciones:
• Si estás en local: Verifica que XAMPP esté corriendo
• Si estás en producción: Verifica que los archivos estén subidos a InfinityFree
• Comprueba que la URL sea correcta`, 'error');
        }
    }
}

// Exportar para uso global
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ChatAI;
}

// Hacer disponible globalmente
window.ChatAI = ChatAI;
