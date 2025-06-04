# Chat IA Backend - Instrucciones de Despliegue

## Para InfinityFree u otro hosting PHP gratuito:

### 1. Preparar archivos:
- Subir `index.php` y `config.php` a la carpeta `htdocs` o `public_html`
- Asegurarse de que la URL sea accesible (ej: `https://tusubdominio.infinityfreeapp.com/`)

### 2. Configurar en el portfolio:
- Actualizar la variable `CHAT_API_URL` en el archivo JavaScript del chat
- Cambiar de localhost a la URL de producción

### 3. Verificar funcionamiento:
- Probar desde el portfolio en GitHub Pages
- Verificar que no hay errores de CORS
- Comprobar que las respuestas de la IA funcionan correctamente

### 4. Hosting alternativos recomendados:
- **InfinityFree**: Gratuito, PHP 8.1, sin límites de tiempo
- **000WebHost**: Gratuito, fácil configuración
- **Heroku**: Con plan gratuito limitado
- **Vercel**: Para backend con funciones serverless

### 5. Seguridad:
- La API key está protegida en el servidor
- Solo se expone el endpoint necesario
- CORS configurado para permitir el origen del portfolio

### 6. Monitoreo:
- Verificar logs del servidor regularmente
- Controlar el uso de la API de Google
- Establecer límites de rate limiting si es necesario

## URL del backend para usar en producción:
```
https://tu-dominio.infinityfreeapp.com/
```

Reemplazar en el archivo JavaScript del frontend.
