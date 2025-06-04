# 🚀 GUÍA DE DESPLIEGUE A PRODUCCIÓN - CHARLA IA

## 📋 LISTA DE VERIFICACIÓN PRE-DESPLIEGUE

### ✅ Archivos Locales Verificados
- [x] `charla-backend/config.php` - Configuración con API key
- [x] `charla-backend/index.php` - API principal
- [x] `charla-backend/test.php` - Test conectividad
- [x] `charla-backend/simple-test.php` - Test básico
- [x] `js/charla.js` - Frontend CharlaAI
- [x] `styles/charla.css` - Estilos
- [x] `index.html` - Página principal actualizada

### ✅ Tests Locales Completados
- [x] Backend respondiendo en localhost:80
- [x] Frontend inicializando correctamente
- [x] Sistema completo funcionando
- [x] Migración "chat" → "charla" completada

---

## 🎯 PASO 1: SUBIR BACKEND A INFINITYFREE

### 📁 Archivos a subir
Sube EXACTAMENTE estos 4 archivos a tu hosting:

```
📂 Desde: c:\xampp\htdocs\MF0493_3\charla-backend\
📁 Hacia: public_html/ (en InfinityFree)

📄 config.php          ← ¡IMPORTANTE! Contiene la API key
📄 index.php           ← API principal del chat
📄 test.php            ← Test de conectividad
📄 simple-test.php     ← Test básico PHP
```

### 🔧 Instrucciones de subida:

1. **Acceder a InfinityFree:**
   - Ve a: https://infinityfree.net/
   - Inicia sesión en tu cuenta
   - Selecciona tu sitio web

2. **Abrir File Manager:**
   - En el panel de control, busca "File Manager"
   - O usa "Online File Manager"
   - Navega a la carpeta `public_html/`

3. **Subir archivos:**
   - Arrastra y suelta los 4 archivos desde `c:\xampp\htdocs\MF0493_3\charla-backend\`
   - O usa "Upload" y selecciona los archivos
   - ⚠️ **IMPORTANTE:** Los archivos deben quedar directamente en `public_html/`, NO en una subcarpeta

4. **Estructura final esperada:**
   ```
   public_html/
   ├── config.php
   ├── index.php
   ├── test.php
   ├── simple-test.php
   └── ... (otros archivos existentes)
   ```

---

## 🧪 PASO 2: VERIFICAR DESPLIEGUE

### 🌐 URLs a probar:

Una vez subidos los archivos, prueba estas URLs en tu navegador:

1. **Test básico PHP:**
   ```
   https://phprubensans.wuaze.com/simple-test.php
   ```
   **Debe mostrar:** Mensaje de éxito con información del servidor

2. **Test de conectividad:**
   ```
   https://phprubensans.wuaze.com/test.php
   ```
   **Debe mostrar:** Estado del servidor y configuración

3. **API principal:**
   ```
   https://phprubensans.wuaze.com/index.php
   ```
   **Debe mostrar:** Respuesta JSON con información de la API

### 📋 Checklist de verificación:
- [ ] simple-test.php devuelve código 200
- [ ] test.php muestra información del servidor
- [ ] index.php responde con JSON válido
- [ ] No hay errores 404 o 500
- [ ] Headers CORS están presentes

---

## 🎮 PASO 3: PROBAR SISTEMA COMPLETO

### 🖥️ Test desde ambiente local:

1. **Abrir test de producción:**
   ```
   http://localhost/MF0493_3/test-production-charla.html
   ```

2. **Ejecutar tests:**
   - Hacer clic en "🔍 Probar Endpoints"
   - Hacer clic en "🧪 Test Completo"
   - Probar chat con mensaje de prueba

### 🌐 Test desde GitHub Pages:

1. **Subir cambios a GitHub:**
   ```bash
   git add .
   git commit -m "Add production testing for Charla IA"
   git push origin main
   ```

2. **Probar desde GitHub Pages:**
   - Ir a tu sitio: https://tu-usuario.github.io/tu-repositorio/
   - Probar la funcionalidad del chat
   - Verificar que se conecta al backend de InfinityFree

---

## 🔍 PASO 4: RESOLUCIÓN DE PROBLEMAS

### ❌ Si simple-test.php no funciona:
- Verificar que el archivo se subió correctamente
- Revisar que PHP esté habilitado en InfinityFree
- Comprobar permisos de archivos (755 para directorios, 644 para archivos)

### ❌ Si hay errores CORS:
- Verificar que `config.php` contiene los headers CORS correctos
- Comprobar que la API key de Google esté configurada

### ❌ Si el chat no responde:
- Revisar la consola del navegador (F12)
- Verificar que la URL del backend sea correcta
- Comprobar que la API key de Google Gemini sea válida

### ❌ Si hay errores 500:
- Revisar logs de error en InfinityFree
- Verificar sintaxis PHP de los archivos
- Comprobar configuración de la base de datos (si aplica)

---

## ✅ PASO 5: VERIFICACIÓN FINAL

### 🎯 Tests de aceptación:

1. **Funcionalidad básica:**
   - [ ] El chat se abre y cierra correctamente
   - [ ] Los mensajes se envían sin errores
   - [ ] La IA responde coherentemente
   - [ ] El historial se mantiene durante la sesión

2. **Rendimiento:**
   - [ ] Las respuestas llegan en menos de 10 segundos
   - [ ] No hay errores en la consola del navegador
   - [ ] El sistema funciona en diferentes navegadores

3. **Compatibilidad:**
   - [ ] Funciona desde GitHub Pages
   - [ ] Funciona desde localhost
   - [ ] Compatible con móviles y escritorio

### 🎉 SISTEMA LISTO PARA PRODUCCIÓN

Si todos los tests pasan, el sistema Charla IA está completamente desplegado y funcionando en producción.

---

## 📞 SOPORTE Y MONITOREO

### 📊 Herramientas de monitoreo:
- **Test de producción:** `test-production-charla.html`
- **Logs de actividad:** Consola del navegador (F12)
- **Estado del backend:** URLs de test mencionadas arriba

### 🆘 En caso de problemas:
1. Revisar este documento paso a paso
2. Verificar configuración de API keys
3. Comprobar logs de error en InfinityFree
4. Usar las herramientas de test creadas

---

**¡DESPLIEGUE COMPLETADO! 🚀**
