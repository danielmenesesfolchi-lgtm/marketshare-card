# Tarjeta Digital — Mauricio Meneses · Market Share

Tarjeta de presentación digital con QR y formulario de contacto integrado a Google Sheets.

---

## Archivos

```
APP/
├── index.html              ← app completa (una sola página)
├── mauriciomeneses65.png   ← logo de la empresa
├── google-apps-script.js   ← código para pegar en Google Apps Script
└── README.md
```

---

## 1 · Configurar Google Sheets

### Paso 1 — Crear la hoja
1. Ve a [sheets.google.com](https://sheets.google.com) y crea una hoja nueva.
2. Nómbrala **Contactos Market Share**.
3. En la fila 1 escribe estos encabezados exactamente:

   | A | B | C | D | E |
   |---|---|---|---|---|
   | Fecha | Nombre | Email | Teléfono | Empresa |

### Paso 2 — Crear el Apps Script
1. Menú: **Extensiones → Apps Script**.
2. Borra el código que aparece y pega el contenido de `google-apps-script.js`.
3. Guarda con **Ctrl+S** y ponle un nombre (ej. "API Contactos").

### Paso 3 — Publicar como Web App
1. Click en **Implementar → Nueva implementación**.
2. Configuración:
   - **Tipo**: Aplicación web
   - **Ejecutar como**: Yo (tu cuenta de Google)
   - **Quién tiene acceso**: Cualquier usuario
3. Click en **Implementar** y autoriza los permisos.
4. **Copia la URL** que aparece (termina en `/exec`).

### Paso 4 — Conectar con la app
Abre `index.html` y en la línea:
```js
const SHEET_URL = 'TU_GOOGLE_APPS_SCRIPT_URL_AQUI';
```
Reemplaza `TU_GOOGLE_APPS_SCRIPT_URL_AQUI` por la URL que copiaste.

---

## 2 · Publicar en GitHub Pages

```bash
# 1. Crea un repo en github.com (ej: marketshare-card)

# 2. Sube los archivos
git init
git add index.html mauriciomeneses65.png
git commit -m "tarjeta digital market share"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/marketshare-card.git
git push -u origin main

# 3. En GitHub: Settings → Pages → Source: "Deploy from branch: main"
```

La app quedará disponible en:
`https://TU_USUARIO.github.io/marketshare-card/`

---

## Uso

- **Tarjeta**: muestra el logo, nombre, cargo y botones de acción (llamar, email, web, mapa).
- **QR**: escanear guarda automáticamente el contacto en el celular (formato vCard).
- **Botón "Guardar contacto"**: descarga el archivo `.vcf` directamente.
- **Formulario**: los datos enviados aparecen en la hoja de Google Sheets.
