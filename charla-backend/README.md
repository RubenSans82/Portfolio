# 📝 Despliegue del Backend Charla IA

## 🎯 Archivos a subir al hosting

Sube TODOS estos archivos a tu hosting InfinityFree:

```
charla-backend/
├── index.php          (API principal)
├── config.php         (configuración y contexto)
├── test.php          (test de conectividad)
└── simple-test.php   (test básico PHP)
```

## 🚀 Instrucciones de despliegue

### 1. Acceder al Panel de Control
- Ve a InfinityFree y accede a tu panel de control
- Busca "File Manager" o "Administrador de archivos"

### 2. Ubicación de archivos
- Navega a la carpeta `public_html/` o `htdocs/`
- Sube TODOS los archivos de la carpeta `charla-backend/`

### 3. Estructura final en el hosting
```
public_html/
├── index.php
├── config.php  
├── test.php
└── simple-test.php
```

## 🔧 URLs de prueba

Una vez subidos los archivos, verifica estas URLs:

- **Backend principal:** `https://phprubensans.wuaze.com/index.php`
- **Test básico:** `https://phprubensans.wuaze.com/simple-test.php`
- **Test conectividad:** `https://phprubensans.wuaze.com/test.php`

## 🛠️ Configuración de la API Key

En `config.php`, verifica que tu API key de Google esté configurada:
```php
'api_key' => 'TU_API_KEY_DE_GOOGLE_GEMINI',
```

## ✅ Verificación

Si todo está correcto, deberías ver:
- `simple-test.php` → Mensaje de PHP funcionando
- `test.php` → JSON con información del servidor
- `index.php` → Debe responder solo a POST requests

## 🚨 Importante

- NO cambies los nombres de los archivos
- NO uses palabras como "chat" en nombres de archivos
- Verifica que los permisos de archivos sean 644
