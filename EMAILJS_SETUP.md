# Configuración de EmailJS

## Pasos para configurar el envío real de correos:

### 1. Crear cuenta en EmailJS
- Ve a https://www.emailjs.com/
- Crea una cuenta gratuita
- Confirma tu email

### 2. Configurar un servicio de email
- En el dashboard, ve a "Email Services"
- Haz clic en "Add New Service"
- Selecciona "Gmail" (o el proveedor que uses)
- Configura con tu email (ej: rubensans82@gmail.com)
- Copia el **Service ID** (ej: `service_gmail`)

### 3. Crear una plantilla de email
- Ve a "Email Templates"
- Haz clic en "Create New Template"
- Usa este contenido para la plantilla:

```
Asunto: {{subject}}
De: {{from_name}} <{{from_email}}>

Nombre: {{from_name}}
Email: {{from_email}}
Asunto: {{subject}}

Mensaje:
{{message}}

---
Enviado desde el formulario de contacto del portfolio de {{to_name}}
```

- Guarda y copia el **Template ID** (ej: `template_contact`)

### 4. Obtener la clave pública
- Ve a "Account" > "General"
- Copia la **Public Key**

### 5. Actualizar el código
Reemplaza en `js/main.js`:

```javascript
// Línea ~8: Inicialización
emailjs.init("TU_PUBLIC_KEY_AQUI");

// Línea ~43: Envío del email
emailjs.send('TU_SERVICE_ID', 'TU_TEMPLATE_ID', templateParams, 'TU_PUBLIC_KEY')
```

### Ejemplo de configuración completa:
```javascript
// Inicialización
emailjs.init("abcd1234efgh5678");

// Envío
emailjs.send('service_gmail', 'template_contact', templateParams, 'abcd1234efgh5678')
```

### 6. Variables de la plantilla utilizadas:
- `{{from_name}}` - Nombre del contacto
- `{{from_email}}` - Email del contacto  
- `{{subject}}` - Asunto del mensaje
- `{{message}}` - Contenido del mensaje
- `{{to_name}}` - Tu nombre (Rubén Sans Acevedo)

### 7. Testing
- Abre el sitio web
- Llena el formulario de contacto
- Envía un mensaje de prueba
- Revisa tu bandeja de entrada

### Límites de la cuenta gratuita:
- 200 emails por mes
- Suficiente para un portfolio personal

### Notas de seguridad:
- La clave pública es segura mostrar en el frontend
- No expongas claves privadas
- Los emails se envían desde los servidores de EmailJS
