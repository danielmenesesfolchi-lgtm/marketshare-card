/**
 * Google Apps Script — Receptor de formulario de contacto
 * =========================================================
 * INSTRUCCIONES DE INSTALACIÓN:
 *
 * 1. Ve a https://sheets.google.com y crea una nueva hoja de cálculo.
 *    Nómbrala "Contactos Market Share".
 *
 * 2. En la primera fila escribe los encabezados:
 *    A1: Fecha | B1: Nombre | C1: Email | D1: Teléfono | E1: Empresa
 *
 * 3. En el menú: Extensiones → Apps Script
 *
 * 4. Borra el código que aparece y pega TODO este archivo.
 *
 * 5. Guarda el proyecto (Ctrl+S). Ponle un nombre, ej. "Contactos API".
 *
 * 6. Click en "Implementar" → "Nueva implementación"
 *    - Tipo: Aplicación web
 *    - Ejecutar como: Yo (tu cuenta)
 *    - Quién tiene acceso: Cualquier usuario
 *    → Click en "Implementar"
 *    → Autoriza los permisos cuando te lo pida.
 *
 * 7. Copia la URL que aparece (termina en /exec).
 *
 * 8. En index.html, reemplaza 'TU_GOOGLE_APPS_SCRIPT_URL_AQUI'
 *    por esa URL.
 *
 * ¡Listo! Cada vez que alguien envíe el formulario,
 * aparecerá una nueva fila en tu Google Sheet.
 */

const SHEET_NAME = ''; // Déjalo vacío para usar la primera hoja

function doPost(e) {
  try {
    var ss    = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = SHEET_NAME
                  ? ss.getSheetByName(SHEET_NAME)
                  : ss.getSheets()[0];

    var data  = JSON.parse(e.postData.contents);

    sheet.appendRow([
      data.fecha    || new Date().toLocaleString('es-CL'),
      data.nombre   || '',
      data.email    || '',
      data.telefono || '',
      data.empresa  || ''
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'ok' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Test manual: ejecuta esta función desde el editor para verificar
function testInsert() {
  var ss    = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheets()[0];
  sheet.appendRow([
    new Date().toLocaleString('es-CL'),
    'Test Usuario',
    'test@ejemplo.cl',
    '+56 9 0000 0000',
    'Empresa Test'
  ]);
  Logger.log('Fila insertada correctamente.');
}
