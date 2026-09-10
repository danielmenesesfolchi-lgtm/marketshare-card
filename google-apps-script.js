/**
 * Google Apps Script — Receptor de formulario de contacto
 * =========================================================
 * SHEET: https://docs.google.com/spreadsheets/d/1pYY8ZfyPmi-h4ELNx_lb_NZzaniy8NwhoOAqZVaxDO8/edit
 *
 * INSTRUCCIONES:
 * 1. Abre el Sheet de arriba → Extensiones → Apps Script
 * 2. Borra el código existente y pega este archivo completo
 * 3. Guarda (Ctrl+S) con nombre "API Contactos"
 * 4. Implementar → Nueva implementación
 *    - Tipo: Aplicación web
 *    - Ejecutar como: Yo
 *    - Acceso: Cualquier usuario
 * 5. Copia la URL /exec y pégala en index.html → SHEET_URL
 */

const SHEET_ID   = '1pYY8ZfyPmi-h4ELNx_lb_NZzaniy8NwhoOAqZVaxDO8';
const SHEET_NAME = 'Hoja 1'; // Cambia si tu hoja tiene otro nombre

function doPost(e) {
  try {
    var ss    = SpreadsheetApp.openById(SHEET_ID);
    var sheet = ss.getSheetByName(SHEET_NAME) || ss.getSheets()[0];

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
  var ss    = SpreadsheetApp.openById(SHEET_ID);
  var sheet = ss.getSheetByName(SHEET_NAME) || ss.getSheets()[0];
  sheet.appendRow([
    new Date().toLocaleString('es-CL'),
    'Test Usuario',
    'test@ejemplo.cl',
    '+56 9 0000 0000',
    'Empresa Test'
  ]);
  Logger.log('Fila insertada correctamente.');
}
